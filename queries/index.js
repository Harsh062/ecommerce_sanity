// Updated GROQ query to fetch categories, sub-categories, and furniture types
export const categoriesQuery = `
  *[_type == "category"]{
    title,
    slug,
    // Fetch subCategories that reference this category
    "subCategories": *[_type == "subCategory" && references(^._id)]{
      title,
      slug,
      "furnitureTypes": *[_type == "furnitureType" && references(^._id)]{
        title,
        slug,
        description
      }
    },
    // Fetch furniture types that do not have an associated subCategory but reference this category
    "furnitureTypesWithoutSubCategory": *[_type == "furnitureType" && !defined(subCategory) && references(^._id)]{
      title,
      slug,
      description
    }
  }
`

export const groupedProductsQuery = `
  *[_type == "furnitureType" && _id in ["2d16a0cb-515e-4247-8999-350b8b49d89f", "2138f4a0-a2fc-4d80-9294-28a0ce3f94b3", "1c7f6851-afbd-4020-a3d9-c565ba395410", "d9046563-7eb0-424c-b562-fb94dfec2200", "38ee9685-494c-4eb5-8f91-4bbaa6841530", "e62a6d71-9759-4240-b367-a3de4a1e971f", "38ee9685-494c-4eb5-8f91-4bbaa6841530"]] {
  _id,
  title,
  featuredLabelText,
  "slug": slug.current,
  "products": *[_type == "product" && (^._id in furnitureTypes[]._ref)] {
    _id,
    name,
    "slug": slug.current,
    discountedPrice,
    originalPrice,
    variations,
    "furnitureTypes": furnitureTypes[]->{
      slug
    }
  }
}
`

export const productsListByFurnitureTypeQuery = `
  *[_type == "product" && $furnitureTypeSlug in furnitureTypes[]->slug.current] {
    _id,
    name,
    slug,
    originalPrice,
    discountedPrice,
    description,
    variations,
    "furnitureTypes": furnitureTypes[]->{
      "slug": slug.current,
      title,
      description
    }
}
`

export const productDetailsQuery = `*[_type == "product" && slug.current == $productSlug][0] {
  _id,
  _type,
  name,
  "slug": slug.current,
  heroTitle,
  description,
  vendor->{  // Assuming you want details about the vendor, adjust based on your needs
    _id,
    name,
    // Add other vendor fields you may need
  },
  variations[] {
    id,
    type,
    value,
    images[] {
      asset-> {
        _id,
        url
        // You can also fetch other properties of the image asset such as metadata
      },
      caption
    }
  },
  furnitureTypes[]-> {  // Dereferencing furniture types to fetch details
    _id,
    title,
    slug
  },
  originalPrice,
  discountedPrice,
}
`

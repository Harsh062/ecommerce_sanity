import React from 'react'

import { client } from '../lib/client'
import {
  AnnouncementBar,
  SectionHeader,
  MobileNavigationDrawer,
  FeaturedCollection,
} from '../components'

// Home component to render the fetched data
const Home = ({ categories, groupedProducts }) => {
  // Log the categories to the browser console
  console.log('Categories in Home component: ', categories)
  console.log('groupedProducts in Home component: ', groupedProducts)

  return (
    <div>
      <AnnouncementBar />
      <SectionHeader categories={categories} />
      <MobileNavigationDrawer categories={categories} />
      <FeaturedCollection
        products={groupedProducts[2].products}
        featuredLabelText={groupedProducts[2].featuredLabelText}
      />
      <FeaturedCollection
        products={groupedProducts[1].products}
        featuredLabelText={groupedProducts[1].featuredLabelText}
      />
      <FeaturedCollection
        products={groupedProducts[0].products}
        featuredLabelText={groupedProducts[0].featuredLabelText}
      />
      <FeaturedCollection
        products={groupedProducts[4].products}
        featuredLabelText={groupedProducts[4].featuredLabelText}
      />
    </div>
  )
}

// Updated GROQ query to fetch categories, sub-categories, and furniture types
const categoriesQuery = `
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
      featuredLabelText,
      slug,
      description
    }
  }
`
const groupedProductsQuery = `*[_type == "furnitureType" && _id in ["2d16a0cb-515e-4247-8999-350b8b49d89f", "2138f4a0-a2fc-4d80-9294-28a0ce3f94b3", "1c7f6851-afbd-4020-a3d9-c565ba395410", "d9046563-7eb0-424c-b562-fb94dfec2200", "38ee9685-494c-4eb5-8f91-4bbaa6841530"]] {
  _id,
  title,
  featuredLabelText,
  "slug": slug.current,
  "products": *[_type == "product" && references(^._id)] {
    _id,
    name,
    slug,
    discountedPrice,
    originalPrice,
    variations
  }
}`

export const getServerSideProps = async () => {
  const categories = await client.fetch(categoriesQuery)
  const groupedProducts = await client.fetch(groupedProductsQuery)
  return {
    props: { categories, groupedProducts },
  }
}

export default Home

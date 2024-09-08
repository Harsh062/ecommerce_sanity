import React, { useState } from 'react'
import OwlCarousel from 'react-owl-carousel'
import blockContentToMarkdown from '@sanity/block-content-to-markdown'
import { Layout } from '../../../../components'
import { categoriesQuery, productDetailsQuery } from '../../../../queries/index'
import { client } from '../../../../lib/client'
import { getCompleteImgUrl } from '../../../../utils'

const serializers = {
  types: {
    block: (props) => {
      // Differentiate between different styles of blocks
      switch (props.node.style) {
        case 'h1':
          return `# ${props.children.join('')}\n\n`
        case 'h2':
          return `## ${props.children.join('')}\n\n`
        case 'h3':
          return `### ${props.children.join('')}\n\n`
        case 'h4':
          return `#### ${props.children.join('')}\n\n`
        case 'h5':
          return `##### ${props.children.join('')}\n\n`
        case 'h6':
          return `###### ${props.children.join('')}\n\n`
        case 'blockquote':
          return `> ${props.children.join('')}\n\n`
        default:
          return `${props.children.join('')}\n\n` // Normal paragraph
      }
    },
    listItem: (props) => {
      // Handling list items differently based on list type
      if (props.node.listItem === 'bullet') {
        return `- ${props.children.join('')}\n`
      } else if (props.node.listItem === 'number') {
        return `1. ${props.children.join('')}\n`
      }
      return `${props.children.join('')}\n`
    },
    image: (props) => {
      // Assuming you have an asset field on the image
      const imgUrl = `https://cdn.sanity.io/images/{projectId}/{dataset}/${props.node.asset._ref}.jpg` // Modify as needed
      return `![${props.node.alt || ''}](${imgUrl})\n\n`
    },
  },
  marks: {
    strong: (props) => `**${props.children}**`,
    em: (props) => `*${props.children}*`,
    code: (props) => `\`${props.children}\``,
    underline: (props) => `<u>${props.children}</u>`, // Not standard MD, consider how to handle
    link: (props) => {
      // Assuming link mark has an 'href' attribute
      return `[${props.children}](props.mark.href)`
    },
  },
}

const ProductDetails = ({ product, categories }) => {
  const [activeImage, setActiveImage] = useState(0)

  const handleThumbnailClick = (index) => {
    setActiveImage(index)
  }

  return (
    <Layout categories={categories}>
      <main id="content" role="main">
        <div className="container cf">
          <div className="shopify-section section-main-product">
            <div className="page-header">
              {/* Breadcrumbs can also be dynamic if needed */}
            </div>
            <div className="product-detail">
              <div className="gallery">
                {product.variations.length > 0 && (
                  <OwlCarousel className="owl-theme" loop margin={10} items={1}>
                    {product.variations[0].images.map((img, index) => (
                      <div
                        key={index}
                        className={`item ${index === activeImage ? 'active' : ''}`}
                      >
                        <img
                          src={getCompleteImgUrl(img.asset._ref)}
                          alt={product.name}
                        />
                      </div>
                    ))}
                  </OwlCarousel>
                )}
                <div className="thumbnails">
                  <ul>
                    {product.variations[0].images.map((img, index) => (
                      <li
                        key={index}
                        className={index === activeImage ? 'active' : ''}
                      >
                        <a onClick={() => handleThumbnailClick(index)}>
                          <img
                            src={getCompleteImgUrl(img.asset._ref)}
                            alt={`Thumbnail ${index}`}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="product-info">
                <h1 className="product-info__title">{product.name}</h1>
                <div className="product-info__vendor">
                  by {product.vendor.name}
                </div>
                <div className="price">
                  <span className="price__current">
                    ₹ {product.discountedPrice || product.originalPrice}
                  </span>
                </div>
                <div className="product-info__description">
                  {/* Markdown conversion here if needed */}
                </div>
                <div className="product-info__actions">
                  {/* Color options and Add to cart functionality */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { params } = context
  const productSlug = params.productSlug
  // Query to get products that belong to a specific furnitureType

  const categories = await client.fetch(categoriesQuery)
  const productDetails = await client.fetch(productDetailsQuery, {
    productSlug,
  })
  productDetails.markdownDescription = blockContentToMarkdown(
    productDetails.description,
    { serializers },
  )
  return {
    props: { product: productDetails, categories },
  }
}

export default ProductDetails

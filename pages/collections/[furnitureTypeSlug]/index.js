import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '../../../components'
import {
  categoriesQuery,
  productsListByFurnitureTypeQuery,
} from '../../../queries/index'
import { client } from '../../../lib/client'
import { getCompleteImgUrl, updateBodyClass } from '../../../utils'

const FurnitureTypeList = ({ products, categories }) => {
  console.log('products', products)
  const router = useRouter()
  const { furnitureTypeSlug } = router.query
  console.log('furnitureTypeSlug', furnitureTypeSlug)
  const collectionTitle = products[0].furnitureTypes[0].title
  useEffect(() => {
    // Add specific body class for this page
    const removeClass = updateBodyClass('template-collection')

    // Cleanup when component unmounts or route changes
    return removeClass
  }, [router.pathname])
  return (
    <Layout categories={categories}>
      <div className="page-header page-header--with-upper-spacing">
        <div className="container">
          <h1 className="pagetitle h3-style">{collectionTitle}</h1>
        </div>
      </div>
      <div className="container">
        <div className="utility-bar">
          <div className="utility-bar__centre">
            <div className="utility-bar__item">{products.length} products</div>
          </div>
        </div>
        <div className="filter-container filter-container--side filter-container--show-filters-desktop filter-container--mobile-initialised">
          <div className="filters-adjacent collection-listing">
            <div className="product-list product-list--per-row-4 product-list--per-row-mob-2 product-list--image-shape-portrait-45">
              {products.map((product) => (
                <div
                  key={product._id}
                  data-product-id={product._id}
                  className="product-block cc-animate-init -in cc-animate-complete"
                >
                  <div
                    className="block-inner"
                    style={{ minHeight: '455.625px' }}
                  >
                    <div className="block-inner-inner">
                      <div className="image-cont image-cont--with-secondary-image">
                        <a
                          className="product-link"
                          href={`/collections/${furnitureTypeSlug}/products/${product.slug.current}`}
                          aria-label={product.name}
                          tabIndex="-1"
                        >
                          <div className="image-label-wrap">
                            <div className="product-block__image product-block__image--primary product-block__image--active">
                              <img
                                className="rimage__image fade-in cover lazyload"
                                src={getCompleteImgUrl(
                                  product.variations[0].images[0].asset._ref
                                    .slice(6)
                                    .replace('-jpg', '.jpg')
                                    .replace('-webp', '.webp')
                                    .replace('{width}', '540'),
                                )}
                                alt={product.label}
                                layout="responsive"
                              />
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="product-info">
                        <div className="inner">
                          <div className="innerer">
                            <a
                              className="product-link"
                              href={`/collections/${furnitureTypeSlug}/products/${product.slug.current}`}
                            >
                              <div className="product-block__title">
                                {product.name}
                              </div>
                              <div className="product-price">
                                {product.discountedPrice && (
                                  <>
                                    <span className="product-price__item product-price__amount product-price__amount--on-sale theme-money">
                                      ₹ {product.discountedPrice}
                                    </span>
                                    <span className="product-price__item product-price__compare theme-money">
                                      ₹ {product.originalPrice}
                                    </span>
                                    <span className="product-price__item price-label price-label--sale">
                                      Sale
                                    </span>
                                  </>
                                )}
                                {!product.discountedPrice && (
                                  <span className="product-price__item product-price__amount theme-money">
                                    ₹ {product.originalPrice}
                                  </span>
                                )}
                              </div>
                            </a>
                            {/* Rating Component Here */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Quick Buy Component Here */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { params } = context
  const furnitureTypeSlug = params.furnitureTypeSlug
  // Query to get products that belong to a specific furnitureType

  const categories = await client.fetch(categoriesQuery)
  const productsListByFurnitureType = await client.fetch(
    productsListByFurnitureTypeQuery,
    {
      furnitureTypeSlug,
    },
  )
  return {
    props: { products: productsListByFurnitureType, categories },
  }
}

export default FurnitureTypeList

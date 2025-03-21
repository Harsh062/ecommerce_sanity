import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Layout } from '../../../components'
import {
  categoriesQuery,
  productsListByFurnitureTypeQuery,
} from '../../../queries/index'
import { client } from '../../../lib/client'
import { getCompleteImgUrl, updateBodyClass } from '../../../utils'

const FurnitureTypeList = ({ products, categories }) => {
  const router = useRouter()
  const { furnitureTypeSlug } = router.query

  // Only try to access furnitureTypes if products exist
  const collectionTitle =
    products.length > 0
      ? products[0].furnitureTypes[0].title
      : furnitureTypeSlug
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
  const collectionDescription =
    products.length > 0
      ? products[0].furnitureTypes[0].description
      : 'Discover premium quality furniture at Sundaram Furniture. Shop our wide collection of sofas, dining sets, beds and more.'
  useEffect(() => {
    // Add specific body class for this page
    const removeClass = updateBodyClass('template-collection')

    // Cleanup when component unmounts or route changes
    return removeClass
  }, [router.pathname])

  return (
    <>
      <Head>
        <title>{collectionTitle}</title>
        <meta name="description" content={collectionDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout categories={categories}>
        <div className="page-header page-header--with-upper-spacing">
          <div className="container">
            <h1 className="pagetitle h3-style">{collectionTitle}</h1>
          </div>
        </div>
        <div className="container">
          <div className="utility-bar">
            <div className="utility-bar__centre">
              <div className="utility-bar__item">
                {products.length} products
              </div>
            </div>
          </div>
          <div className="filter-container filter-container--side filter-container--show-filters-desktop filter-container--mobile-initialised">
            <div className="filters-adjacent collection-listing">
              {products.length > 0 ? (
                <div className="product-list product-list--per-row-4 product-list--per-row-mob-2 product-list--image-shape-portrait-45">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      data-product-id={product._id}
                      className="product-block cc-animate-init -in cc-animate-complete"
                    >
                      <div
                        className="block-inner"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                        }}
                      >
                        <div className="block-inner-inner">
                          <div className="image-cont image-cont--with-secondary-image">
                            <a
                              className="product-link"
                              href={`/collections/${furnitureTypeSlug}/products/${product.slug.current}`}
                              aria-label={product.name}
                              tabIndex="-1"
                            >
                              <div
                                className="image-label-wrap"
                                style={{
                                  position: 'relative',
                                  paddingBottom: '149.25%', // This creates aspect ratio of 0.67 (67:100)
                                  width: '100%',
                                  height: '0',
                                  overflow: 'hidden',
                                }}
                              >
                                <div
                                  className="product-block__image product-block__image--primary product-block__image--active"
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                  }}
                                >
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
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                      objectPosition: 'center',
                                    }}
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
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '60px 20px',
                    textAlign: 'center',
                    minHeight: '300px',
                  }}
                >
                  <h2 style={{ marginBottom: '16px', color: '#666' }}>
                    No Products Available
                  </h2>
                  <p style={{ color: '#888', maxWidth: '500px' }}>
                    We're currently updating our collection. Please check back
                    later or explore our other categories.
                  </p>
                  <a
                    href="/"
                    style={{
                      marginTop: '24px',
                      padding: '12px 24px',
                      backgroundColor: '#4a4a4a',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = '#666')
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = '#4a4a4a')
                    }
                  >
                    Browse Other Collections
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
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
  console.log('productsListByFurnitureType:: ', productsListByFurnitureType)
  return {
    props: {
      products: productsListByFurnitureType || [], // Ensure products is always an array
      categories,
    },
  }
}

export default FurnitureTypeList

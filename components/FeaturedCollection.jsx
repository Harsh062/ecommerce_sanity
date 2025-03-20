import React, { useState } from 'react'
import { getCompleteImgUrl } from '../utils'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

function calculateDiscountPercentage(originalPrice, discountedPrice) {
  const discountPercentage =
    ((originalPrice - discountedPrice) / originalPrice) * 100
  return Math.round(discountPercentage)
}

const FeaturedCollection = ({
  products,
  featuredLabelText,
  furnitureTypeSlug,
}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }

  return (
    <div className="shopify-section section-featured-collection">
      <div
        className="section-id-template collection-slider-row use-alt-bg"
        data-section-type="featured-collection"
        data-components="accordion,modal,price-range"
      >
        <div className="container container--not-mobile container--no-max">
          <div className="collection-slider">
            <h2 className="hometitle h4-style align-center has-paging">
              <a
                className="has-paging__title"
                href={`/collections/${furnitureTypeSlug}`}
              >
                <span>{featuredLabelText}</span>
              </a>
            </h2>
            <div className="view-all align-center">
              <a
                className="small-feature-link"
                href={`/collections/${furnitureTypeSlug}`}
              >
                View all
              </a>
            </div>
            <Carousel
              responsive={responsive}
              infinite={true}
              swipeable={true}
              draggable={true}
              showDots={false}
              ssr={true}
              keyBoardControl={true}
              itemClass="carousel-item-padding"
            >
              {products.map((product) => {
                const discount = calculateDiscountPercentage(
                  product.originalPrice,
                  product.discountedPrice,
                )
                const hasDiscount = discount > 0
                return (
                  <div
                    key={product._id}
                    className="product-block"
                    style={{ padding: '0 10px' }}
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
                            href={`/collections/${product.furnitureTypes[0].slug.current}/products/${product.slug}`}
                            aria-label={product.label}
                          >
                            <div
                              className="image-label-wrap"
                              style={{
                                position: 'relative',
                                paddingBottom: '149.25%',
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
                            {hasDiscount && (
                              <div className="product-label-container">
                                <span className="product-label product-label--sale">
                                  <span>{discount}% off</span>
                                </span>
                              </div>
                            )}
                          </a>
                        </div>
                        <div className="product-info">
                          <div className="inner">
                            <div className="innerer">
                              <a
                                className="product-link"
                                href={`/collections/${product.furnitureTypes[0].slug.current}/products/${product.slug}`}
                              >
                                <div className="product-block__title">
                                  {product.name}
                                </div>
                                <div className="product-price">
                                  <span className="product-price__item product-price__amount product-price__amount--on-sale theme-money">
                                    ₹ {product.originalPrice}
                                  </span>
                                  {hasDiscount && (
                                    <>
                                      <span className="product-price__item product-price__compare theme-money">
                                        ₹ {product.discountedPrice}
                                      </span>
                                      <span className="product-price__item price-label price-label--sale">
                                        Sale
                                      </span>
                                    </>
                                  )}
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedCollection

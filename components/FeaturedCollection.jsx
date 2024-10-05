import dynamic from 'next/dynamic'
import React, { useRef, useEffect } from 'react'
import { getCompleteImgUrl } from '../utils'
import $ from 'jquery'

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
})

const options = {
  items: 1,
  margin: 10,
  nav: true,
  navText: [
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><title>Left</title><polyline points="15 18 9 12 15 6"></polyline></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><title>Right</title><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  ],
  dots: false,
  loop: false,
  responsive: {
    0: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
}

function calculateDiscountPercentage(originalPrice, discountedPrice) {
  // Calculate the discount percentage
  const discountPercentage =
    ((originalPrice - discountedPrice) / originalPrice) * 100

  // Round the discount percentage to the nearest whole number
  const roundedDiscountPercentage = Math.round(discountPercentage)

  return roundedDiscountPercentage
}

const FeaturedCollection = ({
  products,
  featuredLabelText,
  furnitureTypeSlug,
}) => {
  const carouselRef = useRef(null)

  useEffect(() => {
    if (carouselRef.current) {
      $(carouselRef.current).trigger('refresh.owl.carousel')
    }
  }, [])

  const handleNextClick = () => {
    if (carouselRef.current) {
      $(carouselRef.current).trigger('next.owl.carousel') // jQuery-based navigation
    }
  }

  const handlePrevClick = () => {
    if (carouselRef.current) {
      $(carouselRef.current).trigger('prev.owl.carousel') // jQuery-based navigation
    }
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
              <a className="prev ltr-icon" onClick={handlePrevClick}>
                <span
                  dangerouslySetInnerHTML={{ __html: options.navText[0] }}
                />
              </a>
              <a
                className="has-paging__title"
                href="/collections/kids-furniture"
              >
                <span>{featuredLabelText}</span>
              </a>
              <a className="next ltr-icon" onClick={handleNextClick}>
                <span
                  dangerouslySetInnerHTML={{ __html: options.navText[1] }}
                />
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
            <OwlCarousel
              ref={carouselRef}
              {...options}
              className="collection-listing product-list carousel owl-carousel"
            >
              {products.map((product) => {
                const discount = calculateDiscountPercentage(
                  product.originalPrice,
                  product.discountedPrice,
                )
                const hasDiscount = discount > 0
                return (
                  <div key={product._id} className="product-block">
                    <div
                      className="block-inner"
                      style={{ minHeight: '414.844px' }}
                    >
                      <div className="block-inner-inner">
                        <div className="image-cont image-cont--with-secondary-image">
                          <a
                            className="product-link"
                            href={`/collections/${product.furnitureTypes[0].slug.current}/products/${product.slug}`}
                            aria-label={product.label}
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
            </OwlCarousel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedCollection

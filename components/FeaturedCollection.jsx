import React, { useState } from 'react'
import { getCompleteImgUrl } from '../utils'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // Import carousel styles
import { Carousel } from 'react-responsive-carousel'

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
  const [currentSlide, setCurrentSlide] = useState(0) // State to track current slide

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length) // Move to the next slide
  }

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? products.length - 1 : prevSlide - 1,
    ) // Move to the previous slide
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
                  dangerouslySetInnerHTML={{
                    __html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><title>Left</title><polyline points="15 18 9 12 15 6"></polyline></svg>`,
                  }}
                />
              </a>
              <a
                className="has-paging__title"
                href={`/collections/${furnitureTypeSlug}`}
              >
                <span>{featuredLabelText}</span>
              </a>
              <a className="next ltr-icon" onClick={handleNextClick}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><title>Right</title><polyline points="9 18 15 12 9 6"></polyline></svg>`,
                  }}
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
            <Carousel
              selectedItem={currentSlide}
              onChange={(index) => setCurrentSlide(index)} // Update slide on change
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
              infiniteLoop // Enable looping for the circular effect
              centerMode // Center the first item
              centerSlidePercentage={75} // Show 80% of the slide (adjust as needed)
              emulateTouch
              useKeyboardArrows
              dynamicHeight={false} // Optional: prevents dynamic height issues
              showArrows={false} // Disable default arrows, using custom ones
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
                    style={{ padding: '0 8px' }}
                  >
                    {' '}
                    {/* 16px gap between items (8px on each side) */}
                    <div
                      className="block-inner"
                      style={{
                        minHeight: '414.844px',
                        display: 'flex',
                        justifyContent: 'center',
                      }} // Center-align the image
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
                                  style={{ maxWidth: '100%', height: 'auto' }} // Ensure image is responsive
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

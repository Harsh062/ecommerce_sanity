import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Markdown from 'react-markdown'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import blockContentToMarkdown from '@sanity/block-content-to-markdown'
import { Layout } from '../../../../components'
import { categoriesQuery, productDetailsQuery } from '../../../../queries/index'
import { client } from '../../../../lib/client'
import { updateBodyClass } from '../../../../utils'

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
  console.log('product in ProductDetails', product)
  const [nav1, setNav1] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slider1, setSlider1] = useState(null)
  const router = useRouter()
  const { furnitureTypeSlug, productSlug } = router.query
  useEffect(() => {
    setNav1(slider1)
  }, [slider1])

  useEffect(() => {
    // Add specific body class for this page
    const removeClass = updateBodyClass('template-product')

    // Cleanup when component unmounts or route changes
    return removeClass
  }, [router.pathname])

  const productImagesForAllVariations = product.variations.flatMap(
    (variation) => variation.images,
  )
  const settings = {
    dots: false,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    onReInit: () => setCurrentSlide(slider1?.innerSlider.state.currentSlide),
    autoplaySpeed: 1000,
    lazyLoad: true,
    asNavFor: '.slider-nav',
    focusOnSelect: true,
    nextArrow: (
      <button
        type="button"
        class="slick-product-next slick-arrow"
        aria-label="Next"
        style=""
        aria-disabled="false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-right ltr-icon"
        >
          <title>Right</title>
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    ),
    prevArrow: (
      <button
        type="button"
        class="slick-product-prev slick-arrow"
        aria-label="Previous"
        aria-disabled="false"
        style=""
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-left ltr-icon"
        >
          <title>Left</title>
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }
  return (
    <Layout categories={categories}>
      <main id="content" role="main">
        <div className="container cf">
          <div className="shopify-section section-main-product page-section-spacing page-section-spacing--no-top-mobile">
            <div className="container desktop-only not-in-quickbuy cc-animate-init -in cc-animate-complete">
              <div className="page-header">
                <nav class="breadcrumbs" aria-label="Breadcrumbs">
                  <ol class="breadcrumbs-list">
                    <li class="breadcrumbs-list__item">
                      <a class="breadcrumbs-list__link" href="/">
                        Home
                      </a>{' '}
                      <span class="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-chevron-right"
                        >
                          <title>Right</title>
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </span>
                    </li>
                    <li class="breadcrumbs-list__item">
                      <a
                        class="breadcrumbs-list__link"
                        href={`/collections/${furnitureTypeSlug}`}
                      >
                        {product.furnitureTypes[0].title}
                      </a>{' '}
                      <span class="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-chevron-right"
                        >
                          <title>Right</title>
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </span>
                    </li>
                    <li class="breadcrumbs-list__item">
                      <a
                        class="breadcrumbs-list__link"
                        href={`#`}
                        aria-current="page"
                      >
                        {product.name}
                      </a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>

            <div className="product-detail quickbuy-content spaced-row container variant-status--on-sale">
              <div className="gallery gallery--layout-carousel-under gallery-size-medium product-column-left has-thumbnails cc-animate-init gallery-initialised -in cc-animate-complete">
                <div className="gallery__inner">
                  <div className="main-image">
                    <div className="slideshow product-slideshow slideshow--custom-initial slick-initialized slick-slider">
                      <Slider
                        {...settings}
                        asNavFor={nav1}
                        ref={(slider) => setSlider1(slider)}
                      >
                        {productImagesForAllVariations.map((item) => {
                          if (!item?.asset?.url) return null // Explicitly return null if url doesn't exist
                          return (
                            <div key={item.id}>
                              <div className="img-body">
                                <img src={item.asset.url} alt={product.name} />
                              </div>
                            </div>
                          )
                        })}
                      </Slider>
                    </div>
                  </div>
                  <div className="thumbnails owl-carousel owl-loaded owl-drag">
                    <div className="owl-stage-outer">
                      <div className="owl-stage">
                        {productImagesForAllVariations.map((item, idx) => {
                          if (!item?.asset?.url) return null // Explicitly return null if url doesn't exist
                          return (
                            <div
                              key={item.id}
                              className="owl-item active"
                              onClick={() => {
                                slider1?.slickGoTo(idx)
                              }}
                              style={{ height: '92px', width: '92px' }}
                            >
                              <a
                                className="thumbnail thumbnail--media-image"
                                style={{ height: '100%' }}
                              >
                                <div
                                  className="rimage-outer-wrapper"
                                  style={{ height: '100%' }}
                                >
                                  <div
                                    className="rimage-wrapper "
                                    style={{ height: '100%' }}
                                  >
                                    <img
                                      className="rimage__image fade-in lazyautosizes lazyloaded"
                                      src={item.asset.url}
                                      alt={product.name}
                                    />
                                  </div>
                                </div>
                              </a>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="detail product-column-right cc-animate-init -in cc-animate-complete">
                <div className="product-form theme-init">
                  <div className="title-row">
                    <h1 className="title">{product.name}</h1>
                  </div>
                  <div className="price-container">
                    <div className="variant-visibility-area">
                      <div className="price-area">
                        <div className="price h4-style on-sale">
                          <span className="current-price theme-money">
                            ₹{product.discountedPrice}
                          </span>
                          <span className="was-price theme-money">
                            ₹{product.originalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="vendor lightly-spaced-row">
                    <span className="product-detail-label">By&nbsp;</span>
                    <a href="#" className="vendor-link">
                      {product.vendor.name}
                    </a>
                  </div>
                </div>
                <hr className="not-in-quickbuy" />
                <div className="not-in-quickbuy">
                  <div className="product-description rte cf">
                    {/* <h4>
                      <span style={{ 'text-decoration': 'underline' }}>
                        <em>
                          <strong>About</strong>
                        </em>
                      </span>
                    </h4> */}
                    <div id="content">
                      <div className="container cf">
                        <div
                          className="shopify-section"
                          id="shopify-section-product-template"
                        >
                          <div
                            id="main-product-detail"
                            className="product-detail spaced-row container cf"
                          >
                            <div className="detail layout-column-half-right">
                              <div className="description user-content lightboximages">
                                <Markdown>
                                  {product.markdownDescription}
                                </Markdown>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

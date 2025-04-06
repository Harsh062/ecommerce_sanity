import React from 'react'

const Footer = () => {
  return (
    <div id="pagefooter">
      <div id="shopify-section-cross-page-promos" className="shopify-section">
        <div className="cross-page-promos">
          <div className="container cf">
            <div className="flexible-layout layout-all-quarters">
              <div className="column column--quarter align-center block-id-1478526632862">
                <div>
                  <div className="icon-with-caption">
                    <div className="icon-with-caption__icon">
                      <svg
                        className="icon icon--medium icon--type-truck"
                        strokeWidth="1"
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="currentColor"
                          d="M15.64 6.92L9.5 5.12V4a.5.5 0 00-.5-.5H1a.5.5 0 00-.5.5v8.5c0 .28.22.5.5.5h1.27a2.1 2.1 0 004.06 0h3.94a2.1 2.1 0 004.06 0h1.17a.5.5 0 00.5-.5V7.4a.5.5 0 00-.36-.48zM4.3 13.6a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2zM6.33 12a2.1 2.1 0 00-4.06 0H1.5V4.5h7V12H6.33zm5.97 1.6a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2zM15 12h-.67a2.1 2.1 0 00-4.06 0H9.5V6.17l5.5 1.6V12z"
                        ></path>
                      </svg>
                    </div>
                    <div className="icon-with-caption__text heading-font h6-style align-center">
                      Fast Delivery! Usually dispatch in 3-5 days
                    </div>
                  </div>
                </div>
              </div>
              <div className="column column--quarter align-center block-id-1478526645605">
                <div>
                  <div className="icon-with-caption">
                    <div className="icon-with-caption__icon">
                      <svg
                        className="icon icon--medium icon--type-lock"
                        strokeWidth="1"
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="currentColor"
                          d="M7.48 10.57v1.83a.5.5 0 001 0v-1.81a1.1 1.1 0 10-1-.02z"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M13.15 5.66h-2.08V3.79a3.7 3.7 0 00-.8-2.3C9.76.88 8.98.5 8 .5c-.98 0-1.76.37-2.29 1a3.7 3.7 0 00-.79 2.3v1.86H2.83a.5.5 0 00-.5.5V15c0 .28.23.5.5.5h10.32a.5.5 0 00.5-.5V6.16a.5.5 0 00-.5-.5zM5.9 3.92v-.08-.02c.03-.7.22-1.28.56-1.68.32-.39.81-.64 1.52-.64s1.2.26 1.52.64c.34.4.54.98.56 1.68v1.84H5.91V3.92zm6.74 10.58H3.33V6.66h9.32v7.84z"
                        ></path>
                      </svg>
                    </div>
                    <div className="icon-with-caption__text heading-font h6-style align-center">
                      100% Genuine & Branded Products
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="shopify-section-footer"
        className="shopify-section section-footer"
      >
        <div data-section-type="footer">
          <div className="container container--no-max section-footer__row-container">
            <div className="section-footer__row section-footer__row-lower">
              <div className="section-footer__row__col">
                <div className="section-footer__payment-icons"></div>
                <div className="section-footer__lower-menu" role="navigation">
                  <ul
                    className="section-footer__lower-menu__list"
                    aria-label="Secondary navigation"
                  >
                    <li>
                      <a href="/about-us">About Us</a>
                    </li>

                    <li>
                      <a href="/get-in-touch">Get In Touch</a>
                    </li>

                    {/* <li>
                      <a href="/pages/testimonials">Testimonials</a>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="section-footer__row__col">
                <div className="section-footer__localization">
                  <form
                    method="post"
                    action="/localization"
                    id="localization_form_footer"
                    acceptCharset="UTF-8"
                    className="selectors-form"
                    encType="multipart/form-data"
                  >
                    <input
                      type="hidden"
                      name="form_type"
                      value="localization"
                    />
                    <input type="hidden" name="utf8" value="✓" />
                    <input type="hidden" name="_method" value="put" />
                    <input type="hidden" name="return_to" value="/" />
                  </form>
                </div>
                <div className="copyright">
                  <span className="copy">
                    © 2025 <a href="/">SUNDARAM</a>
                  </span>
                  {/* <a
                    target="_blank"
                    rel="nofollow"
                    href="https://www.shopify.com?utm_campaign=poweredby&amp;utm_medium=shopify&amp;utm_source=onlinestore"
                  >
                    Powered by Shopify
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

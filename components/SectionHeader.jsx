import React, { useState, useEffect } from 'react'

const SectionHeader = ({ categories }) => {
  // State to hold the furniture categories and types data
  const [categoriesList, setCategoriesList] = useState(categories)
  useEffect(() => {
    const toggleMobileNav = () => {
      document.body.classList.add(
        'enable-mobile-nav-transition',
        'reveal-mobile-nav',
        'reveal-mobile-nav--revealed',
      )
    }
    const button = document.querySelector('.mobile-nav-open')
    if (button) {
      button.addEventListener('click', toggleMobileNav)
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (button) {
        button.removeEventListener('click', toggleMobileNav)
      }
    }
  }, [])
  return (
    <div id="shopify-section-header" className="shopify-section section-header">
      <style>
        {`
          .logo img {
            width: 190px;
          }
          .logo-area__middle--logo-image {
            max-width: 190px;
          }
          @media (max-width: 767.98px) {
            .logo img {
              width: 130px;
            }
          }
          .section-header {
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            z-index: 1000; /* Adjust as needed */
          }
        `}
      </style>
      <div
        data-section-type="header"
        data-cc-animate=""
        className="cc-animate-init -in cc-animate-complete"
      >
        <div
          id="pageheader"
          className="pageheader pageheader--layout-inline-menu-left pageheader--sticky"
        >
          <div className="logo-area container container--no-max">
            <div className="logo-area__left">
              <div className="logo-area__left__inner">
                <button
                  className="button notabutton mobile-nav-toggle mobile-nav-open"
                  aria-label="Toggle menu"
                  aria-controls="main-nav"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-menu"
                    aria-hidden="true"
                  >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </button>

                <div
                  className="navigation navigation--left"
                  role="navigation"
                  aria-label="Primary navigation"
                >
                  <div className="navigation__tier-1-container">
                    <ul className="navigation__tier-1">
                      <li className="navigation__item navigation__item--with-children navigation__item--with-mega-menu">
                        <a
                          href="/collections/sofa-set"
                          className="navigation__link"
                          aria-haspopup="true"
                          aria-expanded="false"
                          aria-controls="NavigationTier2-1"
                        >
                          HOME FURNITURE
                        </a>
                      </li>
                      <li className="navigation__item navigation__item--with-children navigation__item--with-small-menu">
                        <a
                          href="/collections/planters"
                          className="navigation__link"
                          aria-haspopup="true"
                          aria-expanded="false"
                          aria-controls="NavigationTier2-2"
                        >
                          KITCHEN &amp; GARDEN
                        </a>
                      </li>
                      <li className="navigation__item navigation__item--with-children navigation__item--with-small-menu">
                        <a
                          href="/collections/home-essentials"
                          className="navigation__link"
                          aria-haspopup="true"
                          aria-expanded="false"
                          aria-controls="NavigationTier2-3"
                        >
                          HOME ESSENTIALS
                        </a>
                      </li>
                      <li className="navigation__item">
                        <a
                          href="/collections/kids-furniture"
                          className="navigation__link"
                        >
                          KID's FURNITURE
                        </a>
                      </li>
                      <li className="navigation__item navigation__item--with-children navigation__item--with-small-menu">
                        <a
                          href="/collections/revolving-chairs"
                          className="navigation__link"
                          aria-haspopup="true"
                          aria-expanded="false"
                          aria-controls="NavigationTier2-5"
                        >
                          OFFICE FURNITURE
                        </a>
                      </li>
                      <li className="navigation__item">
                        <a
                          href="/collections/restaurant-furniture"
                          className="navigation__link"
                        >
                          RESTAURANT FURNITURE
                        </a>
                      </li>
                      <li className="navigation__item navigation__item--with-children navigation__item--with-small-menu">
                        <a
                          href="/collections/coolers"
                          className="navigation__link"
                          aria-haspopup="true"
                          aria-expanded="false"
                          aria-controls="NavigationTier2-7"
                        >
                          COMMERCIAL COOLERS
                        </a>
                      </li>
                      <li className="navigation__item">
                        <a
                          href="/collections/gift-cards"
                          className="navigation__link"
                        >
                          GIFT CARDS
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="logo-area__middle logo-area__middle--logo-image">
              <div className="logo-area__middle__inner">
                <div className="logo">
                  <h1 className="logo__h1">
                    <a className="logo__link" href="/" title="HOMEGENIC">
                      <img
                        className="logo__image"
                        src="/assets/sundaram_logo.png"
                        alt="HOMEGENIC"
                        itemprop="logo"
                        width="850"
                        height="337"
                      />
                    </a>
                  </h1>
                </div>
              </div>
            </div>

            <div className="logo-area__right">
              <div className="logo-area__right__inner"></div>
            </div>
          </div>
        </div>

        <div id="main-nav" className="desktop-only">
          <div
            className="navigation navigation--main"
            role="navigation"
            aria-label="Primary navigation"
          >
            <div className="navigation__tier-1-container">
              <ul className="navigation__tier-1">
                {categories.map((category, index) => {
                  const doesCategoryHaveFurnitureType =
                    category.subCategories.length ||
                    category.furnitureTypesWithoutSubCategory.length
                  const showMegaMenu = category.subCategories.length > 0
                  return (
                    <li
                      className={`navigation__item navigation__item--with-children ${showMegaMenu ? 'navigation__item--with-mega-menu' : 'navigation__item--with-small-menu'}`}
                    >
                      <a
                        href="/collections/sofa-set"
                        className="navigation__link"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-controls="NavigationTier2-1"
                      >
                        {category.title}
                      </a>
                      {doesCategoryHaveFurnitureType ? (
                        <>
                          <a className="navigation__children-toggle" href="#">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1.3"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-chevron-down"
                            >
                              <title>Toggle menu</title>
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </a>
                          <div
                            id="NavigationTier2-1"
                            className="navigation__tier-2-container navigation__child-tier"
                          >
                            <div className="container">
                              <ul
                                className={`navigation__tier-2 ${showMegaMenu ? 'navigation__columns navigation__columns--count-12 navigation__columns--over-5-cols' : ''}`}
                              >
                                {category.subCategories.map(
                                  (subCategory, index) => {
                                    return (
                                      <li className="navigation__item navigation__item--with-children navigation__column">
                                        <a
                                          href="/collections/arm-chairs"
                                          className="navigation__link navigation__column-title"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          {subCategory.title}
                                        </a>

                                        <a
                                          className="navigation__children-toggle"
                                          href="#"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="1.3"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="feather feather-chevron-down"
                                          >
                                            <title>Toggle menu</title>
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                          </svg>
                                        </a>

                                        <div className="navigation__tier-3-container navigation__child-tier">
                                          <ul className="navigation__tier-3">
                                            {subCategory.furnitureTypes.map(
                                              (furnitureType, index) => {
                                                return (
                                                  <li className="navigation__item">
                                                    <a
                                                      className="navigation__link"
                                                      href={`/collections/${furnitureType.slug.current}`}
                                                    >
                                                      {furnitureType.title}
                                                    </a>
                                                  </li>
                                                )
                                              },
                                            )}
                                          </ul>
                                        </div>
                                      </li>
                                    )
                                  },
                                )}
                                {category.furnitureTypesWithoutSubCategory.map(
                                  (furnitureTypeWithoutSubCategory) => {
                                    return (
                                      <li
                                        className={`navigation__item ${showMegaMenu ? 'navigation__column' : ''}`}
                                      >
                                        <a
                                          href={`/collections/${furnitureTypeWithoutSubCategory.slug.current}`}
                                          className="navigation__link"
                                        >
                                          {
                                            furnitureTypeWithoutSubCategory.title
                                          }
                                        </a>
                                      </li>
                                    )
                                  },
                                )}
                              </ul>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        <a
          href="#"
          className="header-shade mobile-nav-toggle"
          aria-label="general.navigation_menu.toggle_aria_label"
        ></a>
      </div>

      {/* <script>
        {`
          // Your script content here
          theme.inlineNavigationCheck = function() {
            var pageHeader = document.querySelector('.pageheader'),
                inlineNavContainer = pageHeader.querySelector('.logo-area__left__inner'),
                inlineNav = inlineNavContainer.querySelector('.navigation--left');
            if (inlineNav && getComputedStyle(inlineNav).display != 'none') {
              var inlineMenuCentered = document.querySelector('.pageheader--layout-inline-menu-center'),
                  logoContainer = document.querySelector('.logo-area__middle__inner');
              if(inlineMenuCentered) {
                var rightWidth = document.querySelector('.logo-area__right__inner').clientWidth,
                    middleWidth = logoContainer.clientWidth,
                    logoArea = document.querySelector('.logo-area'),
                    computedLogoAreaStyle = getComputedStyle(logoArea),
                    logoAreaInnerWidth = logoArea.clientWidth - Math.ceil(parseFloat(computedLogoAreaStyle.paddingLeft)) - Math.ceil(parseFloat(computedLogoAreaStyle.paddingRight)),
                    availableNavWidth = logoAreaInnerWidth - Math.max(rightWidth, middleWidth) * 2 - 40;
                inlineNavContainer.style.maxWidth = availableNavWidth + 'px';
              }

              var firstInlineNavLink = inlineNav.querySelector('.navigation__item:first-child'),
                  lastInlineNavLink = inlineNav.querySelector('.navigation__item:last-child');
              if (lastInlineNavLink) {
                var inlineNavWidth = null;
                if(document.querySelector('html[dir=rtl]')) {
                  inlineNavWidth = firstInlineNavLink.offsetLeft - lastInlineNavLink.offsetLeft + firstInlineNavLink.offsetWidth;
                } else {
                  inlineNavWidth = lastInlineNavLink.offsetLeft - firstInlineNavLink.offsetLeft + lastInlineNavLink.offsetWidth;
                }
                if (inlineNavContainer.offsetWidth >= inlineNavWidth) {
                  pageHeader.classList.add('pageheader--layout-inline-permitted');
                  var tallLogo = logoContainer.clientHeight > lastInlineNavLink.clientHeight + 20;
                  if (tallLogo) {
                    inlineNav.classList.add('navigation--tight-underline');
                  } else {
                    inlineNav.classList.remove('navigation--tight-underline');
                  }
                } else {
                  pageHeader.classList.remove('pageheader--layout-inline-permitted');
                }
              }
            }
          };
          theme.inlineNavigationCheck();

          theme.setInitialHeaderHeightProperty = () => {
            let headerHeight = 0,
                section = document.querySelector('.section-header');
            if (section) {
              headerHeight = Math.ceil(section.clientHeight);
              document.documentElement.style.setProperty('--theme-header-height', headerHeight + 'px');
            }
          };
          setTimeout(theme.setInitialHeaderHeightProperty, 0);
        `}
      </script> */}
    </div>
  )
}

export default SectionHeader

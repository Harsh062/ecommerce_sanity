import React, { useEffect } from 'react'

const MobileNavigationDrawer = ({ categories }) => {
  const openCategoryMenu = (categoryTitle) => {
    document.getElementById('mobile-nav-title').textContent = categoryTitle
    toggleNavigationDrawer()
    toggleNavItem(event)
  }
  const handleBackNavigationClick = () => {
    toggleNavigationDrawer()
    handleCategoryClose()
  }
  const handleCategoryClose = (event) => {
    const navigationItems = document.querySelectorAll(
      '.navigation__tier-1 .navigation__item--with-children',
    )

    navigationItems.forEach((item) => {
      if (item.classList.contains('navigation__item--open')) {
        item.classList.remove('navigation__item--open')
      }
    })
  }
  const toggleNavigationDrawer = () => {
    const mobileNavigationDrawerElm = document.querySelector(
      '.mobile-navigation-drawer ',
    )
    if (
      mobileNavigationDrawerElm.classList.contains(
        'mobile-navigation-drawer--child-open',
      )
    ) {
      mobileNavigationDrawerElm.classList.remove(
        'mobile-navigation-drawer--child-open',
      )
    } else {
      mobileNavigationDrawerElm.classList.add(
        'mobile-navigation-drawer--child-open',
      )
    }
  }
  const toggleNavItem = (event) => {
    const liParent = event.target.closest('li')
    if (liParent.classList.contains('navigation__item--open')) {
      liParent.classList.remove('navigation__item--open')
    } else {
      liParent.classList.add('navigation__item--open')
    }
  }
  const toggleFurnitureTypesList = (event) => {
    const parentLi = event.target.closest('li')
    if (parentLi) {
      const sibling = parentLi.querySelector('.navigation__tier-3-container')

      if (sibling) {
        if (parentLi.classList.contains('navigation__item--open')) {
          sibling.style.height = '0px'
        } else {
          sibling.style.height = 'auto'
        }
      }
    }
  }

  const handleSubcategoryClick = (event) => {
    event.preventDefault()
    toggleFurnitureTypesList(event)
    toggleNavItem(event)
  }

  useEffect(() => {
    const toggleMobileNav = () => {
      document.body.classList.remove(
        'enable-mobile-nav-transition',
        'reveal-mobile-nav',
        'reveal-mobile-nav--revealed',
      )
    }

    const button = document.querySelector('.mobile-nav-close')

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
    <div
      className="mobile-navigation-drawer"
      data-mobile-expand-with-entire-link="true"
    >
      <div
        className="navigation navigation--main"
        role="navigation"
        aria-label="Primary navigation"
      >
        <div className="navigation__tier-1-container">
          <div className="navigation__mobile-header">
            <a
              href="#"
              className="mobile-nav-back ltr-icon"
              aria-label="Back"
              onClick={handleBackNavigationClick}
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
                className="feather feather-chevron-left"
              >
                <title>Left</title>
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </a>
            <span className="mobile-nav-title" id="mobile-nav-title"></span>
            <a
              href="#"
              className="mobile-nav-close mobile-nav-toggle"
              aria-label="Close"
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
                className="feather feather-x"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </a>
          </div>
          <ul className="navigation__tier-1">
            {categories.map((category, index) => {
              const doesCategoryHaveFurnitureType =
                category.subCategories.length ||
                category.furnitureTypesWithoutSubCategory.length
              const showMegaMenu = category.subCategories.length > 0

              return (
                <li
                  key={category._id}
                  className={`navigation__item navigation__item--with-children ${
                    showMegaMenu
                      ? 'navigation__item--with-mega-menu'
                      : 'navigation__item--with-small-menu'
                  }`}
                >
                  <a
                    href="#"
                    className="navigation__link"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-controls={`NavigationTier2-${index}-mobMobileNav`}
                    onClick={(e) => {
                      e.preventDefault()
                      openCategoryMenu(category.title)
                    }}
                  >
                    {category.title}
                  </a>

                  {doesCategoryHaveFurnitureType ? (
                    <>
                      <a
                        className="navigation__children-toggle"
                        href="#"
                        onClick={() => openCategoryMenu(category.title)}
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

                      <div
                        id={`NavigationTier2-${index}-mobMobileNav`}
                        className="navigation__tier-2-container navigation__child-tier"
                        style={{ top: '54px' }}
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
                                      href="#"
                                      className="navigation__link navigation__column-title"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                      onClick={handleSubcategoryClick}
                                    >
                                      {subCategory.title}
                                    </a>

                                    <a
                                      className="navigation__children-toggle"
                                      onClick={handleSubcategoryClick}
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

                                    <div
                                      className="navigation__tier-3-container navigation__child-tier"
                                      style={{}}
                                    >
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
                                      {furnitureTypeWithoutSubCategory.title}
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
      <div className="mobile-navigation-drawer__footer">
        <div className="header-disclosures"></div>
      </div>
    </div>
  )
}

export default MobileNavigationDrawer

import React from 'react'

const SectionAnnouncementContainer = () => {
  return (
    <div
      id="section-id-announcement-bar"
      className="announcement-bar announcement-bar--with-announcement cc-animate-init -in cc-animate-complete"
      data-section-type="announcement-bar"
      data-cc-animate=""
    >
      <style>
        {`
          #section-id-announcement-bar {
            --announcement-background: #f7f1f0;
            --announcement-text: #212121;
            --link-underline: rgba(33, 33, 33, 0.6);
            --announcement-font-size: 14px;
          }
        `}
      </style>

      <div className="container container--no-max">
        <div className="announcement-bar__left desktop-only">
          <div className="social-links">
            <ul className="social-links__list">
              <li>
                <a
                  aria-label="Facebook"
                  className="facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/Homegenic2016"
                >
                  <svg
                    width="48px"
                    height="48px"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Facebook</title>
                    <path
                      fill="currentColor"
                      d="M350.638355,343 L327.649232,343 C326.185673,343 325,341.813592 325,340.350603 L325,297.649211 C325,296.18585 326.185859,295 327.649232,295 L370.350955,295 C371.813955,295 373,296.18585 373,297.649211 L373,340.350603 C373,341.813778 371.813769,343 370.350955,343 L358.119305,343 L358.119305,324.411755 L364.358521,324.411755 L365.292755,317.167586 L358.119305,317.167586 L358.119305,312.542641 C358.119305,310.445287 358.701712,309.01601 361.70929,309.01601 L365.545311,309.014333 L365.545311,302.535091 C364.881886,302.446808 362.604784,302.24957 359.955552,302.24957 C354.424834,302.24957 350.638355,305.625526 350.638355,311.825209 L350.638355,317.167586 L344.383122,317.167586 L344.383122,324.411755 L350.638355,324.411755 L350.638355,343 L350.638355,343 Z"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  aria-label="WhatsApp"
                  className="whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://web.whatsapp.com/send?phone=+919765569262"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="presentation"
                    className="icon svg-whatsapp"
                    viewBox="0 0 30.667 30.667"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M30.667,14.939c0,8.25-6.74,14.938-15.056,14.938c-2.639,0-5.118-0.675-7.276-1.857L0,30.667l2.717-8.017 c-1.37-2.25-2.159-4.892-2.159-7.712C0.559,6.688,7.297,0,15.613,0C23.928,0.002,30.667,6.689,30.667,14.939z M15.61,2.382 c-6.979,0-12.656,5.634-12.656,12.56c0,2.748,0.896,5.292,2.411,7.362l-1.58,4.663l4.862-1.545c2,1.312,4.393,2.076,6.963,2.076 c6.979,0,12.658-5.633,12.658-12.559C28.27,8.016,22.59,2.382,15.61,2.382z M23.214,18.38c-0.094-0.151-0.34-0.243-0.708-0.427 c-0.367-0.184-2.184-1.069-2.521-1.189c-0.34-0.123-0.586-0.185-0.832,0.182c-0.243,0.367-0.951,1.191-1.168,1.437 c-0.215,0.245-0.43,0.276-0.799,0.095c-0.369-0.186-1.559-0.57-2.969-1.817c-1.097-0.972-1.838-2.169-2.052-2.536 c-0.217-0.366-0.022-0.564,0.161-0.746c0.165-0.165,0.369-0.428,0.554-0.643c0.185-0.213,0.246-0.364,0.369-0.609 c0.121-0.245,0.06-0.458-0.031-0.643c-0.092-0.184-0.829-1.984-1.138-2.717c-0.307-0.732-0.614-0.611-0.83-0.611 c-0.215,0-0.461-0.03-0.707-0.03S9.897,8.215,9.56,8.582s-1.291,1.252-1.291,3.054c0,1.804,1.321,3.543,1.506,3.787 c0.186,0.243,2.554,4.062,6.305,5.528c3.753,1.465,3.753,0.976,4.429,0.914c0.678-0.062,2.184-0.885,2.49-1.739 C23.307,19.268,23.307,18.533,23.214,18.38z"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="announcement-bar__middle">
          <div className="announcement-bar__announcements">
            <div className="announcement announcement--inactive">
              <div className="announcement__text">
                <p>
                  🙏
                  <em>
                    <strong>Namaste!</strong>
                  </em>{' '}
                  <em>
                    <strong>Welcome to our Web store. </strong>
                  </em>
                </p>
              </div>
            </div>
            <div className="announcement">
              <div className="announcement__text">
                <p>
                  <strong>Made in India, Proudly Vocal for Local.</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="announcement-bar__announcement-controller">
            <button
              className="announcement-button announcement-button--previous notabutton"
              aria-label="Previous"
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
                className="feather feather-chevron-left"
              >
                <title>Left</title>
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              className="announcement-button announcement-button--next notabutton"
              aria-label="Next"
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
                className="feather feather-chevron-right"
              >
                <title>Right</title>
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div className="announcement-bar__right desktop-only">
          <div className="header-disclosures">
            <form
              method="post"
              action="/localization"
              id="localization_form_annbar"
              acceptCharset="UTF-8"
              className="selectors-form"
              encType="multipart/form-data"
            >
              <input type="hidden" name="form_type" value="localization" />
              <input type="hidden" name="utf8" value="✓" />
              <input type="hidden" name="_method" value="put" />
              <input type="hidden" name="return_to" value="/" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionAnnouncementContainer

// pages/_document.js
import React, { useEffect } from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="template-index swatch-method-standard swatch-style-listed cc-animate-enabled">
        <Main />
        <NextScript />
        <Script id="cc-animate-enabled-script" strategy="afterInteractive">
          {`
            if ('IntersectionObserver' in window) {
              document.body.classList.add("cc-animate-enabled");
            }
          `}
        </Script>
      </body>
    </Html>
  )
}

// pages/_document.js
import React, { useEffect } from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className="swatch-method-standard swatch-style-listed cc-animate-enabled">
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

import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import { Layout } from '../components'
import '../styles/globals.css'
import { StateContext } from '../context/StateContext'

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   const classes =
  //     'template-index swatch-method-standard swatch-style-listed cc-animate-enabled'.split(
  //       ' ',
  //     )
  //   document.body.classList.add(...classes)

  //   return () => {
  //     document.body.classList.remove(...classes)
  //   }
  // }, [])
  return (
    <StateContext>
      <Toaster />
      <Component {...pageProps} />
    </StateContext>
  )
}

export default MyApp

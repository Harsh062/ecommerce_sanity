import React from 'react'
import Head from 'next/head'
import { client } from '../lib/client'
import { categoriesQuery } from '../queries/index'
import { Layout } from '../components'

const AboutUs = ({ categories }) => {
  return (
    <>
      <Head>
        <title>Sundaram Furniture</title>
        <meta
          name="description"
          content="Discover premium quality furniture at Sundaram Furniture. Shop our wide collection of sofas, dining sets, beds and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout categories={categories}>
        <div
          id="shopify-section-template--15713404649575__main"
          className="shopify-section page-section-spacing"
        >
          <div className="container container--reading-width">
            <div className="page-header">
              <h1 className="majortitle">GET IN TOUCH</h1>
            </div>
            <div className="rte cf">
              <p>
                We’re not scary and we love to meet new people, so call us to
                discuss any ideas you might have on{' '}
                <strong>+91 97655 692 62</strong> <span>(11 AM - 07 PM)</span>
              </p>{' '}
              <p>
                <strong>Company Address:</strong>
              </p>
              <p>
                Sundaram Furniture, Natraj Garden Rd, Shyamlal Plots, Balaji
                Plots, Khamgaon, Maharashtra 444303
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async () => {
  const categories = await client.fetch(categoriesQuery)
  return {
    props: { categories },
  }
}

export default AboutUs

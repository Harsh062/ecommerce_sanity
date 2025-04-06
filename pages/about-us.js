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
              <h1 className="majortitle">About Us</h1>
            </div>
            <div className="rte cf">
              <p>
                Surrounding ourselves with things we love has always been a big
                part of our lives.
              </p>{' '}
              <p>
                <span style={{ color: '#000000' }}>Sundaram Furniture</span>{' '}
                grew out of this passion, our combined talents and an ever
                increasing respect for the environment.
              </p>
              <p>
                <span style={{ color: '#000000' }}>Sundaram Furniture</span>{' '}
                wants to take its time ‘like slow food’ and carefully create
                valued objects for us and you to live a long life with your new
                decor and lifestyle address. We are an online furniture store
                based in India, specialized in handmade wooden furniture and
                home decors. Bringing to you a broad collection of Indian and
                international style products you would love to have at home, in
                the kids’ room, and at the workplace. Experience online
                furniture shopping like never before with our eclectic range of
                stylish chairs, luxurious sofa sets, wooden coffee tables,
                beautiful dining sets, efficient storage pieces, and many more.
                Fulfilling your decor needs with elegant, practical, and
                affordable products that enhance and add value to your home.
              </p>
              <p>
                Looks, Style, and Quality defines a house and we at Sundaram
                unlike any other online furniture store in India make it a
                reality through our interior design services. Transforming homes
                that speak your style and complement your lifestyle. Creating
                endearing interiors, ones that are beautiful embodiment of
                sentiments, aspirations, and values. Giving your home, your
                space–perspective. Residence, office or your work-space from
                plans to designs, furniture to fit-outs we cover all. We tailor
                to your needs, providing purpose and practicality.{' '}
              </p>
              <p>
                So whether you are moving into a new house, renovating it or
                simply looking to have a change in scenery at home or work so to
                say, www.sundaramfurniture.com is here to be the one stop shop
                for all your furniture and decor needs. With a mission to make a
                lasting relationship with you, we have not only made the process
                of buying furniture online simple and convenient for you but
                valuable too.{' '}
              </p>
              <div style={{ textAlign: 'center' }}>
                {' '}
                You don’t have to travel to anywhere to enjoy luxury interiors,
                handmade furniture, home decor and Mattresses We bring it to you
                as we deals in Branded furnitures and Mattresses like:
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ color: '#ff8000' }}>
                  <strong>
                    {' '}
                    Nilkamal | Varmora | Cello | Prima | Supreme | Nilkamal
                    Mattresses | Centuary Mattresses | Aerocom Mattresses | and
                    many Multiple Brands
                  </strong>
                </span>
              </div>
              .
              <div style={{ textAlign: 'center' }}>
                For the stylish handcrafted furniture you don't need to go
                anywhere as we are the manufacturers in home and office
                furnitures under our well owned brand.
              </div>{' '}
              <div style={{ textAlign: 'center' }}>
                {' '}
                We developed our passion for interior design and now our dream
                has become reality, we are thrilled to work and serve you the
                best Quality product.
              </div>
              <div style={{ textAlign: 'center' }}>
                We believe that beautiful, handcrafted furniture should be
                accessible to all. Therefore, we tailor our services to suit
                both your budget and personal tastes, with an emphasis on
                exemplary customer service.
              </div>
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

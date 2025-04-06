import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { client } from '../lib/client'
import {
  categoriesQuery,
  groupedProductsQuery,
  collectionsOrder,
} from '../queries/index'
import { StoreInfo, FeaturedCollection, Layout } from '../components'
import { updateBodyClass } from '../utils'

const Home = ({ categories, groupedProducts }) => {
  console.log(groupedProducts)
  const router = useRouter()

  useEffect(() => {
    // Add specific body class for this page
    const removeClass = updateBodyClass('template-index')

    // Cleanup when component unmounts or route changes
    return removeClass
  }, [router.pathname])
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
        {groupedProducts.map((group, index) => (
          <FeaturedCollection
            key={group._id}
            products={group.products}
            featuredLabelText={group.featuredLabelText}
            furnitureTypeSlug={group.slug}
          />
        ))}
        <StoreInfo />
      </Layout>
    </>
  )
}

export const getServerSideProps = async () => {
  const categories = await client.fetch(categoriesQuery)
  const groupedProducts = await client.fetch(groupedProductsQuery)
  const orderedGroupedProducts = collectionsOrder
    .map((id) => groupedProducts.find((item) => item._id === id))
    .filter(Boolean)
  return {
    props: { categories, groupedProducts: orderedGroupedProducts },
  }
}

export default Home

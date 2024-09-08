import React from 'react'

import { client } from '../lib/client'
import { categoriesQuery, groupedProductsQuery } from '../queries/index'
import { StoreInfo, FeaturedCollection, Layout } from '../components'

const Home = ({ categories, groupedProducts }) => {
  return (
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
  )
}

export const getServerSideProps = async () => {
  const categories = await client.fetch(categoriesQuery)
  const groupedProducts = await client.fetch(groupedProductsQuery)
  return {
    props: { categories, groupedProducts },
  }
}

export default Home

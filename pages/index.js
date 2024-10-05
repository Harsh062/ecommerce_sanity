import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { client } from '../lib/client'
import { categoriesQuery, groupedProductsQuery } from '../queries/index'
import { StoreInfo, FeaturedCollection, Layout } from '../components'
import { updateBodyClass } from '../utils'

const Home = ({ categories, groupedProducts }) => {
  const router = useRouter()

  useEffect(() => {
    // Add specific body class for this page
    const removeClass = updateBodyClass('template-index')

    // Cleanup when component unmounts or route changes
    return removeClass
  }, [router.pathname])
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

import React from 'react'
import AnnouncementBar from './AnnouncementBar'
import SectionHeader from './SectionHeader'
import MobileNavigationDrawer from './MobileNavigationDrawer'
import Footer from './Footer'

const Layout = ({ children, categories }) => (
  <>
    <AnnouncementBar />
    <SectionHeader categories={categories} />
    <MobileNavigationDrawer categories={categories} />
    <main>{children}</main>
    <Footer />
  </>
)

export default Layout

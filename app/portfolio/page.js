import Footer from '@/public/components/layout/Footer'
import Header from '@/public/components/layout/Header'
import Portfolio from '@/public/components/portfolio/Portfolio'
import Breadcrumbs from '@/public/components/services/Breadcrumbs'
import React from 'react'

export default function page() {
  return (
    <>
      <Header />
      <Breadcrumbs items={[
        { label: "Our Case Study", link: "/portfolio" }
      ]} />
      <Portfolio />
      <Footer />
    </>
  )
}

import React from 'react'
import PortfolioCTA from '@/public/components/about/PortfolioCTA'
import Header from '@/public/components/layout/Header'
import MarqueFeature from '@/public/components/about/MarqueFeature'
import BlogAndCTA from '@/public/components/home/Blog'
import Footer from '@/public/components/about/Footer'

export default function page() {
  return (
    <>
    <Header />
      <PortfolioCTA />
      <MarqueFeature />
      <BlogAndCTA   />
      <Footer />
    </>
  )
}

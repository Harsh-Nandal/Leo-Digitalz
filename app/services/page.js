import Footer from '@/public/components/layout/Footer'
import Header from '@/public/components/layout/Header'
import Breadcrumbs from '@/public/components/services/Breadcrumbs'
import Feature from '@/public/components/services/Feature'
import HowWeWork from '@/public/components/services/HowWeWork'
import React from 'react'

export default function page() {
  return (
    <>
      <Header />
      <Breadcrumbs items={[
    { label: "Our Services", link: "/services" }
  ]}/>
  <Feature />
  <HowWeWork />
  <Footer />
    </>
  )
}

"use client";

import { useState } from "react";
import Header from "@/public/components/layout/Header";
import HeroSection from "@/public/components/home/HeroSection";
import AboutUs from "@/public/components/home/AboutUs";
import Preloader from "@/public/components/common/Preloader";
import Services from "@/public/components/home/Services";
import Portfolio from "@/public/components/home/Portfolio";
import PortfolioHeading from "@/public/components/home/PortfolioHeading";
import Testimonials from "@/public/components/home/Testimonials";
import Team from "@/public/components/home/Team";
import Contact from "@/public/components/home/Contact";
import Blog from "@/public/components/home/Blog";
import Footer from "@/public/components/layout/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Preloader on top */}
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      {/* Page ALWAYS visible behind */}
      <Header />
      <HeroSection />
      <AboutUs />
      <Services />
      <PortfolioHeading />
      <Portfolio />
      <Testimonials />
      <Team />
      <Contact />
      <Blog />
      <Footer />
    </>
  );
}
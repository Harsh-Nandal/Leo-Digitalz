"use client";

import React, { useState } from "react";
import Header from "@/public/components/layout/Header";
import Breadcrumbs from "@/public/components/services/Breadcrumbs";
import Footer from "@/public/components/layout/Footer";
import ContactForm from "@/public/components/layout/ContactForm";

export default function page() {
  

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "Contact Us", link: "/contact" }]} />
      <ContactForm bgColor={"black"} heading={"Contact Us For Your Services"} />
      <Footer />
    </>
  );
}

"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function WorkProcess() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    });
  }, []);

  const marqueeItems = [
    "DIGITAL", "CREATIVE", "AGENCY", "DESIGN", 
    "ANALYSIS", "E-commerce", "DIGITAL", "CREATIVE"
  ];

  const features = [
    {
      id: "01",
      title: "Research and analytics",
      icon: "/assets/images/icons/feature-two-icon1.svg",
      delay: "200",
    },
    {
      id: "02",
      title: "Ideation and design",
      icon: "/assets/images/icons/feature-two-icon2.svg",
      delay: "300",
    },
    {
      id: "03",
      title: "start product development",
      icon: "/assets/images/icons/feature-two-icon3.svg",
      delay: "400",
    },
  ];

  return (
    <main>
      {/* ============================ Marquee Section ======================================= */}
      <section className="maquee-area maquee-two-area overflow-hidden bg-main-three-600 position-relative z-2">
        <div className="maquee-slider">
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            loop={true}
            speed={5000}
            allowTouchMove={false}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            className="maquee-active d-flex align-items-center"
          >
            {marqueeItems.map((text, index) => (
              <SwiperSlide key={index} className="w-auto">
                <div className="maquee-box d-flex align-items-center tw-gap-10">
                  <div className="maquee-icon">
                    <span className="d-inline-block lh-1">
                      <img src="/assets/images/icons/maquee-two-icon.svg" alt="icon" />
                    </span>
                  </div>
                  <div className="maquee-content">
                    <h5 className="maquee-title maquee-two-title text-heading tw-text-24 text-uppercase fw-bold mb-0 border-text lh-1">
                      {text}
                    </h5>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <div className="maquee-bg position-relative z-1">
        <img 
          className="w-100 tw-h-735-px object-fit-cover" 
          src="/assets/images/thumbs/video-bg.jpg" 
          alt="Video Background" 
        />
      </div>

      {/* ==================== Feature Section ==================== */}
      <section className="feature-two-area tw-pt-40 text-white" style={{backgroundColor:'black'}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7">
              <div className="section-two-wrapper text-center tw-pt-10 tw-mb-18 tw-me-10">
                <h2 className="section-two-title text-uppercase tw-text-29 tw-char-animation">
                  how We Work
                </h2>
              </div>
            </div>
          </div>
          <div className="row" >
            {features.map((feature) => (
              <div key={feature.id} className="col-xl-4 col-lg-6 col-md-6">
                <div 
                  className="feature-two-wrapper tw-me-14 tw-mb-7 animation-item" 
                  data-aos="fade-up" 
                  data-aos-delay={feature.delay}
                >
                  <div className="feature-two-content d-flex align-items-center tw-gap-6 tw-mb-10">
                    <div className="position-relative z-1">
                      <span className="feature-ip-icon tw-w-31 tw-h-31 lh-1 d-inline-flex justify-content-center align-items-center bg-main-600 rounded-circle">
                        <img className="animate__wobble" src={feature.icon} alt="icon" />
                      </span>
                      <div className="feature-number position-absolute top-0 end-0">
                        <span className="tw-w-10 tw-h-10 lh-1 d-inline-flex justify-content-center align-items-center bg-white rounded-circle tw-text-lg fw-bolder text-heading">
                          {feature.id}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="feature-two-title tw-text-13 text-uppercase lh-1">
                        {feature.title}
                      </h4>
                    </div>
                  </div>
                  <div>
                    <p className="text-white fw-medium">
                      Designers, strategists, and innovators dedicated to crafting unique digital experiences.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function PortfolioHeading() {
  return (
    <>
      {/* MARQUEE SECTION */}
      <section className="maquee-area overflow-hidden" style={{ backgroundColor: "black" }}>
        <div className="maquee-slider">
          
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={30}
            loop={true}
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
          >

            {["DIGITAL", "CREATIVE", "AGENCY", "DESIGN", "ANALYSIS", "E-commerce"].map((text, i) => (
              <SwiperSlide key={i} style={{ width: "auto" }}>
                <div className="maquee-box d-flex align-items-center tw-gap-10 w-auto">
                  <div className="maquee-icon">
                    <span className="d-inline-block lh-1">
                      <img src="assets/images/icons/maquee-icon.svg" alt="icon" />
                    </span>
                  </div>
                  <div className="maquee-content">
                    <h5 className="maquee-title text-white tw-text-24 text-uppercase fw-bold mb-0 lh-1">
                      {text}
                    </h5>
                  </div>
                </div>
              </SwiperSlide>
            ))}

          </Swiper>

        </div>
      </section>

      {/* HEADING SECTION */}
      <section className="tw-pt-14 overflow-hidden" style={{ backgroundColor: "black" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-11">
              <div className="position-relative z-1 tw-mb-2">
                
                <h3 className="portfolio-top-subtitle tw-text-47 mb-0 lh-1 text-uppercase text-white">
                  portfolioD
                </h3>

                <h2 className="portfolio-top-title tw-text-83 text-main-600 mb-0 text-uppercase lh-1">
                  PROJECTS
                </h2>

                <div className="portfolio-shape position-absolute z-1">
                  <span>
                    <img
                      className="portfolio-shape-arrow"
                      src="assets/images/shapes/portfolio-arrow.png"
                      alt="arrow"
                    />
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
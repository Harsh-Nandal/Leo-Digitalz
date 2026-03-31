"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HowWeWork() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    AOS.refresh(); // ✅ IMPORTANT FIX
  }, []);

  return (
    <section className="feature-two-area pb-140" style={{backgroundColor:"black"}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7">
            <div className="section-two-wrapper text-center tw-pt-10 tw-mb-18 tw-me-10">
              <h2 className="section-two-title text-uppercase tw-text-29 tw-char-animation text-white">
                how We Work
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div
              className="feature-two-wrapper tw-me-14 tw-mb-7 animation-item"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="feature-two-content d-flex align-items-center tw-gap-6 tw-mb-10">
                <div className="position-relative z-1">
                  <span className="feature-ip-icon tw-w-31 tw-h-31 lh-1 d-inline-flex justify-content-center align-items-center bg-main-600 rounded-circle">
                    <img
                      className="animate__wobble"
                      src="assets/images/icons/feature-two-icon1.svg"
                      alt="icon"
                    />
                  </span>
                  <div className="feature-number position-absolute top-0 end-0">
                    <span className="tw-w-10 tw-h-10 lh-1 d-inline-flex justify-content-center align-items-center bg-white rounded-circle tw-text-lg fw-bolder text-main-600">
                      01
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="feature-two-title tw-text-13 text-uppercase lh-1 text-white">
                    Research and analytics
                  </h4>
                </div>
              </div>
              <div>
                <p className="text-white fw-medium text-white">
                  Designers, strategists, and innovators dedicated to crafting
                  unique digital experiences.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div
              className="feature-two-wrapper tw-me-14 tw-mb-7 animation-item"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              <div className="feature-two-content d-flex align-items-center tw-gap-6 tw-mb-10">
                <div className="position-relative z-1">
                  <span className="feature-ip-icon tw-w-31 tw-h-31 lh-1 d-inline-flex justify-content-center align-items-center bg-main-600 rounded-circle">
                    <img
                      className="animate__wobble"
                      src="assets/images/icons/feature-two-icon2.svg"
                      alt="icon"
                    />
                  </span>
                  <div className="feature-number position-absolute top-0 end-0">
                    <span className="tw-w-10 tw-h-10 lh-1 d-inline-flex justify-content-center align-items-center bg-white rounded-circle tw-text-lg fw-bolder text-main-600">
                      02
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="feature-two-title tw-text-13 text-uppercase lh-1 text-white">
                    Ideation and design
                  </h4>
                </div>
              </div>
              <div>
                <p className="text-white fw-medium">
                  Designers, strategists, and innovators dedicated to crafting
                  unique digital experiences.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div
              className="feature-two-wrapper tw-me-14 tw-mb-7 animation-item"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <div className="feature-two-content d-flex align-items-center tw-gap-6 tw-mb-10">
                <div className="position-relative z-1">
                  <span className="feature-ip-icon tw-w-31 tw-h-31 lh-1 d-inline-flex justify-content-center align-items-center bg-main-600 rounded-circle">
                    <img
                      className="animate__wobble"
                      src="assets/images/icons/feature-two-icon3.svg"
                      alt="icon"
                    />
                  </span>
                  <div className="feature-number position-absolute top-0 end-0">
                    <span className="tw-w-10 tw-h-10 lh-1 d-inline-flex justify-content-center align-items-center bg-white rounded-circle tw-text-lg fw-bolder text-main-600">
                      03
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="feature-two-title tw-text-13 text-uppercase lh-1 text-white">
                    start product development
                  </h4>
                </div>
              </div>
              <div>
                <p className="text-white fw-medium">
                  Designers, strategists, and innovators dedicated to crafting
                  unique digital experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

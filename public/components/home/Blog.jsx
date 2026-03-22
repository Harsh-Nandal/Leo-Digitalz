"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
// Import AOS and its CSS
import AOS from "aos";
import "aos/dist/aos.css";

export default function BlogAndCTA() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });

    // Parallax Scroll Logic (Relative to the section position)
    const handleScroll = () => {
      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        const viewHeight = window.innerHeight;

        // Only start moving when the section enters the viewport
        if (rect.top < viewHeight && rect.bottom > 0) {
          const movement = (viewHeight - rect.top) * 0.15;
          setScrollOffset(movement);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ==================== Blog Section Start ==================== */}
      <section
        className="blog-area py-140 overflow-hidden"
        style={{ backgroundColor: "black" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-12">
              <div className="position-relative z-1 tw-mb-14 text-center">
                <h2 className="testimonial-section-title tw-text-29 fw-semibold text-uppercase tw-char-animation text-white">
                  Read Our Articles <br /> and News
                </h2>
                <div>
                  <img
                    className="blog-shape-1 position-absolute z-n1"
                    src="/assets/images/shapes/blog-shape1.png"
                    alt="shape"
                  />
                  <img
                    className="blog-shape-2 position-absolute z-n1"
                    src="/assets/images/shapes/blog-shape2.png"
                    alt="shape"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* BLOG 1 */}
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div
                className="blog-wrapper position-relative z-1 overflow-hidden tw-mb-8"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="blog-main-thumb position-relative overflow-hidden tw-rounded-xl tw-mb-9">
                  <img
                    className="w-img w-100 tw-rounded-xl tw-transition-5"
                    src="/assets/images/thumbs/blog-thumb6.jpg"
                    alt="blog"
                  />
                  <img
                    className="w-img w-100 tw-rounded-xl tw-transition-5"
                    src="/assets/images/thumbs/blog-thumb1.jpg"
                    alt="blog"
                  />
                  <Link
                    className="blog-card-image-link d-flex align-items-center justify-content-center w-100 h-100 position-absolute z-1 top-0 start-0"
                    href="/blog-details"
                  />
                </div>
                <div className="blog-meta d-flex align-items-center tw-mb-6">
                  <span className="text-white fw-medium d-inline-flex align-items-center tw-gap-2 tw-me-3">
                    <span className="text-main-600">
                      <i className="ph ph-calendar"></i>
                    </span>{" "}
                    09 May, 2025
                  </span>
                  <span className="tw-w-3 border border-white d-inline-block"></span>
                  <Link
                    href="#"
                    className="tw-ms-3 text-main-600 fw-medium text-decoration-none"
                  >
                    Business
                  </Link>
                </div>
                <div className="tw-me-10">
                  <h4 className="tw-text-9 fw-medium hover-text-main-600">
                    <Link
                      href="/blog-details"
                      className="text-white text-decoration-none"
                    >
                      What Makes a Great Landing Page? A Designer’s Guide
                    </Link>
                  </h4>
                </div>
              </div>
            </div>

            {/* BLOG 2 */}
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div
                className="blog-wrapper position-relative z-1 overflow-hidden tw-mb-8"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="blog-main-thumb position-relative overflow-hidden tw-rounded-xl tw-mb-9">
                  <img
                    className="w-img w-100 tw-rounded-xl tw-transition-5"
                    src="/assets/images/thumbs/blog-thumb5.jpg"
                    alt="blog"
                  />
                  <img
                    className="w-img w-100 tw-rounded-xl tw-transition-5"
                    src="/assets/images/thumbs/blog-thumb2.jpg"
                    alt="blog"
                  />
                  <Link
                    className="blog-card-image-link d-flex align-items-center justify-content-center w-100 h-100 position-absolute z-1 top-0 start-0"
                    href="/blog-details"
                  />
                </div>
                <div className="blog-meta d-flex align-items-center tw-mb-6">
                  <span className="text-white fw-medium d-inline-flex align-items-center tw-gap-2 tw-me-3">
                    <span className="text-main-600">
                      <i className="ph ph-calendar"></i>
                    </span>{" "}
                    09 May, 2025
                  </span>
                  <span className="tw-w-3 border border-white d-inline-block"></span>
                  <Link
                    href="#"
                    className="tw-ms-3 text-main-600 fw-medium text-decoration-none"
                  >
                    Business
                  </Link>
                </div>
                <div className="tw-me-10">
                  <h4 className="tw-text-9 fw-medium hover-text-main-600">
                    <Link
                      href="/blog-details"
                      className="text-white text-decoration-none"
                    >
                      From Sketch to Screen: My Web Design Workflow Explained
                    </Link>
                  </h4>
                </div>
              </div>
            </div>

            {/* BLOG 3 */}
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div
                className="blog-wrapper position-relative z-1 overflow-hidden tw-mb-8"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="blog-main-thumb position-relative overflow-hidden tw-rounded-xl tw-mb-9">
                  <img
                    className="w-img w-100 tw-rounded-xl tw-transition-5"
                    src="/assets/images/thumbs/blog-thumb4.jpg"
                    alt="blog"
                  />
                  <img
                    className="w-img w-100 tw-rounded-xl tw-transition-5"
                    src="/assets/images/thumbs/blog-thumb3.jpg"
                    alt="blog"
                  />
                  <Link
                    className="blog-card-image-link d-flex align-items-center justify-content-center w-100 h-100 position-absolute z-1 top-0 start-0"
                    href="/blog-details"
                  />
                </div>
                <div className="blog-meta d-flex align-items-center tw-mb-6">
                  <span className="text-white fw-medium d-inline-flex align-items-center tw-gap-2 tw-me-3">
                    <span className="text-main-600">
                      <i className="ph ph-calendar"></i>
                    </span>{" "}
                    09 May, 2025
                  </span>
                  <span className="tw-w-3 border border-white d-inline-block"></span>
                  <Link
                    href="#"
                    className="tw-ms-3 text-main-600 fw-medium text-decoration-none"
                  >
                    Business
                  </Link>
                </div>
                <div className="tw-me-10">
                  <h4 className="tw-text-9 fw-medium hover-text-main-600">
                    <Link
                      href="/blog-details"
                      className="text-white text-decoration-none"
                    >
                      How to Choose the Right Color Palette for Your Website
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA Section Start ==================== */}
      <section
        ref={ctaRef}
        className="cta-area pb-140 overflow-hidden"
        style={{ backgroundColor: "black" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 text-center">
              <div className="position-relative z-1 tw-mb-2">
                {/* Parallax Titles */}
                <h3
                  className="portfolio-top-subtitle tw-text-47 mb-0 lh-1 text-uppercase text-white"
                  style={{
                    transform: `translateX(-${scrollOffset}px)`,
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  LET’S WORK
                </h3>

                <h2
                  className="portfolio-top-title tw-text-83 mb-0 text-uppercase lh-1 position-relative text-white"
                  style={{
                    transform: `translateX(${scrollOffset}px)`,
                    transition: "transform 0.1s ease-out",
                    zIndex: 2,
                  }}
                >
                  TOGETHER
                </h2>

                <div className="cta-button mt-5">
                  <div className="tw-hover-btn-wrapper d-inline-block">
                    <Link
                      className="tw-btn-circle tw-hover-btn-item tw-hover-btn"
                      href="/contact"
                    >
                      {/* FIX: Added position-relative and z-index to text container */}
                      <span
                        className="d-flex flex-column justify-content-center position-relative"
                        style={{ zIndex: 5 }}
                      >
                        <span className="tw-btn-circle-icon text-white tw-text-8">
                          <i className="ph ph-arrow-up-right"></i>
                        </span>
                        <span className="tw-btn-circle-text text-white fw-bold text-center tw-transition-3">
                          Contact <br /> Us
                        </span>
                      </span>
                      {/* This dot will now stay behind the text */}
                      <i
                        className="tw-btn-circle-dot"
                        style={{ zIndex: 1 }}
                      ></i>
                    </Link>
                  </div>
                </div>

                <div
                  className="portfolio-shape position-absolute z-n1"
                  style={{
                    top: "50%",
                    left: "10%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <img
                    className="portfolio-shape-arrow"
                    src="/assets/images/shapes/banner-arrow-shape.png"
                    alt="arrow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

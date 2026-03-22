"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";

export default function BrandsVideoServices() {
  return (
    <>
      {/* ============================ Brand Start section  ======================================= */}
      <div className="pb-140 " style={{backgroundColor: "Black"}}>
        <div className="container">
          <div 
            className="row row-cols-xl-5 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-1" 
            data-aos="fade-up" 
            data-aos-duration="1000" 
            data-aos-delay="200"
          >
            <div className="col">
              <div className="brand-wrapper one tw-h-36 tw-rounded-lg d-flex align-items-center justify-content-center tw-mb-7 tw-transition-5 cursor-pointer">
                <span>
                  <Image
                    src="/assets/images/thumbs/brand-img1.png"
                    alt="brand"
                    width={150}
                    height={36}
                    className="w-auto h-auto"
                  />
                </span>
              </div>
            </div>
            <div className="col">
              <div className="brand-wrapper two tw-h-36 d-flex align-items-center justify-content-center tw-mb-7 tw-transition-5 cursor-pointer">
                <span>
                  <Image
                    src="/assets/images/thumbs/brand-img2.png"
                    alt="brand"
                    width={150}
                    height={36}
                    className="w-auto h-auto"
                  />
                </span>
              </div>
            </div>
            <div className="col">
              <div className="brand-wrapper one tw-h-36 tw-rounded-lg d-flex align-items-center justify-content-center tw-mb-7 tw-transition-5 cursor-pointer">
                <span>
                  <Image
                    src="/assets/images/thumbs/brand-img3.png"
                    alt="brand"
                    width={150}
                    height={36}
                    className="w-auto h-auto"
                  />
                </span>
              </div>
            </div>
            <div className="col">
              <div className="brand-wrapper two tw-h-36 d-flex align-items-center justify-content-center tw-mb-7 tw-transition-5 cursor-pointer">
                <span>
                  <Image
                    src="/assets/images/thumbs/brand-img4.png"
                    alt="brand"
                    width={150}
                    height={36}
                    className="w-auto h-auto"
                  />
                </span>
              </div>
            </div>
            <div className="col">
              <div className="brand-wrapper one tw-h-36 tw-rounded-lg d-flex align-items-center justify-content-center tw-mb-7 tw-transition-5 cursor-pointer">
                <span>
                  <Image
                    src="/assets/images/thumbs/brand-img5.png"
                    alt="brand"
                    width={150}
                    height={36}
                    className="w-auto h-auto"
                  />
                </span>
              </div>
            </div>
            <div className="col">
              <div className="brand-wrapper two tw-h-36 d-flex align-items-center justify-content-center tw-mb-7 tw-transition-5 cursor-pointer">
                <span>
                  <Image
                    src="/assets/images/thumbs/brand-img6.png"
                    alt="brand"
                    width={150}
                    height={36}
                    className="w-auto h-auto"
                  />
                </span>
              </div>
            </div>
            <div className="col">
              <div className="brand-wrapper one tw-h-36 tw-rounded-lg d-flex align-items-center justify-content-center tw-mb-7 tw-transition-5 cursor-pointer">
                <span>
                  <Image
                    src="/assets/images/thumbs/brand-img7.png"
                    alt="brand"
                    width={150}
                    height={36}
                    className="w-auto h-auto"
                  />
                </span>
              </div>
            </div>
            <div className="col">
              <div className="brand-wrapper two tw-h-36 d-flex align-items-center justify-content-center tw-mb-7 tw-transition-5 cursor-pointer">
                <span>
                  <Image
                    src="/assets/images/thumbs/brand-img8.png"
                    alt="brand"
                    width={150}
                    height={36}
                    className="w-auto h-auto"
                  />
                </span>
              </div>
            </div>
            <div className="col">
              <div className="brand-wrapper one tw-h-36 tw-rounded-lg d-flex align-items-center justify-content-center tw-mb-7 tw-transition-5 cursor-pointer">
                <span>
                  <Image
                    src="/assets/images/thumbs/brand-img9.png"
                    alt="brand"
                    width={150}
                    height={36}
                    className="w-auto h-auto"
                  />
                </span>
              </div>
            </div>
            <div className="col">
              <div className="brand-wrapper two tw-h-36 d-flex align-items-center justify-content-center tw-mb-7 tw-transition-5 cursor-pointer">
                <span>
                  <Image
                    src="/assets/images/thumbs/brand-img10.png"
                    alt="brand"
                    width={150}
                    height={36}
                    className="w-auto h-auto"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ============================ Brand End section  ======================================= */}

      {/* ============================ video Start section ======================================= */}
      <section className="video-area pb-140 bg-img position-relative z-1 background-dark" data-background-image="/assets/images/thumbs/video-bg.jpg">
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-xl-4">
              <div className="d-flex justify-content-end position-relative z-1">
                <div 
                  className="video-button-wrap tw-mb-32 d-flex justify-content-center"
                  data-aos="fade-up" 
                  data-aos-duration="1000"
                >
                  <a 
                    className="open-popup video-button tw-w-33 tw-h-33 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-white text-heading tw-text-11 hover-bg-main-600 hover-text-heading" 
                    href="https://www.youtube.com/watch?v=Fvae8nxzVz4" 
                    data-fancybox="gallery" 
                    data-caption=""
                  >
                    <i className="ph-bold ph-play"></i>
                    <span className="ripple"></span>
                  </a>
                </div>
                <div className="video-arrow-shape position-absolute z-n1 end-0">
                  <Image
                    className="video-arrow-shape-animate"
                    src="/assets/images/shapes/video-arrow.png"
                    alt="arrow"
                    width={80}
                    height={80}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-8">
              <div 
                className="video-content"
                data-aos="fade-up" 
                data-aos-duration="1000" 
                data-aos-delay="200"
              >
                <div className="section-wrapper">
                  <h2 className="video-title tw-text-29 fw-semibold text-uppercase lh-1 tw-char-animation text-white">
                    Design solutions will help digital data analyze.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============================ video End section  ======================================= */}

      {/* ============================ Service Start section  ======================================= */}
      <section className="service-area pt-140 position-relative z-1 " style={{backgroundColor: "Black"}}>
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-9">
              <div className="tw-mb-22">
                <div 
                  className="section-wrapper tw-mb-10"
                  data-aos="fade-up" 
                  data-aos-duration="1000"
                >
                  <h2 className="section-title tw-text-29 fw-semibold text-uppercase tw-char-animation text-white">
                    WHAT WE DO
                  </h2>
                  <p className="tw-text-base fw-medium text-white tw-me-10">
                    We&apos;re a passionate team of designers, strategists, and innovators dedicated to crafting unique digital experiences – With a focus on creativity and a commitment to excellence.
                  </p>
                </div>
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" >
                  <Link 
                    href="/service" 
                    className="theme-btn-main d-inline-flex align-items-center position-relative tw-transition-all "
                  >
                    <span className="theme-btn-arrow-left tw-w-14 tw-h-14 lh-1 d-inline-flex justify-content-center align-items-center border border-white text-white rounded-circle position-absolute tw-transition-3">
                      <HiArrowRight size={20} />
                    </span>
                    <span className="theme-btn border border-white text-white tw-py-4 tw-px-10 fw-medium d-inline-flex align-items-center tw-gap-8 text-capitalize tw-rounded-4xl tw-transition-3 z-2 ">
                      Explore More
                    </span>
                    <span className="theme-btn-arrow-right tw-w-14 tw-h-14 lh-1 d-inline-flex justify-content-center align-items-center border border-white text-white rounded-circle tw-transition-3">
                      <HiArrowRight size={20} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div 
                className="service-wrapper tw-rounded-3xl position-relative z-1 tw-mb-8 tw-transition-4 overflow-hidden animation-item" 
                data-aos="fade-up" 
                data-aos-duration="1000" 
                data-aos-delay="200"
              >
                <div className="service-icon tw-mb-15">
                  <span>
                    <Image
                      className="tw-transition-3 animate__wobble"
                      src="/assets/images/icons/service-icon1.svg"
                      alt="icon"
                      width={80}
                      height={80}
                    />
                  </span>
                </div>
                <div>
                  <h4 className="service-title tw-text-13 tw-mb-5 lh-1 tw-transition-3 text-white">
                    <Link href="/service-details" className="text-white">BRAND IDENTITY</Link>
                  </h4>
                  <p className="service-paragraph text-white fw-medium tw-mb-10 tw-transition-3">
                    Building websites with clean, functional code to ensure, performance, and cross-platform compatibility.
                  </p>
                  <div className="service-list">
                    <ul>
                      <li className="d-inline-flex align-items-center tw-gap-2 text-white fw-bold tw-mb-4 tw-transition-3">
                        <span className="tw-transition-3 d-inline-block lh-1 text-main-600">
                          <i className="ph-bold ph-plus"></i>
                        </span>
                        Unique logo & typography
                      </li>
                      <li className="d-inline-flex align-items-center tw-gap-2 text-white fw-bold tw-mb-4 tw-transition-3">
                        <span className="tw-transition-3 d-inline-block lh-1 text-main-600">
                          <i className="ph-bold ph-plus"></i>
                        </span>
                        Color palette & brand guide
                      </li>
                      <li className="d-inline-flex align-items-center tw-gap-2 text-white fw-bold tw-transition-3">
                        <span className="tw-transition-3 d-inline-block lh-1 text-main-600">
                          <i className="ph-bold ph-plus"></i>
                        </span>
                        Consistent visual storytelling
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="service-button">
                  <Link className="service-btn text-white" href="/service-details">
                    <i className="ph ph-arrow-up-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div 
                className="service-wrapper tw-rounded-3xl position-relative z-1 tw-mb-8 tw-transition-4 overflow-hidden animation-item" 
                data-aos="fade-up" 
                data-aos-duration="1000" 
                data-aos-delay="300"
              >
                <div className="service-icon tw-mb-15">
                  <span>
                    <Image
                      className="tw-transition-3 animate__wobble"
                      src="/assets/images/icons/service-icon2.svg"
                      alt="icon"
                      width={80}
                      height={80}
                    />
                  </span>
                </div>
                <div>
                  <h4 className="service-title tw-text-13 tw-mb-5 lh-1 tw-transition-3 text-white">
                    <Link href="/service-details" className="text-white">WEBSITE DESIGN</Link>
                  </h4>
                  <p className="service-paragraph text-white fw-medium tw-mb-10 tw-transition-3">
                    Building websites with clean, functional code to ensure, performance, and cross-platform compatibility.
                  </p>
                  <div className="service-list">
                    <ul>
                      <li className="d-inline-flex align-items-center tw-gap-2 text-white fw-bold tw-mb-4 tw-transition-3">
                        <span className="tw-transition-3 d-inline-block lh-1 text-main-600">
                          <i className="ph-bold ph-plus"></i>
                        </span>
                        Unique logo & typography
                      </li>
                      <li className="d-inline-flex align-items-center tw-gap-2 text-white fw-bold tw-mb-4 tw-transition-3">
                        <span className="tw-transition-3 d-inline-block lh-1 text-main-600">
                          <i className="ph-bold ph-plus"></i>
                        </span>
                        Color palette & brand guide
                      </li>
                      <li className="d-inline-flex align-items-center tw-gap-2 text-white fw-bold tw-transition-3">
                        <span className="tw-transition-3 d-inline-block lh-1 text-main-600">
                          <i className="ph-bold ph-plus"></i>
                        </span>
                        Consistent visual storytelling
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="service-button">
                  <Link className="service-btn text-white" href="/service-details">
                    <i className="ph ph-arrow-up-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div 
                className="service-wrapper tw-rounded-3xl position-relative z-1 tw-mb-8 tw-transition-4 overflow-hidden animation-item" 
                data-aos="fade-up" 
                data-aos-duration="1000" 
                data-aos-delay="400"
              >
                <div className="service-icon tw-mb-15">
                  <span>
                    <Image
                      className="tw-transition-3 animate__wobble"
                      src="/assets/images/icons/service-icon3.svg"
                      alt="icon"
                      width={80}
                      height={80}
                    />
                  </span>
                </div>
                <div>
                  <h4 className="service-title tw-text-13 tw-mb-5 lh-1 tw-transition-3 text-white">
                    <Link href="/service-details" className="text-white">DIGITAL MARKETING</Link>
                  </h4>
                  <p className="service-paragraph text-white fw-medium tw-mb-10 tw-transition-3">
                    Building websites with clean, functional code to ensure, performance, and cross-platform compatibility.
                  </p>
                  <div className="service-list">
                    <ul>
                      <li className="d-inline-flex align-items-center tw-gap-2 text-white fw-bold tw-mb-4 tw-transition-3">
                        <span className="tw-transition-3 d-inline-block lh-1 text-main-600">
                          <i className="ph-bold ph-plus"></i>
                        </span>
                        Unique logo & typography
                      </li>
                      <li className="d-inline-flex align-items-center tw-gap-2 text-white fw-bold tw-mb-4 tw-transition-3">
                        <span className="tw-transition-3 d-inline-block lh-1 text-main-600">
                          <i className="ph-bold ph-plus"></i>
                        </span>
                        Color palette & brand guide
                      </li>
                      <li className="d-inline-flex align-items-center tw-gap-2 text-white fw-bold tw-transition-3">
                        <span className="tw-transition-3 d-inline-block lh-1 text-main-600">
                          <i className="ph-bold ph-plus"></i>
                        </span>
                        Consistent visual storytelling
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="service-button">
                  <Link className="service-btn text-white" href="/service-details">
                    <i className="ph ph-arrow-up-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Image
            className="service-bg-shape-1 position-absolute z-n1"
            src="/assets/images/shapes/service-bg-shape1.png"
            alt="shape"
            width={300}
            height={300}
          />
          <Image
            className="service-bg-shape-2 position-absolute z-n1"
            src="/assets/images/shapes/service-bg-shape2.png"
            alt="shape"
            width={200}
            height={200}
          />
        </div>
      </section>
      {/* ============================ Service End section  ======================================= */}
    </>
  );
}
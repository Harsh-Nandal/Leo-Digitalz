"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import { HiOutlineArrowRight } from "react-icons/hi";
import "aos/dist/aos.css";

export default function Footer() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <footer 
      className="footer position-relative z-1 bg-img" 
      style={{ backgroundImage: "url('/assets/images/thumbs/counter-bg.jpg')" }}
    >
      <div className="py-120">
        <div className="container">
          <div className="row tw-pb-24">
            <div className="col-xl-4">
              <div className="tw-mb-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <Link href="/" className="width-max-content d-block">
                  <img src="/assets/images/logo/main_logo_header.png" alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="footer-col-1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                <h4 className="tw-text-9 fw-medium text-uppercase tw-mb-2 text-white">Subscribe Now As a Newsletter</h4>
                <form action="#" className="footer-form position-relative form-submit d-flex tw-gap-3 tw-mb-3">
                  <input 
                    type="email" 
                    className="form-control bg-white shadow-none border border-neutral-700 text-heading rounded-pill tw-ps-6 tw-pe-13 focus-border-main-600 tw-h-13 tw-placeholder-text-neutral-900 focus-tw-placeholder-text-hidden tw-placeholder-transition-2" 
                    placeholder="Email..." 
                    required 
                  />
                  <div className="footer-form-button">
                    <button className="theme-btn-main tw-w-232-px d-inline-flex align-items-center position-relative tw-transition-all">
                      <span className="theme-btn-arrow-left tw-w-14 tw-h-14 lh-1 d-inline-flex justify-content-center align-items-center bg-main-600 text-heading rounded-circle position-absolute tw-transition-3">
                        <HiOutlineArrowRight/>
                      </span>
                      <span className="theme-btn bg-main-600 text-heading tw-py-4 tw-px-10 fw-medium d-inline-flex align-items-center tw-gap-8 text-capitalize tw-rounded-4xl tw-transition-3 z-2">
                        Explore More
                      </span>
                      <span className="theme-btn-arrow-right tw-w-14 tw-h-14 lh-1 d-inline-flex justify-content-center align-items-center bg-main-600 text-heading rounded-circle tw-transition-3">
                        <HiOutlineArrowRight/>
                      </span>
                    </button>
                  </div>
                </form>
                <p className="fw-medium text-white">
                  By subscribing, you’re accept{" "}
                  <Link className="text-white text-decoration-underline hover-text-main-600" href="/privacy-policy">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="row tw-pb-10">
            <div className="col-lg-3 col-sm-6" data-aos="fade-up" data-aos-duration="200">
              <div className="footer-col-2">
                <h4 className="tw-text-9 fw-medium text--white tw-mb-2">Our Service</h4>
                <span className="tw-w-26 border border-main-600 d-inline-block lh-1 tw-mb-8"></span>
                <ul className="d-flex flex-column tw-gap-5 list-unstyled">
                  <li><Link href="#" className="text--white hover-text-main-600 hover-underline">Brand identity design</Link></li>
                  <li><Link href="#" className="text--white hover-text-main-600 hover-underline">Website design & development</Link></li>
                  <li><Link href="#" className="text--white hover-text-main-600 hover-underline">Digital marketing strategy</Link></li>
                  <li><Link href="#" className="text--white hover-text-main-600 hover-underline">Content creation & copywriting</Link></li>
                  <li className="mb-0"><Link href="#" className="text--white hover-text-main-600 hover-underline">Motion graphics & video editing</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6" data-aos="fade-up" data-aos-duration="300">
              <div className="footer-col-3 tw-ms-10">
                <h4 className="tw-text-9 fw-medium text--white tw-mb-2">Company info</h4>
                <span className="tw-w-26 border border-main-600 d-inline-block lh-1 tw-mb-8"></span>
                <ul className="d-flex flex-column tw-gap-5 list-unstyled">
                  <li><Link href="#" className="text--white hover-text-main-600 hover-underline">Our Support</Link></li>
                  <li><Link href="#" className="text--white hover-text-main-600 hover-underline">What We Do</Link></li>
                  <li><Link href="/about" className="text--white hover-text-main-600 hover-underline">About Our Company</Link></li>
                  <li><Link href="/blog" className="text--white hover-text-main-600 hover-underline">Blog & News</Link></li>
                  <li><Link href="/contact" className="text--white hover-text-main-600 hover-underline">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 col-sm-6" data-aos="fade-up" data-aos-duration="400">
              <div className="footer-col-4 footer-address">
                <div className="contact-left">
                  <div className="contact-left-item d-flex tw-gap-6 tw-mb-9">
                    <div>
                      <span className="tw-w-15 tw-h-15 lh-1 d-inline-flex align-items-center justify-content-center bg-main-600 text-heading rounded-circle tw-text-8">
                        <img src="/assets/images/icons/footer-icon1.svg" alt="icon" />
                      </span>
                    </div>
                    <div>
                      <span className="fw-medium d-block text-white">Call Us 7/24</span>
                      <a className="font-heading font-white fw-medium tw-text-3xl d-block text-white hover-text-main-600" href="tel:2085550112">+208-555-0112</a>
                    </div>
                  </div>
                  <div className="contact-left-item d-flex tw-gap-6 tw-mb-9">
                    <div>
                      <span className="tw-w-15 tw-h-15 lh-1 d-inline-flex align-items-center justify-content-center bg-main-600 text-heading rounded-circle tw-text-8">
                        <img src="/assets/images/icons/footer-icon2.svg" alt="icon" />
                      </span>
                    </div>
                    <div>
                      <span className="fw-medium d-block text-white">Location</span>
                      <p className="font-heading fw-medium tw-text-3xl d-block text-white">Elgin Ltd, 31 Ashcombe, London NW5 1QU, U</p>
                    </div>
                  </div>
                  <div className="contact-left-item d-flex tw-gap-6 tw-mb-9">
                    <div>
                      <span className="tw-w-15 tw-h-15 lh-1 d-inline-flex align-items-center justify-content-center bg-main-600 text-heading rounded-circle tw-text-8">
                        <img src="/assets/images/icons/footer-icon3.svg" alt="icon" />
                      </span>
                    </div>
                    <div>
                      <span className="fw-medium d-block text-white">Make a Quote</span>
                      <a className="font-heading fw-medium tw-text-3xl d-block text-white hover-text-main-600" href="mailto:yourdomain@gmail.com">yourdomain@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="tw-py-8 border-top border-neutral-700">
          <div className="footer-copyright-wrapper d-flex align-items-center justify-content-between tw-gap-4 flex-wrap">
            <p className="text--white text-line-1 fw-normal">
              © <Link href="/" className="fw-semibold text-main-600 hover-underline hover-text-white">LeoDigitalz</Link> 2026 . All rights reserved
            </p>
            <ul className="footer-social d-flex align-items-center tw-gap-4 list-unstyled mb-0">
              <li>
                <a href="https://www.facebook.com" className="tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center text-white rounded-circle hover-bg-main-600 hover-text-heading">
                  <i className="ph-bold ph-facebook-logo"></i>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com" className="tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center text-white rounded-circle hover-bg-main-600 hover-text-heading">
                  <i className="ph-bold ph-twitter-logo"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com" className="tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center text-white rounded-circle hover-bg-main-600 hover-text-heading">
                  <i className="ph-bold ph-instagram-logo"></i>
                </a>
              </li>
              <li>
                <a href="https://www.pinterest.com" className="tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center text-white rounded-circle hover-bg-main-600 hover-text-heading">
                  <i className="ph-bold ph-pinterest-logo"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <img className="footer-bg-shape position-absolute end-0 bottom-0 z-n1" src="/assets/images/shapes/footer-bg-shape.jpg" alt="shapes" />
      </div>
    </footer>
  );
}
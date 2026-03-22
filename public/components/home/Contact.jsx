"use client";

import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";

export default function Contact() {
  return (
    <section className="contact-area bg-main-600 position-relative z-1">
      <div className="container">
        <div className="row justify-content-between tw-mb-10">
          <div className="col-xl-9 col-lg-9">
            <div className="position-relative z-2 tw-mb-2">
              <h2 className="testimonial-section-title tw-text-29 fw-semibold text-uppercase tw-char-animation text-black">
                Contact Us For Your services
              </h2>
            </div>
          </div>

          <div className="col-xl-2 col-lg-2">
            <div className="contact-top-rigght">
              <img
                src="assets/images/shapes/contact-sticker.png"
                alt="sticker"
              />
            </div>
          </div>
        </div>

        <div className="row">
          {/* LEFT */}
          <div className="col-xl-5">
            <div
              className="contact-left"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="contact-left-item d-flex tw-gap-6 tw-mb-11">
                <div>
                  <span className="tw-w-18 tw-h-18 lh-1 d-inline-flex align-items-center justify-content-center bg-black text-main-600 rounded-circle tw-text-9">
                    <FiArrowUpRight/>                  </span>
                </div>
                <div>
                  <span className="fw-medium d-block text-heading">
                    Call Us 7/24
                  </span>
                  <a
                    className="font-heading fw-medium tw-text-9 d-block text-heading hover-text-white"
                    href="tel:2085550112"
                  >
                    +208-555-0112
                  </a>
                </div>
              </div>

              <div className="contact-left-item d-flex tw-gap-6 tw-mb-11">
                <div>
                  <span className="tw-w-18 tw-h-18 lh-1 d-inline-flex align-items-center justify-content-center bg-black text-main-600 rounded-circle tw-text-9">
                    <FiArrowUpRight/>                  </span>
                </div>
                <div>
                  <span className="fw-medium d-block text-heading">
                    Location
                  </span>
                  <p className="font-heading fw-medium tw-text-9 d-block text-heading">
                    Elgin Ltd, 31 Ashcombe, London NW5 1QU, U
                  </p>
                </div>
              </div>

              <div className="contact-left-item d-flex tw-gap-6 tw-mb-11">
                <div>
                  <span className="tw-w-18 tw-h-18 lh-1 d-inline-flex align-items-center justify-content-center bg-black text-main-600 rounded-circle tw-text-9">
                    <FiArrowUpRight/>                  </span>
                </div>
                <div>
                  <span className="fw-medium d-block text-heading">
                    Make a Quote
                  </span>
                  <a
                    className="font-heading fw-medium tw-text-9 d-block text-heading hover-text-white"
                    href="mailto:yourdomain@gmail.com"
                  >
                    yourdomain@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-xl-7">
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              <form action="#">
                <div className="row">
                  <div className="col-xl-6">
                    <div className="position-relative tw-mb-4">
                      <input
                        type="text"
                        className="focus-outline-0 bg-white tw-py-3 tw-ps-5 tw-pe-15 w-100 border border-neutral-200 tw-rounded-md focus-border-main-600"
                        placeholder="Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-xl-6">
                    <div className="position-relative tw-mb-4">
                      <input
                        type="email"
                        className="focus-outline-0 bg-white tw-py-3 tw-ps-5 tw-pe-15 w-100 border border-neutral-200 tw-rounded-md focus-border-main-600"
                        placeholder="Email"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-xl-6">
                    <div className="position-relative tw-mb-4">
                      <input
                        type="text"
                        className="focus-outline-0 bg-white tw-py-3 tw-ps-5 tw-pe-15 w-100 border border-neutral-200 tw-rounded-md focus-border-main-600"
                        placeholder="Phone"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-xl-6">
                    <div className="position-relative tw-mb-4">
                      <input
                        type="text"
                        className="focus-outline-0 bg-white tw-py-3 tw-ps-5 tw-pe-15 w-100 border border-neutral-200 tw-rounded-md focus-border-main-600"
                        placeholder="Department"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-xl-12">
                    <div className="position-relative tw-mb-4">
                      <textarea
                        className="focus-outline-0 bg-white tw-py-4 tw-ps-4 w-100 border border-neutral-200 tw-rounded-md focus-border-main-600 tw-h-184-px"
                        placeholder="Enter Your Message here"
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-xl-12">
                    <div>
                      <button className="theme-btn-main d-inline-flex align-items-center position-relative tw-transition-all">
                        <span className="theme-btn-arrow-left tw-w-14 tw-h-14 lh-1 d-inline-flex justify-content-center align-items-center bg-black text-main-600 rounded-circle position-absolute tw-transition-3">
                          <HiOutlineArrowRight/>
                        </span>
                        <span className="theme-btn bg-black text-main-600 tw-py-4 tw-px-10 fw-medium d-inline-flex align-items-center tw-gap-8 text-capitalize tw-rounded-4xl tw-transition-3 z-2">
                          Send Your Message
                        </span>
                        <span className="theme-btn-arrow-right tw-w-14 tw-h-14 lh-1 d-inline-flex justify-content-center align-items-center bg-black text-main-600 rounded-circle tw-transition-3">
                          <HiOutlineArrowRight/>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div>
        <img
          className="contact-shape position-absolute z-n1"
          src="assets/images/shapes/contact-shape.png"
          alt="shape"
        />
      </div>
    </section>
  );
}
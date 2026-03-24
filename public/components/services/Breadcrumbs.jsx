"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { PiCaretRightBold } from "react-icons/pi";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Breadcrumbs({ items = [] }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      {/* Breadcrumb Section */}
      <section
        className="breadcrumb-area bg-img position-relative z-1 overflow-hidden"
        style={{
          backgroundImage: "url('/assets/images/thumbs/breadcrumb-bg.jpg')",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div>
                {/* Breadcrumb List */}
                <ul className="d-flex align-items-center justify-content-center tw-gap-4 tw-mb-7 list-unstyled flex-wrap">
                  {/* Home */}
                  <li className="tw-text-lg fw-medium" data-aos="fade-up">
                    <Link
                      href="/"
                      className="text-white d-inline-flex align-items-center tw-gap-3"
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src="/assets/images/icons/breadcrumb-home-icon.svg"
                        alt="home"
                        width={18}
                      />
                      Home
                    </Link>
                  </li>

                  {/* Dynamic Items */}
                  {items.map((item, index) => (
                    <React.Fragment key={index}>
                      <li
                        className="text-white d-flex align-items-center"
                        data-aos="fade-up"
                      >
                        <PiCaretRightBold />
                        <PiCaretRightBold />
                      </li>
                      

                      <li className="tw-text-lg fw-medium" data-aos="fade-up">
                        {item.link ? (
                          <Link
                            href={item.link}
                            className="text-white hover-text-main-600"
                            style={{ textDecoration: "none" }}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span className="text-white">{item.label}</span>
                        )}
                      </li>
                    </React.Fragment>
                  ))}
                </ul>

                {/* Title */}
                <h2
                  className="breadcrumb-title text-center tw-mb-6 text-white tw-text-29 text-uppercase lh-1"
                  data-aos="fade-up"
                >
                  {items.length > 0 ? items[items.length - 1].label : "Page"}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 SHAPES WITH ANIMATION */}
        <div>
          <img
            className="breadcrumb-shape-1 banner-rotate-content position-absolute z-n1"
            src="/assets/images/shapes/breadcrumb-shape1.png"
            alt="shape"
          />

          <img
            className="breadcrumb-shape-2 banner-arrow-animation position-absolute z-n1"
            src="/assets/images/shapes/breadcrumb-shape2.png"
            alt="shape"
          />
        </div>
      </section>
    </>
  );
}

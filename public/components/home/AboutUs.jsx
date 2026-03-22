"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "phosphor-react";

export default function AboutUs() {
  const ballRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ball = ballRef.current;
    const section = sectionRef.current;

    if (!ball || !section) return;

    let rotation = 0;

    const rotateBall = () => {
      rotation += 0.2; // Slower rotation for scroll effect
      ball.style.transform = `rotate(${rotation}deg)`;
      requestAnimationFrame(rotateBall);
    };
    rotateBall();

    // Enhanced scroll-triggered rotation speed
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollProgress =
        (window.innerHeight - rect.top) / window.innerHeight;

      if (scrollProgress > 0 && scrollProgress < 1) {
        const scrollRotation = scrollProgress * 2; // Scroll influences rotation speed
        ball.style.transform = `rotate(${rotation + scrollRotation * 10}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-area py-140 position-relative z-1 overflow-hidden background-cover"
    >
      <div className="container">
        {/* Top Row */}
        <div className="row align-items-center tw-mb-18">
          <div className="col-xl-7 col-lg-7">
            <div
              className="section-wrapper"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <h2 className="section-title tw-text-29 fw-semibold text-uppercase tw-char-animation text-white">
                ABOUT AGENCY
              </h2>
              <p className="tw-text-lg fw-medium text-white tw-me-10">
                We&apos;re brand builders, storytellers, and digital architects
                crafting experiences that connect, convert, and cut through the
                noise. From strategy to execution, we blend creativity with
                precision to help ambitious.
              </p>
            </div>
          </div>

          <div className="col-xl-5 col-lg-5">
            <div
              className="about-right d-flex justify-content-end flex-wrap"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              <div>
                <span>
                  <Image
                    src="/assets/images/shapes/about-sticker.png"
                    alt="sticker"
                    width={120}
                    height={120}
                    className="w-100 h-auto"
                  />
                </span>
              </div>
              <div className="d-flex align-items-center tw-gap-3">
                <h2 className="tw-text-29 fw-semibold font-heading text-white">
                  46+
                </h2>
                <p className="tw-text-xl fw-medium text-white">
                  YEARS OF <br /> EXPERIENCE
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="row">
          <div className="col-xl-6">
            <div
              className="about-bg"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <Image
                src="/assets/images/thumbs/about-bg.jpg"
                alt="thumb"
                width={600}
                height={500}
                className="tw-rounded-lg w-100 h-auto"
                priority
              />
            </div>
          </div>

          <div className="col-xl-6 col-lg-8 col-md-10">
            <div
              className="about-content position-relative z-1"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              {/* Arrow Shape */}
              <div className="tw-mb-10 tw-ms-20">
                <span>
                  <Image
                    src="/assets/images/shapes/about-arrow.png"
                    alt="arrow"
                    width={80}
                    height={80}
                  />
                </span>
              </div>

              <h4 className="about-paragraph tw-text-20 tw-mb-18 tw-me-6 text-white">
                We are a team of passionate and crazy individuals dedicated to
                bringing your ideas to life
              </h4>

              {/* Animated Button */}
              <div className="about-button">
                <Link
                  href="/about"
                  className="theme-btn-main d-inline-flex align-items-center position-relative group tw-transition-all"
                >
                  {/* LEFT ARROW */}
                  <span
                    className="theme-btn-arrow-left tw-w-14 tw-h-14 d-inline-flex justify-content-center items-center 
          rounded-circle position-absolute tw-transition-all duration-300
          bg-main-600 text-white
          -tw-left-6 group-hover:-tw-left-2 z-10"
                  >
                    <ArrowRight size={18} weight="bold" />
                  </span>

                  {/* MAIN BUTTON */}
                  <span
                    className="theme-btn bg-main-600 text-white tw-py-4 tw-px-10 fw-medium 
          d-inline-flex align-items-center tw-gap-8 text-capitalize 
          tw-rounded-4xl tw-transition-all duration-300 z-20
          group-hover:bg-main-700
          group-hover:tw-pl-12 group-hover:tw-pr-12
          hover:tw-shadow-[0_10px_25px_rgba(255,106,0,0.35)]"
                  >
                    Explore More
                  </span>

                  {/* RIGHT ARROW */}
                  <span
                    className="theme-btn-arrow-right tw-w-14 tw-h-14 d-inline-flex justify-content-center items-center 
          rounded-circle tw-transition-all duration-300 tw-ml-2 z-10
          bg-main-600 text-white
          group-hover:bg-main-700
          group-hover:tw-translate-x-2"
                  >
                    <ArrowRight size={18} weight="bold" />
                  </span>
                </Link>
              </div>
              {/* Scroll-Triggered Rotating Ball */}
              <div className="about-ball position-absolute z-n1">
                <Image
                  ref={ballRef}
                  id="reload"
                  src="/assets/images/shapes/about-ball.png"
                  alt="about"
                  width={200}
                  height={200}
                  className="w-100 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Shape */}
      <div>
        <Image
          className="about-bg-shape position-absolute z-n1"
          src="/assets/images/shapes/about-bg-shape.png"
          alt="shape"
          width={400}
          height={400}
          priority
        />
      </div>
    </section>
  );
}

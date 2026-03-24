"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import PortfolioHeading from "../home/PortfolioHeading";
import Portfolio from "../home/Portfolio";

// React Icons
import { 
  PiCaretRightBold, 
  PiStarFill, 
  PiCaretRight, 
  PiArrowRight 
} from "react-icons/pi";
import Testimonials from "../home/Testimonials";

export default function AboutAndPortfolio() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    });
  }, []);

  const portfolioItems = [
    { id: 1, title: "BRANDING STRATEGY FOR MODERN STARTUPS", img: "/assets/images/thumbs/portfolio-thumb1.jpg" },
    { id: 2, title: "Branding Tactics for Emerging Startups", img: "/assets/images/thumbs/portfolio-thumb2.jpg" },
    { id: 3, title: "Building a Strong Brand Identity for Startups", img: "/assets/images/thumbs/portfolio-thumb3.jpg" },
    { id: 4, title: "Branding Playbook for the New-Age Startup", img: "/assets/images/thumbs/portfolio-thumb4.jpg" },
  ];

  return (
    <>
    <main className="overflow-hidden">
      {/* ==================== Breadcrumb Start ==================== */}
      <section 
        className="breadcrumb-area bg-img position-relative z-1 overflow-hidden" 
        style={{ backgroundImage: "url('/assets/images/thumbs/breadcrumb-bg.jpg')", backgroundSize: 'cover' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center">
                <ul className="d-flex align-items-center justify-content-center tw-gap-4 tw-mb-7 list-unstyled">
                  <li className="tw-text-lg fw-medium">
                    <Link href="/" className="text-white hover--translate-y-1 hover-underline d-inline-flex align-items-center tw-gap-3 text-decoration-none">
                      <span className="d-inline-flex lh-1">
                        <img src="/assets/images/icons/breadcrumb-home-icon.svg" alt="home" />
                      </span> 
                      Home
                    </Link> 
                  </li>
                  <li className="d-flex align-items-center text-white">
                    <PiCaretRightBold />
                    <PiCaretRightBold />
                  </li>
                  <li className="tw-text-lg fw-medium"> 
                    <span className="text-white"> About LeoDigitalz </span> 
                  </li>
                </ul>
                <h2 className="breadcrumb-title tw-mb-6 text-white tw-text-29 text-uppercase lh-1"> About LeoDigitalz</h2>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img className="breadcrumb-shape-1 banner-rotate-content position-absolute z-n1" src="/assets/images/shapes/breadcrumb-shape1.png" alt="shape" />
          <img className="breadcrumb-shape-2 position-absolute z-n1" src="/assets/images/shapes/breadcrumb-shape2.png" alt="shape" />
        </div>
      </section>

      {/* ==================== About Section Start ==================== */}
      <section className="about-four-area py-140" style={{backgroundColor: "black"}}>
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4">
              <div className="tw-mb-8" data-aos="fade-up" data-aos-delay="200">
                <div className="tw-mb-12">
                  <span className="border border-white text-white tw-rounded-4xl tw-py-2 tw-px-6">About Our Company</span>
                </div>
                <div className="d-flex tw-gap-6">
                  <div>
                    <h6 className="about-four-rating tw-text-sm fw-medium font-body tw-mb-3">CLUTCH AVERAGE RATING</h6>
                    <div className="d-flex tw-gap-4 align-items-center">
                      <p className="text-white fw-bold mb-0">4.8 out of 5 </p>
                      <div className="text-main-600 d-flex">
                        <PiStarFill /><PiStarFill /><PiStarFill /><PiStarFill /><PiStarFill />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link href="/" className="tw-transition-3 text-decoration-none">
                      <span className="tw-w-122 tw-h-122 lh-1 d-inline-flex justify-content-center align-items-center rounded-circle bg-main-six-600 text-white hover-bg-main-600">
                        <PiCaretRight size={24} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-8 col-lg-8">
              <div data-aos="fade-up" data-aos-delay="300">
                <div className="tw-mb-14">
                  <div className="section-two-wrapper tw-mb-9">
                    <h2 className="section-two-title tw-text-20 tw-char-animation text-white">
                      Your story comes alive with amazing visuals wrapped up in top-notch animation video production and engaging storytelling.
                    </h2>
                  </div>
                  <div className="about-three-button">
                    <Link href="/" className="theme-btn-main tw-w-232-px d-inline-flex align-items-center position-relative tw-transition-all text-decoration-none">
                      <span className="theme-btn-arrow-left tw-w-14 tw-h-14 lh-1 d-inline-flex justify-content-center align-items-center bg-main-600 text-heading rounded-circle position-absolute tw-transition-3"><PiArrowRight /></span>
                      <span className="theme-btn bg-main-600 text-heading tw-py-4 tw-px-10 fw-medium d-inline-flex align-items-center tw-gap-8 text-capitalize tw-rounded-4xl tw-transition-3 z-2">Explore More</span>
                      <span className="theme-btn-arrow-right tw-w-14 tw-h-14 lh-1 d-inline-flex justify-content-center align-items-center bg-main-600 text-heading rounded-circle tw-transition-3"><PiArrowRight /></span>
                    </Link>
                  </div>
                </div>
                
                <div className="about-four-wrap d-flex tw-gap-25 flex-column flex-md-row">
                  {[
                    { icon: "/assets/images/icons/about-ip-icon1.svg", title: "Award Winning" },
                    { icon: "/assets/images/icons/about-ip-icon2.svg", title: "Best Quality" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1">
                      <div className="about-four-content animation-item d-flex tw-gap-6 tw-mb-4 align-items-center">
                        <img className="animate__wobble" src={item.icon} alt="icon" />
                        <h4 className="tw-text-13 text-white mb-0">{item.title}</h4>
                      </div>
                      <p className="fw-medium text-white">
                        After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.
                      </p>
                    </div>
                  ))}
                </div>
              </div>  
            </div>
          </div>
        </div>
      </section>
      <section className="cta-two-area pb-140" style={{backgroundColor:"black"}}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-6">
                    <div className="cta-two-thumb one tw-mb-5 position-relative z-1 h-100" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                        <img className="tw-rounded-xl w-100 h-100" src="assets/images/thumbs/cta-two-thumb1.jpg" alt="thumb"/>
                        <div className="cta-two-content position-absolute tw-me-29">
                            <div className="cta-two-arrow tw-mb-37">
                                <img className="video-arrow-shape-animate" src="assets/images/shapes/cta-two-arrow.png" alt="arrow"/>
                            </div>
                            <div>
                                <h4 className="cta-two-title text-heading tw-text-20 lh-1 tw-mb-8">Dedicated to Transforming Your Ideas Into Impactful Digital</h4>
                                <p className="tw-pb-10">We’re a passionate team of designers, strategists, and innovators dedicated to crafting unique digital experiences – With a focus on creativity and a commitment to excellence.</p>
                                <div className="cta-two-button">
                                    <a className="theme-btn-main d-inline-flex align-items-center position-relative tw-transition-all" href="javascript:void(0)">
                                        <span className="theme-btn-arrow-left tw-w-14 tw-h-14 lh-1 d-inline-flex justify-content-center align-items-center bg-main-600 text-heading rounded-circle position-absolute tw-transition-3"><i className="ph ph-arrow-right"></i></span>
                                        <span className="theme-btn bg-main-600 text-heading tw-py-4 tw-px-10 fw-medium d-inline-flex align-items-center tw-gap-8 text-capitalize tw-rounded-4xl tw-transition-3 z-2">Explore More</span>
                                        <span className="theme-btn-arrow-right tw-w-14 tw-h-14 lh-1 d-inline-flex justify-content-center align-items-center bg-main-600 text-heading rounded-circle tw-transition-3"><i className="ph ph-arrow-right"></i></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="cta-two-thumb two tw-mb-5 position-relative z-1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                                <img className="tw-rounded-xl w-100" src="assets/images/thumbs/cta-two-thumb2.jpg" alt="thumb"/>
                                <div className="cta-two-counter position-absolute">
                                    <div className="counter-wrapper d-flex align-items-center tw-gap-4">
                                        <h2 className="counter-title tw-text-29 fw-semibold font-heading text-main-600 mb-0 lh-1"><span className="font-heading odometer" data-count="7940"></span>+</h2>
                                        <p className="tw-text-base fw-medium text-heading text-uppercase">Visited <br/>
                                            Conferences</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="cta-two-thumb three" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                <img className="tw-rounded-xl w-100" src="assets/images/thumbs/cta-two-thumb3.jpg" alt="thumb"/>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="cta-two-thumb four position-relative z-1 animation-item" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                                <img className="tw-rounded-xl w-100" src="assets/images/thumbs/cta-two-thumb4.jpg" alt="thumb"/>
                                <div className="cta-two-content position-absolute tw-me-10">
                                    <div className="cta-two-icon tw-mb-14">
                                        <span><img className="animate__wobble" src="assets/images/icons/cta-two-light-ip.svg" alt="light"/></span>
                                    </div>
                                    <div>
                                        <h4 className="cta-two-sm-title text-heading tw-text-13">SOX compliance</h4>
                                        <p className="">We specialize in creating, developing, and managing a brand’s identity to help.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    </main>

    <PortfolioHeading/>
    <Portfolio />
    <Testimonials />
    </>
  );
}
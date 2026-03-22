"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import CountUp from "react-countup";
import AOS from "aos";
import { PiFacebookLogoBold, PiTwitterLogoBold, PiInstagramLogoBold, PiPinterestLogoBold } from "react-icons/pi";

// Import AOS styles in your layout.js or here
import "aos/dist/aos.css";

const counterData = [
  {
    count: 45,
    suffix: "+",
    label: "YEARS OF",
    subLabel: "EXPERIENCE",
    delay: 200,
  },
  {
    count: 23,
    suffix: "k",
    label: "World-wide",
    subLabel: "Cllient",
    delay: 300,
  },
  {
    count: 90,
    suffix: "+",
    label: "Visited",
    subLabel: "Conferences",
    delay: 400,
  },
  {
    count: 68,
    suffix: "k+",
    label: "YEARS OF",
    subLabel: "EXPERIENCE",
    delay: 500,
  },
];

const teamData = [
  {
    id: 1,
    name: "John Smith",
    role: "Digital Product Management",
    img: "/assets/images/thumbs/team-thumb1.png",
    delay: 200,
    mt: "",
  },
  {
    id: 2,
    name: "John Smith",
    role: "Digital Product Management",
    img: "/assets/images/thumbs/team-thumb2.png",
    delay: 300,
    mt: "tw-mt-25",
  },
  {
    id: 3,
    name: "John Smith",
    role: "Digital Product Management",
    img: "/assets/images/thumbs/team-thumb3.png",
    delay: 400,
    mt: "",
  },
  {
    id: 4,
    name: "John Smith",
    role: "Digital Product Management",
    img: "/assets/images/thumbs/team-thumb4.png",
    delay: 500,
    mt: "tw-mt-25",
  },
];

export default function TeamSection() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    });
  }, []);

  return (
    <section className="py-140 position-relative z-2">
      {/* ============================ counter section Start ======================================= */}
      <div className="counter-area pb-140">
        <div className="container">
          <div className="row">
            {counterData.map((item, index) => (
              <div key={index} className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                <div
                  className="counter-border tw-mb-8"
                  data-aos="fade-up"
                  data-aos-delay={item.delay}
                >
                  <div className="counter-wrapper text-center">
                    <h2 className="counter-title tw-text-29 fw-semibold font-heading text-main-600 mb-0 lh-1">
                      <span className="font-heading">
                        <CountUp
                          end={item.count}
                          enableScrollSpy
                          scrollSpyOnce
                        />
                      </span>
                      {item.suffix}
                    </h2>
                    <p className="tw-text-base fw-medium text-white text-uppercase">
                      {item.label} <br /> {item.subLabel}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================ team section Start ======================================= */}
      <div className="team-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-3 col-lg-3 col-md-3">
              <div className="text-capitalize">
                <img
                  className="team-top-img"
                  src="/assets/images/shapes/team-shape.png"
                  alt="shape"
                />
              </div>
            </div>
            <div className="col-xl-7 col-lg-9 col-md-9">
              <div className="position-relative z-2 tw-mb-2">
                <h2 className="testimonial-section-title tw-text-29 fw-semibold text-uppercase tw-char-animation text-white">
                  meet with our special creative members
                </h2>
              </div>
            </div>
            <div className="col-xl-2">
              <div className="tw-hover-btn-wrapper d-inline-block tw-mt-30">
                <Link
                  href="/team"
                  className="tw-btn-circle tw-hover-btn-item tw-hover-btn"
                >
                  <span className="d-flex flex-column justify-content-center">
                    <span className="tw-btn-circle-icon text-main-600 tw-text-8">
                      <i className="ph ph-arrow-up-right"></i>
                    </span>
                    <span className="text-main-600 fw-bold text-center tw-transition-3">
                      View All <br /> Members
                    </span>
                  </span>
                  <i className="tw-btn-circle-dot"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="row">
            {teamData.map((member) => (
              <div
                key={member.id}
                className="col-xl-3 col-lg-6 col-md-6 col-sm-6"
              >
                <div
                  className={`team-wrapper ${member.mt} tw-mb-8 position-relative z-1 overflow-hidden`}
                  data-aos="fade-up"
                  data-aos-delay={member.delay}
                >
                  <div>
                    <Link className="d-block" href="/team-details">
                      <img
                        className="w-100"
                        src={member.img}
                        alt={member.name}
                      />
                    </Link>
                  </div>
                  <div className="team-wrap">
                    <div className="team-content text-center">
                      <div className="team-traslate">
                        <h4 className="tw-text-9 tw-mb-1">
                          <Link
                            href="/team-details"
                            className="text-white text-decoration-none"
                          >
                            {member.name}
                          </Link>
                        </h4>
                        <p className="tw-text-sm text-white fw-medium tw-mb-4">
                          {member.role}
                        </p>
                        <div>
                          <ul className="d-flex align-items-center justify-content-center tw-gap-1 list-unstyled">
                            {[
                              {
                                name: "facebook",
                                icon: <PiFacebookLogoBold />,
                              },
                              { name: "twitter", icon: <PiTwitterLogoBold /> },
                              {
                                name: "instagram",
                                icon: <PiInstagramLogoBold />,
                              },
                              {
                                name: "pinterest",
                                icon: <PiPinterestLogoBold />,
                              },
                            ].map((social) => (
                              <li key={social.name}>
                                <a
                                  href={`https://www.${social.name}.com`}
                                  className="tw-w-10 tw-h-10 lh-1 d-inline-flex justify-content-center align-items-center bg-white text-heading rounded-circle hover-bg-main-600 hover-text-white text-decoration-none tw-transition-3"
                                >
                                  {/* Render the React Icon component directly */}
                                  <span className="tw-text-xl d-flex">
                                    {social.icon}
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div>
        <img
          className="position-absolute w-100 tw-h-1220-px top-0 start-0 z-n1"
          src="/assets/images/thumbs/counter-bg.jpg"
          alt="bg"
          style={{ objectFit: "cover" }}
        />
      </div>
    </section>
  );
}

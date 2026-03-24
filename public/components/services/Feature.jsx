import React from "react";
import Link from "next/link";
import { PiPlusBold, PiArrowUpRight } from "react-icons/pi";

export default function Feature() {
  return (
    <>
      {/* Services Grid Section */}
      <section className="service-ip-area py-140" style={{backgroundColor:"black"}}>
        <div className="container">
          <div className="row">
            {/* Service Item Start */}
            {[
              {
                title: "BRAND IDENTITY",
                icon: "service-icon1.svg",
                delay: "200",
              },
              {
                title: "WEBSITE DESIGN",
                icon: "service-icon2.svg",
                delay: "300",
              },
              {
                title: "DIGITAL MARKETING",
                icon: "service-icon3.svg",
                delay: "400",
              },
              {
                title: "VIDEO PRODUCTION",
                icon: "service-icon4.svg",
                delay: "200",
              },
              {
                title: "CREATIVE CONSULTING",
                icon: "service-icon5.svg",
                delay: "300",
              },
              {
                title: "BRAND STRATEGY",
                icon: "service-icon6.svg",
                delay: "400",
              },
            ].map((service, index) => (
              <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                <div
                  className="service-wrapper tw-rounded-3xl animation-item position-relative z-1 tw-mb-15 tw-transition-4 overflow-hidden"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={service.delay}
                >
                  <div className="service-icon tw-mb-15">
                    <span>
                      <img
                        className="tw-transition-3 animate__wobble"
                        src={`/assets/images/icons/${service.icon}`}
                        alt="icon"
                      />
                    </span>
                  </div>
                  <div>
                    <h4 className="service-title tw-text-13 tw-mb-5 lh-1 tw-transition-3">
                      <Link href="/service-details">{service.title}</Link>
                    </h4>
                    <p className="service-paragraph text-white fw-medium tw-mb-10 tw-transition-3">
                      Building websites with clean, functional code to ensure,
                      performance, and cross-platform compatibility.
                    </p>
                    <div className="service-list">
                      <ul className="list-unstyled">
                        <li className="d-inline-flex align-items-center tw-gap-2 text-white fw-bold tw-mb-4 tw-transition-3">
                          <span className="tw-transition-3 d-inline-block lh-1 text-main-600">
                            <PiPlusBold />
                          </span>{" "}
                          Unique logo & typography
                        </li>
                        <li className="d-inline-flex align-items-center tw-gap-2 text-white fw-bold tw-mb-4 tw-transition-3">
                          <span className="tw-transition-3 d-inline-block lh-1 text-main-600">
                            <PiPlusBold />
                          </span>{" "}
                          Color palette & brand guide
                        </li>
                        <li className="d-inline-flex align-items-center tw-gap-2 text-white fw-bold tw-transition-3">
                          <span className="tw-transition-3 d-inline-block lh-1 text-main-600">
                            <PiPlusBold />
                          </span>{" "}
                          Consistent visual storytelling
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="service-button">
                    <Link className="service-btn" href="/service-details">
                      <PiArrowUpRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {/* Service Item End */}
          </div>
        </div>
      </section>
    </>
  );
}

import React from "react";
import Link from "next/link";
import { PiPlusBold, PiArrowUpRight } from "react-icons/pi";
import Service from "@/models/Service";
import { connectDB } from "@/lib/mongodb";

export default async function Feature() {
  await connectDB();

  const services = await Service.find().sort({ order: 1 });

  return (
    <section
      className="service-ip-area py-140"
      style={{ backgroundColor: "black" }}
    >
      <div className="container">
        <div className="row">

          {services.map((service, index) => (
            <div className="col-xl-4 col-lg-6 col-md-6" key={service._id}>
              <div
                className="service-wrapper tw-rounded-3xl animation-item position-relative z-1 tw-mb-15 tw-transition-4 overflow-hidden"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={service.delay || 200}
              >
                {/* ICON */}
                <div className="service-icon tw-mb-15">
                  <span>
                    <img
                      className="tw-transition-3 animate__wobble"
                      src={service.icon || "/assets/images/icons/default.svg"}
                      alt={service.title}
                    />
                  </span>
                </div>

                <div>
                  {/* TITLE → SLUG PAGE */}
                  <h4 className="service-title tw-text-13 tw-mb-5 lh-1 tw-transition-3">
                    <Link href={`/services/${service.slug}`}>
                      {service.title}
                    </Link>
                  </h4>

                  {/* SHORT DESCRIPTION */}
                  <p className="service-paragraph text-white fw-medium tw-mb-10 tw-transition-3">
                    {service.shortDescription ||
                      "High quality digital service for your business growth."}
                  </p>

                  {/* FEATURES */}
                  <div className="service-list">
                    <ul className="list-unstyled">
                      {service.features?.slice(0, 3).map((f, i) => (
                        <li
                          key={i}
                          className="d-inline-flex align-items-center tw-gap-2 text-white fw-bold tw-mb-4 tw-transition-3"
                        >
                          <span className="tw-transition-3 d-inline-block lh-1 text-main-600">
                            <PiPlusBold />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* BUTTON → SLUG PAGE */}
                <div className="service-button">
                  <Link
                    className="service-btn"
                    href={`/services/${service.slug}`}
                  >
                    <PiArrowUpRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
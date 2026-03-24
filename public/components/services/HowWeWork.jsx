"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HowWeWork() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    AOS.refresh(); // ✅ IMPORTANT FIX
  }, []);

  const steps = [
    {
      icon: "/assets/images/icons/feature-two-icon1.svg",
      title: "Research and analytics",
      number: "01",
    },
    {
      icon: "/assets/images/icons/feature-two-icon2.svg",
      title: "Ideation and design",
      number: "02",
    },
    {
      icon: "/assets/images/icons/feature-two-icon3.svg",
      title: "Start product development",
      number: "03",
    },
  ];

  return (
    <section className="feature-two-area pb-140 text-white bg-black">
      <div className="container">

        {/* Title */}
        <div className="row justify-content-center">
          <div className="col-xl-7">
            <div className="text-center pt-10 mb-16">
              <h2 className="text-uppercase text-3xl">
                How We Work
              </h2>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="row">
          {steps.map((item, i) => (
            <div key={i} className="col-xl-4 col-lg-6 col-md-6">
              <div
                className="mb-6"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >

                <div className="flex items-center gap-4 mb-6">

                  <div className="relative">
                    <span className="flex items-center justify-center bg-main-600 rounded-full w-16 h-16">
                      <img src={item.icon} alt="icon" />
                    </span>

                    <span className="absolute top-0 right-0 bg-white text-main-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {item.number}
                    </span>
                  </div>

                  <h4 className="uppercase">
                    {item.title}
                  </h4>

                </div>

                <p>
                  Designers, strategists, and innovators dedicated to crafting unique digital experiences.
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
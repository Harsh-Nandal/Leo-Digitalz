"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const testimonialsData = [
  {
    id: 1,
    name: "John Smith",
    role: "Small Business Owner",
    review: "“We believe in the power of creativity and collaboration. Our team delivers impactful solutions.”",
    thumb: "assets/images/thumbs/testi-thumb1.png",
    clientImg: "assets/images/thumbs/testi-thumb1.png",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Marketing Director",
    review: "“The attention to detail and innovative approach transformed our brand identity. Highly recommended.”",
    thumb: "assets/images/thumbs/testi-thumb1.png",
    clientImg: "assets/images/thumbs/testi-thumb1.png",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Tech Founder",
    review: "“Exceptional service and professional workflow. They turned complex requirements into a seamless experience.”",
    thumb: "assets/images/thumbs/testi-thumb1.png",
    clientImg: "assets/images/thumbs/testi-thumb1.png",
  }
];

export default function Testimonials() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [_, setInit] = useState(false);

  return (
    <section className="testimonial-area pb-140 position-relative z-1 overflow-hidden" style={{ backgroundColor: "black" }}>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-xl-2 col-lg-3 col-md-5 col-sm-5">
            <span className="border border-main-600 text-main-600 tw-rounded-4xl tw-py-2 tw-px-6">
              Our Testimonials
            </span>
          </div>
          <div className="col-xl-3 col-lg-2 col-md-4 col-sm-4 text-center tw-mt-10">
            <img src="assets/images/shapes/testi-emoji.png" alt="emoji" />
          </div>
          <div className="col-xl-6 col-lg-7 col-md-10">
            <h2 className="testimonial-section-title tw-text-29 fw-semibold text-uppercase text-white">
              What Our clients say about us
            </h2>
          </div>
        </div>

        <div className="row align-items-center mt-5">
          {/* Left Side Info */}
          <div className="col-xl-3">
            <div className="testimonial-clients">
              <div className="tw-mb-20">
                <div className="d-flex align-items-center tw-mb-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="tw-w-14 tw-h-14 rounded-circle overflow-hidden border border-2 border-white ms-n3">
                      <img src={`assets/images/thumbs/testimonial-client-img${i}.png`} alt="Client" className="w-100 h-100 object-fit-cover" />
                    </div>
                  ))}
                  <div className="tw-w-14 tw-h-14 d-flex justify-content-center align-items-center rounded-circle border border-2 border-white bg-main-600 ms-n3">
                    <h2 className="testimonial-count-title fw-bold mb-0 tw-text-sm text-white">32+</h2>
                  </div>
                </div>
                <p className="tw-text-xl fw-medium text-white">
                  More then 25K clients <br /> reviews in the world-wide
                </p>
              </div>
              <div className="d-flex tw-gap-4">
                <img src="assets/images/shapes/google.png" alt="google" />
                <div>
                  <span className="tw-text-xl fw-bold text-main-600">4.0</span>
                  <p className="tw-text-sm fw-medium text-uppercase text-white">GOOGLE REVIEWS</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Slider */}
          <div className="col-xl-9 position-relative">
            <Swiper
              modules={[Navigation]}
              loop={true}
              speed={800}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              onInit={() => setInit(true)}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              className="testimonial-active"
            >
              {testimonialsData.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="testimonial-wrapper d-flex align-items-end tw-gap-17 up-bg-primary pb-4">
                    <div className="position-relative d-none d-lg-block">
                      <img src={item.thumb} alt="thumb" />
                      <div className="testimonial-reveiw position-absolute">
                        <img src="assets/images/shapes/testi-quate.png" alt="quote" />
                      </div>
                    </div>

                    <div className="flex-grow-1">
                      <div className="tw-mb-8">⭐⭐⭐⭐⭐</div>
                      <p className="tw-text-xl fw-medium text-white tw-w-435-px">
                        {item.review}
                      </p>
                      <div className="d-flex align-items-center tw-gap-4 mt-4">
                        <img src={item.clientImg} alt="client" className="rounded-circle" style={{ width: '50px', height: '50px' }} />
                        <div>
                          <h4 className="text-white mb-0">{item.name}</h4>
                          <p className="text-white-50 mb-0">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* ✅ MOVED BUTTONS OUTSIDE THE LOOP BUT INSIDE SWIPER */}
              <div className="testimonial-arrow d-flex tw-gap-3 position-absolute" style={{ bottom: "20px", right: "20px", zIndex: 10 }}>
                <button 
                  ref={prevRef} 
                  className="slider-prev btn border border-white text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                >
                  ←
                </button>
                <button 
                  ref={nextRef} 
                  className="slider-next btn border border-white text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                >
                  →
                </button>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
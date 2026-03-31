"use client";

import React from "react";
import { useState } from "react";
import { FiArrowRight, FiPhoneCall, FiMapPin, FiMail } from "react-icons/fi";

export default function Contact({
  heading = "Contact Us For Your services",
  bgColor = "#ff6a00",
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    message: "",
  });

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccess("");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("✅ Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          department: "",
          message: "",
        });
      } else {
        setSuccess("❌ Something went wrong");
      }
    } catch (err) {
      setSuccess("❌ Server error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section
      className="contact-area bg-main-600 position-relative z-1"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container">
        <div className="row justify-content-between tw-mb-10">
          <div className="col-xl-9 col-lg-9">
            <div className="position-relative z-2 tw-mb-2">
              <h2 className="testimonial-section-title tw-text-29 fw-semibold text-uppercase tw-char-animation text-black">
                {heading}
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
          <div className="col-xl-5 col-lg-6">
            <div
              className="contact-left"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="contact-left-item d-flex tw-gap-6 tw-mb-11">
                <div>
                  <span className="tw-w-18 tw-h-18 lh-1 d-inline-flex align-items-center justify-content-center bg-black  text-heading rounded-circle tw-text-9 text-main-600 ">
                    <FiPhoneCall style={{color:"#ff6a00"}} />
                  </span>
                </div>
                <div>
                  <span className="fw-medium d-block text-black">
                    Call Us 7/24
                  </span>
                  <a
                    className="font-heading fw-medium tw-text-9 d-block text-black "
                    href="tel:2085550112"
                  >
                    +208-555-0112
                  </a>
                </div>
              </div>

              <div className="contact-left-item d-flex tw-gap-6 tw-mb-11">
                <div>
                  <span className="tw-w-18 tw-h-18 lh-1 d-inline-flex align-items-center justify-content-center bg-black  text-heading rounded-circle tw-text-9 text-main-600">
                   <FiMapPin style={{color:'ff6a00'}}   />
                  </span>
                </div>
                <div>
                  <span className="fw-medium d-block text-black">Location</span>
                  <p className="font-heading fw-medium tw-text-9 d-block text-black">
                    Elgin Ltd, 31 Ashcombe, London NW5 1QU, U
                  </p>
                </div>
              </div>

              <div className="contact-left-item d-flex tw-gap-6 tw-mb-11">
                <div>
                  <span className="bg-black  tw-w-18 tw-h-18 lh-1 d-inline-flex align-items-center justify-content-center  text-heading rounded-circle tw-text-9 text-main-600">
                    <FiMail style={{color:'ff6a00'}}  />
                  </span>
                </div>
                <div>
                  <span className="fw-medium d-block text-black">
                    Make a Quote
                  </span>
                  <a
                    className="font-heading fw-medium tw-text-9 d-block text-black "
                    href="mailto:yourdomain@gmail.com"
                  >
                    yourdomain@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-xl-7 col-lg-6">
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-6">
                    <div className="position-relative tw-mb-4">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="focus-outline-0 bg-white tw-py-3 tw-ps-5 tw-pe-15 w-100 border border-neutral-200 tw-rounded-md focus-border-main-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-xl-6">
                    <div className="position-relative tw-mb-4">
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="focus-outline-0 bg-white tw-py-3 tw-ps-5 tw-pe-15 w-100 border border-neutral-200 tw-rounded-md focus-border-main-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-xl-6">
                    <div className="position-relative tw-mb-4">
                      <input
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="focus-outline-0 bg-white tw-py-3 tw-ps-5 tw-pe-15 w-100 border border-neutral-200 tw-rounded-md focus-border-main-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-xl-6">
                    <div className="position-relative tw-mb-4">
                      <input
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={formData.department}
                        onChange={handleChange}
                        className="focus-outline-0 bg-white tw-py-3 tw-ps-5 tw-pe-15 w-100 border border-neutral-200 tw-rounded-md focus-border-main-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-xl-12">
                    <div className="position-relative tw-mb-4">
                      <textarea
                        placeholder="Enter Your Message here"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="focus-outline-0 bg-white tw-py-4 tw-ps-4 w-100 border border-neutral-200 tw-rounded-md focus-border-main-600 tw-h-184-px"
                      />
                    </div>
                  </div>

                  {/* BUTTON */}
                  <div className="col-xl-12">
                    <div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="theme-btn-main d-inline-flex align-items-center position-relative tw-transition-all"
                        style={{ opacity: loading ? 0.7 : 1 }}
                      >
                        <span className="text-white bg-black theme-btn-arrow-left tw-w-14 tw-h-14 d-inline-flex justify-content-center align-items-center bg-main-600 text-heading rounded-circle position-absolute">
                          <FiArrowRight />
                        </span>

                        <span className="theme-btn bg-black text-heading tw-py-4 tw-px-10 fw-medium d-inline-flex align-items-center text-white text-capitalize tw-rounded-4xl z-2">
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Sending...
                            </>
                          ) : (
                            "Send Your Message"
                          )}
                        </span>

                        <span className="text-white bg-black theme-btn-arrow-right tw-w-14 tw-h-14 d-inline-flex justify-content-center align-items-center bg-main-600 text-heading rounded-circle">
                          <FiArrowRight />
                        </span>
                      </button>
                      {success && <p className="mt-3 text-black">{success}</p>}
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

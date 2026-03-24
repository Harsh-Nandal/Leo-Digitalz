"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function OffCanvas() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmail("");
        setStatus("✅ Successfully subscribed!");
      } else {
        setStatus("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("❌ Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearStatus = () => {
    if (status) {
      setTimeout(() => setStatus(""), 5000);
    }
  };

  useEffect(() => {
    clearStatus();
  }, [status]);

  return (
    <>
      {/* LOGO */}
      <div className="offcanvas__logo mb-4 pb-4 border-bottom">
        <Link href="/" className="d-block">
          <Image
            src="/assets/images/logo/main_logo_header.png"
            alt="LeoDigitalz Logo"
            width={150}
            height={50}
            priority
            className="img-fluid"
          />
        </Link>
      </div>

      {/* TITLE */}
      <div className="offcanvas__title mb-5">
        <p className="lead text-white mb-0 lh-lg">
          LeoDigitalz is the partner of choice for many of the world&apos;s leading
          enterprises. We help businesses development.
        </p>
      </div>

      {/* CONTACT */}
      <div className="offcanvas__contact mb-5">
        <h3 className="h4 fw-bold text-white mb-4 lh-sm">Contact Us</h3>
        <ul className="list-unstyled">
          <li className="d-flex align-items-start mb-4">
            <i className="ph ph-map-pin text-primary fs-4 me-3 mt-1 flex-shrink-0"></i>
            <p className="text-white mb-0 lh-lg">Manchester 21, Zurich, CH</p>
          </li>
          <li className="d-flex align-items-start mb-4">
            <i className="ph ph-envelope text-primary fs-4 me-3 mt-1 flex-shrink-0"></i>
            <a 
              href="mailto:LeoDigitalzinfo@mail.com" 
              className="text-white text-decoration-none hover-primary transition-all"
              aria-label="Email LeoDigitalz"
            >
              LeoDigitalzinfo@mail.com
            </a>
          </li>
          <li className="d-flex align-items-start">
            <i className="ph ph-phone-outgoing text-primary fs-4 me-3 mt-1 flex-shrink-0"></i>
            <a 
              href="tel:+48555223224" 
              className="text-white text-decoration-none hover-primary transition-all"
              aria-label="Call LeoDigitalz"
            >
              (+00) 678 345 98568
            </a>
          </li>
        </ul>
      </div>

      {/* NEWSLETTER */}
      <div className="offcanvas__newsletter mb-5">
        <h3 className="h4 fw-bold text-white mb-4 lh-sm">Get Updates</h3>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <div className="input-group input-group-lg">
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-control border-0 shadow-none rounded-0 pe-5 bg-white/10 text-black placeholder-white/70 focus-white"
              disabled={isSubmitting}
              required
              aria-label="Email address"
            />
            <button 
              type="submit" 
              className="btn btn-primary px-4 rounded-end"
              disabled={isSubmitting || !email.includes("@")}
            >
              {isSubmitting ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : (
                <i className="ph ph-paper-plane-tilt"></i>
              )}
              <span className="visually-hidden">Subscribe</span>
            </button>
          </div>
          {status && (
            <div className={`mt-3 p-3 rounded-3 ${status.includes('✅') ? 'bg-success bg-opacity-25 text-success border border-success' : 'bg-danger bg-opacity-25 text-danger border border-danger'}`}>
              {status}
            </div>
          )}
        </form>
      </div>

      {/* SOCIAL */}
      <div className="offcanvas__social">
        <ul className="list-unstyled d-flex gap-3 mb-0">
          {[
            { href: "https://facebook.com", icon: "ph-facebook-logo", label: "Facebook" },
            { href: "https://twitter.com", icon: "ph-twitter-logo", label: "Twitter" },
            { href: "https://instagram.com", icon: "ph-instagram-logo", label: "Instagram" },
            { href: "https://pinterest.com", icon: "ph-pinterest-logo", label: "Pinterest" }
          ].map(({ href, icon, label }) => (
            <li key={label}>
              <a 
                href={href} 
                className="text-black hover-primary fs-4 p-3 rounded-3 d-block transition-all hover-scale"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${label}`}
              >
                <i className={`ph-bold ${icon}`}></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
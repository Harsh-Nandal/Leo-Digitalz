"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import OffCanvas from "./OffCanvas";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCanvas, setOpenCanvas] = useState(false);
  const [openSearch, setOpenSearch] = useState(false); // ✅ NEW
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`header fixed-top transition-all duration-500 ${
          scrolled
            ? "bg-black shadow-lg py-2 backdrop-blur-md"
            : "header-transparent py-4"
        }`}
        style={{ zIndex: 999 }}
      >
        <div className="container tw-container-1624-px">
          <nav className="d-flex align-items-center justify-content-between">
            {/* LOGO */}
            <div data-aos="fade-down">
              <Link href="/" className="text-decoration-none">
                <Image
                  src="/assets/images/logo/main_logo_header.png"
                  alt="Logo"
                  width={160}
                  height={50}
                />
              </Link>
            </div>
            
            <div className="header-menu d-none d-lg-block">
              <ul className="nav-menu d-flex align-items-center tw-gap-8 mb-0 list-unstyled">
                {menuItems.map((item, i) => {
                  const isActive = pathname === item.path;

                  return (
                    <li
                      key={item.path}
                      data-aos="fade-down"
                      data-aos-delay={i * 100}
                      className="position-relative overflow-hidden"
                    >
                      <Link
                        href={item.path}
                        className={`fw-medium text-decoration-none tw-transition-3 position-relative tw-pb-1 d-inline-block
                  ${isActive ? "text-main-600" : "text-white hover-text-main-600"}
                `}
                        style={{ fontSize: "16px", letterSpacing: "0.5px" }}
                      >
                        {item.name}

                        {/* Animated Underline */}
                        <span
                          className={`position-absolute start-0 bottom-0 tw-h-0.5 bg-main-600 tw-transition-3 
                    ${isActive ? "w-100" : "w-0"}
                  `}
                          style={{
                            transition: "width 0.3s ease-in-out",
                            // This creates the "slide in" effect on hover for non-active links
                            left: isActive ? "0" : "auto",
                            right: isActive ? "auto" : "0",
                          }}
                        />
                      </Link>

                      {/* Hover Effect CSS Logic (Alternative to Tailwind/Bootstrap) */}
                      <style jsx>{`
                        a:hover span {
                          width: 100% !important;
                          left: 0 !important;
                        }
                      `}</style>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* RIGHT */}
            <div className=" header-right d-flex align-items-center tw-gap-3">
              {/* ✅ SEARCH BUTTON */}
              <button
                type="button"
                onClick={() => setOpenSearch(true)}
                className=" tw-w-10 tw-h-10 d-flex justify-content-center align-items-center rounded-circle bg-neutral-800 text-white border-0 hover-bg-main-600"
                style={{
                  transition: "all 0.3s ease-in-out",
                  cursor: "pointer",
                }}
                aria-label="Open Search"
              >
                <span className="d-flex justify-content-center align-items-center">
                  {/* SVG Magnifying Glass for better resolution and consistency */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 21L16.65 16.65"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              {/* BUTTON */}
              <Link
                href="/contact"
                className="d-none d-lg-inline-flex border border-main-600 tw-rounded-3xl tw-px-6 tw-py-2 fw-medium text-decoration-none"
                style={{
                  color: "#ff6b00",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ff6b00";
                  e.currentTarget.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#ff6b00";
                }}
              >
                Get Started
              </Link>

              {/* DESKTOP OFFCANVAS */}
              <button
                onClick={() => setOpenCanvas(true)}
                className="d-none d-lg-block text-white tw-text-2xl border-0 bg-transparent"
              >
                ☰
              </button>

              {/* MOBILE MENU */}
              <button
                onClick={() => setOpenMenu(true)}
                className="d-lg-none text-white tw-text-2xl border-0 bg-transparent"
              >
                ☰
              </button>
            </div>
          </nav>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`position-fixed top-0 start-0 w-100 h-100 bg-black text-white tw-p-6 transition-transform duration-300 ${
            openMenu ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ zIndex: 1000 }}
        >
          <button onClick={() => setOpenMenu(false)}>✕</button>
          <MobileMenu />
        </div>
      </header>

      {/* ✅ SEARCH POPUP */}
      <div
        className={`search_popup position-fixed top-0 start-0 w-100 h-100 ${
          openSearch ? "search-opened" : ""
        }`}
        style={{
          opacity: openSearch ? 1 : 0,
          visibility: openSearch ? "visible" : "hidden",
          transition: "all 0.4s ease-in-out",
          zIndex: 2000,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="search_wrapper">
                <div className="search_top d-flex justify-content-between align-items-center">
                  <div className="search_logo">
                    <Link href="/">
                      <img
                        src="/assets/images/logo/main_logo_header.png"
                        alt="Logo"
                      />
                    </Link>
                  </div>
                  <div className="search_close">
                    <button
                      type="button"
                      className="search_close_btn"
                      onClick={() => setOpenSearch(false)}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 1L1 17"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1 1L17 17"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="search_form">
                  <form action="#">
                    <div className="search_input">
                      <input
                        className="search-input-field"
                        type="text"
                        placeholder="Type here to search..."
                        autoFocus={openSearch}
                      />
                      <span className="search-focus-border"></span>
                      <button type="submit">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.55 18.1C14.272 18.1 18.1 14.272 18.1 9.55C18.1 4.82797 14.272 1 9.55 1C4.82797 1 1 4.82797 1 9.55C1 14.272 4.82797 18.1 9.55 18.1Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.0002 19.0002L17.2002 17.2002"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Overlay - Clicking this also closes the search */}
        <div
          className="search-popup-overlay"
          onClick={() => setOpenSearch(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.9)",
            zIndex: -1,
          }}
        ></div>
      </div>

      {/* DESKTOP OFFCANVAS */}
      <div
        className={`position-fixed top-0 end-0 h-100 bg-black transition-transform duration-500   tw-p-13 ${
          openCanvas ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "350px", zIndex: 1001 }}
      >
        <button
          onClick={() => setOpenCanvas(false)}
          className="text-white position-absolute top-0 end-0 m-3"
        >
          ✕
        </button>

        <OffCanvas />
      </div>

      {/* OVERLAY */}
      {(openCanvas || openMenu) && (
        <div
          onClick={() => {
            setOpenCanvas(false);
            setOpenMenu(false);
          }}
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
          style={{ opacity: 0.5, zIndex: 999 }}
        />
      )}
    </>
  );
}

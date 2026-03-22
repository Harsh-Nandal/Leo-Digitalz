"use client";

import Link from "next/link";

export default function MobileMenu() {
  return (
    <div className="mobile-menu d-lg-none d-block scroll-sm position-fixed bg-black tw-w-300-px tw-h-screen overflow-y-auto tw-p-6 z-[999] tw-pb-68 transition-transform duration-300">

      <div className="mobile-menu__inner">

        {/* LOGO */}
        <Link href="/" className="mobile-menu__logo">
          <img
            src="/assets/images/logo/main_logo_header.png"
            alt="Logo"
          />
        </Link>

        {/* MENU */}
        <div className="mobile-menu__menu">
          <ul className="nav-menu nav-menu--mobile d-block tw-mt-8 ">

            <li className="nav-menu__item">
              <Link href="/" className="nav-menu__link text-white tw-py-3 fw-medium w-100 d-block text-decoration-none">
                Home
              </Link>
            </li>

            <li className="nav-menu__item">
              <Link href="/about" className="nav-menu__link text-white tw-py-3 fw-medium w-100 d-block text-decoration-none">
                About
              </Link>
            </li>

            <li className="nav-menu__item">
              <Link href="/services" className="nav-menu__link text-white tw-py-3 fw-medium w-100 d-block text-decoration-none">
                Services
              </Link>
            </li>

            <li className="nav-menu__item">
              <Link href="/portfolio" className="nav-menu__link text-white tw-py-3 fw-medium w-100 d-block text-decoration-none">
                Portfolio
              </Link>
            </li>

            <li className="nav-menu__item">
              <Link href="/blog" className="nav-menu__link text-white tw-py-3 fw-medium w-100 d-block text-decoration-none">
                Blog
              </Link>
            </li>

            <li className="nav-menu__item">
              <Link href="/contact" className="nav-menu__link text-white tw-py-3 fw-medium w-100 d-block text-decoration-none">
                Contact
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}
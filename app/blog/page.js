"use client";

import Footer from "@/public/components/layout/Footer";
import Header from "@/public/components/layout/Header";
import Breadcrumbs from "@/public/components/services/Breadcrumbs";
import Link from "next/link";
import React from "react";
import { PiCalendar, PiArrowRight } from "react-icons/pi";

const blogData = [
  {
    id: 1,
    title: "What Makes a Great Landing Page? A Designer’s Guide",
    date: "09 May, 2025",
    category: "Business",
    thumb1: "/assets/images/thumbs/blog-thumb5.jpg",
    thumb2: "/assets/images/thumbs/blog-thumb1.jpg",
    delay: "200",
  },
  {
    id: 2,
    title: "From Sketch to Screen: My Web Design Workflow Explained",
    date: "09 May, 2025",
    category: "Business",
    thumb1: "/assets/images/thumbs/blog-thumb6.jpg",
    thumb2: "/assets/images/thumbs/blog-thumb2.jpg",
    delay: "300",
  },
  {
    id: 3,
    title: "How to Choose the Right Color Palette for Your Website",
    date: "09 May, 2025",
    category: "Business",
    thumb1: "/assets/images/thumbs/blog-thumb7.jpg",
    thumb2: "/assets/images/thumbs/blog-thumb3.jpg",
    delay: "400",
  },
  {
    id: 4,
    title: "Creative Campaigns That Captured the World’s Attention",
    date: "09 May, 2025",
    category: "Business",
    thumb1: "/assets/images/thumbs/blog-thumb8.jpg",
    thumb2: "/assets/images/thumbs/blog-thumb4.jpg",
    delay: "200",
  },
  {
    id: 5,
    title: "Design Trends Every Brand Should Know This Year for Your Comapny",
    date: "09 May, 2025",
    category: "Business",
    thumb1: "/assets/images/thumbs/blog-thumb9.jpg",
    thumb2: "/assets/images/thumbs/blog-thumb5.jpg",
    delay: "300",
  },
  {
    id: 6,
    title: "From Concept to Launch: Our Design Workflow Explained",
    date: "09 May, 2025",
    category: "Business",
    thumb1: "/assets/images/thumbs/blog-thumb4.jpg",
    thumb2: "/assets/images/thumbs/blog-thumb6.jpg",
    delay: "400",
  },
  {
    id: 7,
    title: "Why Every Brand Needs a Strong Digital Presence in Today’s Market",
    date: "09 May, 2025",
    category: "Business",
    thumb1: "/assets/images/thumbs/blog-thumb3.jpg",
    thumb2: "/assets/images/thumbs/blog-thumb7.jpg",
    delay: "200",
  },
  {
    id: 8,
    title:
      "How to Build a Memorable Brand Through Consistent Visual Identity Design",
    date: "09 May, 2025",
    category: "Business",
    thumb1: "/assets/images/thumbs/blog-thumb2.jpg",
    thumb2: "/assets/images/thumbs/blog-thumb8.jpg",
    delay: "300",
  },
  {
    id: 9,
    title: "Boosting Engagement with Micro-Animations in Web Design",
    date: "09 May, 2025",
    category: "Business",
    thumb1: "/assets/images/thumbs/blog-thumb1.jpg",
    thumb2: "/assets/images/thumbs/blog-thumb9.jpg",
    delay: "400",
  },
];

export default function Page() {
  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "Our Blog & News", link: "/blog" }]} />

      <section className="blog-ip-area py-140 text-white" style={{backgroundColor:'black'}}>
        <div className="container">
          <div className="row">
            {blogData.map((blog) => (
              <div className="col-xl-4 col-lg-6 col-md-6" key={blog.id}>
                <div
                  className="blog-wrapper position-relative z-1 overflow-hidden tw-mb-8"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={blog.delay}
                >
                  <div className="blog-main-thumb position-relative overflow-hidden tw-rounded-xl tw-mb-9">
                    <img
                      className="w-img w-100 tw-rounded-xl tw-transition-5"
                      src={blog.thumb1}
                      alt="blog"
                    />
                    <img
                      className="w-img w-100 tw-rounded-xl tw-transition-5"
                      src={blog.thumb2}
                      alt="blog"
                    />
                    <Link
                      className="blog-card-image-link d-flex align-items-center justify-content-center w-100 h-100 position-absolute z-1 top-0 start-0"
                      href={`/blog/${blog.id}`}
                    />
                  </div>

                  <div className="blog-meta d-flex align-items-center tw-mb-6">
                    <Link
                      className="text-white fw-medium d-inline-flex align-items-center tw-gap-2 tw-me-3"
                      href="#"
                    >
                      <span className="text-main-600 d-inline-block lh-1">
                        <PiCalendar />
                      </span>
                      {blog.date}
                    </Link>
                    <span className="tw-w-3 border border-white d-inline-block lh-1"></span>
                    <Link className="tw-ms-3 text-main-600 fw-medium" href="#">
                      {blog.category}
                    </Link>
                  </div>

                  <div className="tw-me-10">
                    <h4 className="tw-text-9 fw-medium hover-text-main-600">
                      <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Section */}
          <div className="row">
            <div className="col-xl-12">
              <div
                className="pagination justify-content-center widget-pagination tw-mt-10"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <Link className="page-link" href="#">
                        01
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#">
                        02
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link rounded-0" href="#">
                        <PiArrowRight />
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

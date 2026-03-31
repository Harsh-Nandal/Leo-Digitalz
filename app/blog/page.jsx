"use client";

import Footer from "@/public/components/layout/Footer";
import Header from "@/public/components/layout/Header";
import Breadcrumbs from "@/public/components/services/Breadcrumbs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PiCalendar, PiArrowRight } from "react-icons/pi";

export default function Page() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ✅ FETCH BLOGS
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog", {
          cache: "no-store",
        });

        const data = await res.json();
        setBlogs(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "Our Blog & News", link: "/blog" }]} />

      <section
        className="blog-ip-area py-140 text-white"
        style={{ backgroundColor: "black" }}
      >
        <div className="container">
          <div className="row">
            {loading ? (
              <div className="text-center py-5">Loading blogs...</div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-5">No blogs found 🚫</div>
            ) : (
              blogs.map((blog, index) => {
                // ✅ STRICT SCHEMA LOGIC
                const mainImage = blog.coverImage || "/placeholder.jpg";

                const hoverImage = blog.images?.[0] || blog.coverImage;

                return (
                  <div className="col-xl-4 col-lg-6 col-md-6" key={blog._id}>
                    <div
                      className="blog-wrapper position-relative z-1 overflow-hidden tw-mb-8"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay={200 + index * 100}
                    >
                      {/* IMAGE */}
                      <div className="blog-main-thumb position-relative overflow-hidden tw-rounded-xl tw-mb-9">
                        {/* MAIN IMAGE */}
                        <img
                          className="w-img w-100 tw-rounded-xl tw-transition-5 blog-img-main"
                          src={blog.images?.[0]}
                          alt={blog.title}
                        />

                        {/* HOVER IMAGE */}
                        {blog.images?.[1] && (
                          <img
                            className="w-img w-auto tw-rounded-xl tw-transition-5 blog-img-hover position-absolute top-0 start-0"
                            src={blog.images[1]}
                            alt="hover"
                          />
                        )}

                        {/* LINK OVERLAY */}
                        <Link
                          className="blog-card-image-link d-flex align-items-center justify-content-center w-100 h-100 position-absolute z-1 top-0 start-0"
                          href={`/blog/${blog.slug}`}
                        />
                      </div>

                      {/* META */}
                      <div className="blog-meta d-flex align-items-center tw-mb-6">
                        <span className="text-white fw-medium d-inline-flex align-items-center tw-gap-2 tw-me-3">
                          <span className="text-main-600 d-inline-block lh-1">
                            <PiCalendar />
                          </span>
                          {formatDate(blog.date)}
                        </span>

                        <span className="tw-w-3 border border-white d-inline-block lh-1"></span>

                        <span className="tw-ms-3 text-main-600 fw-medium">
                          {blog.category}
                        </span>
                      </div>

                      {/* TITLE */}
                      <div className="tw-me-10">
                        <h4 className="tw-text-9 fw-medium hover-text-main-600">
                          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* PAGINATION */}
          <div className="row">
            <div className="col-xl-12">
              <div className="pagination justify-content-center widget-pagination tw-mt-10">
                <nav>
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

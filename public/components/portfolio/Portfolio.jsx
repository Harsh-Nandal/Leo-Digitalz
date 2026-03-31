"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH FROM API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/portfolio");
        const data = await res.json();

        if (data.success) {
          setPortfolios(data.data);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section
      className="portfolio-ip-area py-140"
      style={{ backgroundColor: "black" }}
    >
      <div className="container">
        <div className="row">

          {/* ✅ LOADING */}
          {loading && (
            <div className="text-center text-white py-5">
              Loading portfolio...
            </div>
          )}

          {/* ✅ DATA */}
          {!loading &&
            portfolios.map((p, index) => (
              <div className="col-xl-6 col-lg-6" key={p._id}>
                <div
                  className="portfolio-three-wrapper portfolio-ip-wrapper tw-mb-13"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={200 + index * 100}
                >
                  {/* IMAGE */}
                  <div
                    className="portfolio-three-thumb portfolio-ip-thumb tw-p-5 tw-rounded-xl not-hide-cursor tw-mb-8"
                    data-cursor="View <br> Demo"
                  >
                    <Link
                      className="cursor-hide"
                      href={`/portfolio/${p.slug}`} // ✅ SLUG LINK
                    >
                      <img
                        className="tw-rounded-xl "
                        src={
                          p.coverImage ||
                          "/assets/images/thumbs/portfolio-three-thumb1.jpg"
                        }
                        alt={p.title}
                      />
                    </Link>
                  </div>

                  {/* CATEGORY */}
                  <div className="d-flex tw-gap-4 tw-mb-6">
                    {p.details?.category && (
                      <span>
                        <Link
                          className="border border-main-600 text-main-600 fw-medium tw-rounded-4xl tw-py-2 tw-px-7 hover-bg-main-600 hover-text-white"
                          href="#"
                        >
                          {p.details.category}
                        </Link>
                      </span>
                      
                    )}
                    {p.details?.category && (
                      <span>
                        <Link
                          className="border border-main-600 text-main-600 fw-medium tw-rounded-4xl tw-py-2 tw-px-7 hover-bg-main-600 hover-text-white"
                          href="#"
                        >
                          Marketing
                        </Link>
                      </span>
                      
                    )}
                  </div>

                  {/* TITLE */}
                  <div>
                    <h4 className="tw-text-14 text-white">
                      <Link
                        className="hover-text-main-600"
                        href={`/portfolio/${p.slug}`} // ✅ SLUG LINK
                      >
                        {p.title}
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            ))}

          {/* ❌ NO DATA */}
          {!loading && portfolios.length === 0 && (
            <div className="text-center text-muted py-5">
              No portfolio found
            </div>
          )}
        </div>

        {/* PAGINATION (STATIC FOR NOW) */}
        <div className="row">
          <div className="col-xl-12">
            <div className="pagination justify-content-center widget-pagination tw-mt-5">
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
                    <HiArrowRight />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
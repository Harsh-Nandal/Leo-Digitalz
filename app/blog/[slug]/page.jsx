"use client";

import Footer from "@/public/components/layout/Footer";
import Header from "@/public/components/layout/Header";
import Breadcrumbs from "@/public/components/services/Breadcrumbs";
import { PiArrowRight } from "react-icons/pi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogDetails() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  // ✅ ALL HOOKS AT TOP
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [newloading, setNewLoading] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ✅ FETCH BLOG
  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/blog/slug/${encodeURIComponent(slug)}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || !data?.data) {
          throw new Error(data?.message || "Blog not found");
        }

        setBlog(data.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // ✅ FORM HANDLER
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setNewLoading(true);

      const res = await fetch(`/api/blog/comment/${blog._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      alert("Comment added ✅");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed ❌");
    } finally {
      setNewLoading(false);
    }
  };

  // ✅ UI STATES
  if (loading) {
    return <div className="text-center p-5 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger text-center p-5">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center p-5">No blog found</div>;
  }

  const mainImage = blog.coverImage || blog.images?.[0] || "/placeholder.jpg";

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: blog.title, link: "/blog" }]} />

      <section className="blog-details-area py-140 text-white bg-black">
        {/* IMAGE */}
        <div className="container-fluid">
          <div className="text-center tw-mb-10">
            <img className="tw-rounded-xl" src={mainImage} alt="blog" />
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="blog-details-wrapper">
                {/* META */}
                <div className="blog-meta d-flex align-items-center justify-content-center tw-mb-6">
                  <span>📅 {formatDate(blog.date)}</span>
                  <span className="tw-w-3 border border-white mx-2"></span>
                  <span className="text-main-600">{blog.category}</span>
                </div>

                {/* TITLE */}
                <h2 className="text-center mb-4">{blog.title}</h2>

                {/* CONTENT */}
                {blog.content?.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}

                {/* QUOTE */}
                {blog.quote?.text && (
                  <blockquote>
                    {blog.quote.text} — {blog.quote.author}
                  </blockquote>
                )}

                {/* IMAGES */}
                <div className="row">
                  {blog.images?.map((img, i) => (
                    <div key={i} className="col-md-6 mb-3">
                      <img className="w-100" src={img} alt="blog" />
                    </div>
                  ))}
                </div>

                {/* FORM */}

                <form onSubmit={handleSubmit}>
                  <div class="row">
                    <div class="col-xl-6">
                      <div
                        class="position-relative tw-mb-4"
                        style={{
                          backgroundColor: "gray",
                          borderRadius: "10px",
                        }}
                      >
                        <input
                          type="text"
                          class="focus-outline-0 tw-py-3 text-white tw-placeholder-text-white tw-ps-5 tw-pe-15 w-100 tw-rounded-md focus-border-main-600"
                          placeholder="Name"
                          required
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div class="col-xl-6">
                      <div
                        class="position-relative tw-mb-4"
                        style={{
                          backgroundColor: "gray",
                          borderRadius: "10px",
                        }}
                      >
                        <input
                          type="email"
                          class="focus-outline-0 tw-py-3 text-white tw-placeholder-text-white tw-ps-5 tw-pe-15 w-100 tw-rounded-md focus-border-main-600"
                          placeholder="Email"
                          required
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div class="col-xl-12">
                      <div
                        class="position-relative tw-mb-4"
                        style={{
                          backgroundColor: "gray",
                          borderRadius: "10px",
                        }}
                      >
                        <textarea
                          class="focus-outline-0 text-white tw-placeholder-text-white tw-py-4 tw-ps-4 w-100 tw-rounded-md focus-border-main-600 tw-h-184-px"
                          placeholder="Enter Your Message here"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-xl-12">
                      <div>
                        <button class="theme-btn-main d-inline-flex align-items-center position-relative tw-transition-all">
                          <span class="theme-btn-arrow-left tw-w-14 tw-h-14 lh-1 d-inline-flex justify-content-center align-items-center bg-main-600 text-heading rounded-circle position-absolute tw-transition-3">
                            <PiArrowRight/>
                          </span>
                          <span class="theme-btn bg-main-600 text-heading tw-py-4 tw-px-10 fw-medium d-inline-flex align-items-center tw-gap-8 text-capitalize tw-rounded-4xl tw-transition-3 z-2">
                            Send Your Message
                          </span>
                          <span class="theme-btn-arrow-right tw-w-14 tw-h-14 lh-1 d-inline-flex justify-content-center align-items-center bg-main-600 text-heading rounded-circle tw-transition-3">
                            <PiArrowRight/>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

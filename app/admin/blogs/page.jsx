"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PiPlus,
  PiTrash,
  PiPencilSimple,
  PiCalendar,
  PiChatCircle,
  PiTag,
} from "react-icons/pi";

export default function BlogsPage() {
  const router = useRouter();
  const [preview, setPreview] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false); // ✅ NEW

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const [form, setForm] = useState({
    title: "",
    date: "",
    category: "",
    coverImage: null,
    content: [""],
    quoteText: "",
    quoteAuthor: "",
    images: [null, null],
  });

  const fetchBlogs = async () => {
    try {
      setPageLoading(true); // ✅ start loading

      const res = await fetch("/api/blog", {
        cache: "no-store", // or "force-cache"
      });

      const data = await res.json();

      setBlogs(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false); // ✅ stop loading
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setPageLoading(true);

        const res = await fetch("/api/blog", {
          signal: controller.signal,
        });

        const data = await res.json();
        setBlogs(data.data || []);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  const handleChange = (e, index, field) => {
    const { name, value, files } = e.target;
    if (name === "coverImage" && files[0]) {
      setPreview(URL.createObjectURL(files[0]));
    }

    // FILE HANDLING
    if (files) {
      if (field === "images") {
        const updated = [...form.images];
        updated[index] = files[0];
        setForm((prev) => {
          const updated = [...prev.images];
          updated[index] = files[0];
          return { ...prev, images: updated };
        });
      } else {
        setForm((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      }
    } else {
      // CONTENT ARRAY
      if (field === "content") {
        setForm((prev) => {
          const updated = [...prev.content];
          updated[index] = value;
          return { ...prev, content: updated };
        });
      } else {
        setForm({ ...form, [name]: value });
      }
    }
  };

  const addParagraph = () => {
    setForm((prev) => ({
      ...prev,
      content: [...prev.content, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("date", form.date);
      formData.append("category", form.category);

      if (form.coverImage) {
        formData.append("coverImage", form.coverImage);
      }

      // CONTENT ARRAY
      form.content.forEach((para, i) => {
        formData.append(`content[${i}]`, para);
      });

      // QUOTE
      formData.append("quoteText", form.quoteText);
      formData.append("quoteAuthor", form.quoteAuthor);

      // IMAGES
      form.images.forEach((img, i) => {
        if (img) {
          formData.append(`images`, img);
        }
      });

      const res = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      // RESET
      setForm({
        title: "",
        date: "",
        category: "",
        coverImage: null,
        content: [""],
        quoteText: "",
        quoteAuthor: "",
        images: [null, null],
      });

      setShowForm(false);
      setBlogs((prev) => [data.data, ...prev]);
    } catch (error) {
      console.error(error);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    await fetch(`/api/blog/${deleteId}`, { method: "DELETE" });
    setShowPopup(false);
    setBlogs((prev) => prev.filter((blog) => blog._id !== deleteId));
  };

  const BlogRow = ({ blog, router, setDeleteId, setShowPopup }) => (
    <tr>
      <td>
        <div className="fw-bold">{blog.title}</div>
        <small className="text-muted d-flex align-items-center gap-1">
          <PiCalendar /> {blog.date}
        </small>
      </td>

      <td>
        <span
          style={{
            background: "rgba(255,106,0,0.1)",
            padding: "6px 12px",
            borderRadius: "20px",
            color: "#ff6a00",
            fontSize: "12px",
          }}
        >
          {blog.category}
        </span>
      </td>

      <td className="text-end">
        {/* EDIT */}
        <button
          onClick={() => router.push(`/admin/blogs/${blog._id}`)}
          className="btn btn-sm btn-outline-light me-2"
        >
          <PiPencilSimple />
        </button>

        {/* COMMENTS */}
        <button
          onClick={() => router.push(`/admin/blogs/comments/${blog._id}`)}
          className="btn btn-sm btn-outline-info me-2"
          title="View Comments"
        >
          <PiChatCircle />
          <span style={{ fontSize: "12px" }}>{blog.comments?.length || 0}</span>
        </button>

        {/* DELETE */}
        <button
          onClick={() => {
            setDeleteId(blog._id);
            setShowPopup(true);
          }}
          className="btn btn-sm btn-outline-danger"
        >
          <PiTrash />
        </button>
      </td>
    </tr>
  );

  return (
    <div
      className="tw-min-h-screen tw-p-8"
      style={{ background: "#0d0d0d", color: "#fff" }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center tw-mb-10">
        <div>
          <h2 className="fw-bold" style={{ fontSize: "28px" }}>
            📄 Blog Management
          </h2>
          <p className="text-white">
            Manage all your articles ({blogs.length} total)
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          style={{
            background: "linear-gradient(90deg,#ff6a00,#ff8c42)",
            padding: "12px 22px",
            borderRadius: "10px",
            border: "none",
            color: "#fff",
            fontWeight: "600",
            boxShadow: "0 0 15px rgba(255,106,0,0.4)",
          }}
          className="d-flex align-items-center gap-2"
        >
          <PiPlus /> Add Blog
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div
          className="tw-mb-10"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "16px",
            padding: "25px",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h4 className="mb-4 fw-bold">📝 Add New Blog</h4>

            <div className="row g-4">
              {/* TITLE */}
              <div className="col-md-6">
                <label className="form-label text-light">
                  Blog Title <span className="text-danger">*</span>
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="form-control bg-dark text-white border-0 p-3"
                  placeholder="Enter blog title"
                  required
                />
              </div>

              {/* 🔥 SLUG PREVIEW (NEW) */}
              {form.title && (
                <div className="col-md-6">
                  <label className="form-label text-light">Blog URL</label>
                  <div className="form-control bg-dark text-success border-0 p-3">
                    /blog/
                    {form.title
                      .toLowerCase()
                      .trim()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)+/g, "")}
                  </div>
                </div>
              )}

              {/* DATE */}
              <div className="col-md-3">
                <label className="form-label text-light">Publish Date</label>
                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  className="form-control bg-dark text-white border-0 p-3"
                />
              </div>

              {/* CATEGORY */}
              <div className="col-md-3">
                <label className="form-label text-light">Category</label>
                <input
                  name="category"
                  onChange={handleChange}
                  className="form-control bg-dark text-white border-0 p-3"
                  placeholder="e.g. Real Estate"
                  required
                />
              </div>

              {/* COVER IMAGE */}
              <div className="col-md-12">
                <label className="form-label text-light">Cover Image *</label>
                <input
                  type="file"
                  name="coverImage"
                  onChange={handleChange}
                  className="form-control bg-dark text-white border-0 p-3"
                  required
                />
              </div>

              {/* CONTENT */}
              <div className="col-md-12">
                <label className="form-label text-light fw-semibold">
                  Blog Content
                </label>

                {form.content.map((para, index) => (
                  <textarea
                    key={index}
                    value={para}
                    onChange={(e) => handleChange(e, index, "content")}
                    className="form-control bg-dark text-white border-0 p-3 mb-2"
                    placeholder={`Paragraph ${index + 1}`}
                    rows={3}
                  />
                ))}

                <button
                  type="button"
                  onClick={addParagraph}
                  className="btn btn-sm mt-2"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                >
                  + Add Paragraph
                </button>
              </div>

              {/* QUOTE */}
              <div className="col-md-12 mt-2">
                <h6 className="text-light fw-semibold">💬 Quote Section</h6>
              </div>

              <div className="col-md-6">
                <label className="form-label text-light">Quote Text</label>
                <input
                  name="quoteText"
                  onChange={handleChange}
                  className="form-control bg-dark text-white border-0 p-3"
                  placeholder="Enter quote..."
                />
              </div>

              <div className="col-md-6">
                <label className="form-label text-light">Quote Author</label>
                <input
                  name="quoteAuthor"
                  onChange={handleChange}
                  className="form-control bg-dark text-white border-0 p-3"
                  placeholder="Author name"
                />
              </div>

              {/* IMAGES */}
              <div className="col-md-12 mt-2">
                <h6 className="text-light fw-semibold">🖼 Additional Images</h6>
              </div>

              {[0, 1].map((i) => (
                <div className="col-md-6" key={i}>
                  <label className="form-label text-light">Image {i + 1}</label>
                  <input
                    type="file"
                    onChange={(e) => handleChange(e, i, "images")}
                    className="form-control bg-dark text-white border-0 p-3"
                  />
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-4 d-flex gap-3">
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "linear-gradient(135deg, #ff6a00, #ff8c42)",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "10px",
                  color: "#fff",
                  fontWeight: "600",
                }}
              >
                {loading ? "Uploading..." : "🚀 Publish Blog"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-outline-light px-4"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLE */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <table className="table table-dark mb-0">
          <thead style={{ background: "#111" }}>
            <tr>
              <th>Article</th>
              <th>Category</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <BlogRow
                key={blog._id}
                blog={blog}
                router={router}
                setDeleteId={setDeleteId}
                setShowPopup={setShowPopup}
                style={{ transition: "0.3s", cursor: "pointer" }}
              />
            ))}
          </tbody>
        </table>

        {pageLoading ? (
          <div className="text-center p-5">
            <div className="spinner-border text-warning" />
            <p className="mt-3">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center p-5 text-muted">
            🚫 No blogs available
          </div>
        ) : null}
      </div>

      {/* DELETE MODAL */}
      {showPopup && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          <div
            style={{
              background: "#1a1a1a",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
              width: "350px",
            }}
          >
            <h4>Delete Blog?</h4>
            <p className="text-muted">This action is irreversible</p>

            <div className="d-flex gap-2 mt-3">
              <button onClick={handleDelete} className="btn btn-danger w-100">
                Delete
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="btn btn-secondary w-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

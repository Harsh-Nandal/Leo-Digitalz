"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBlog() {
  const params = useParams();
  const id = params?.id;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    date: "",
    category: "",
    coverImage: null,
    content: [""],
    quoteText: "",
    quoteAuthor: "",
    images: [],
  });

  const [preview, setPreview] = useState({
    coverImage: "",
    images: [],
  });

  // ✅ FIX DATE FORMAT
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  // ✅ FETCH BLOG
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!data.success) throw new Error(data.message);

        const blog = data.data;

        setForm({
          title: blog.title || "",
          date: formatDate(blog.date),
          category: blog.category || "",
          coverImage: null,
          content: blog.content?.length ? blog.content : [""],
          quoteText: blog.quote?.text || "",
          quoteAuthor: blog.quote?.author || "",
          images: [],
        });

        setPreview({
          coverImage: blog.coverImage || "",
          images: blog.images || [],
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load blog ❌");
      } finally {
        setPageLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // ✅ HANDLE INPUT
  const handleChange = (e, index, field) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      if (name === "coverImage") {
        setForm((prev) => ({ ...prev, coverImage: file }));
        setPreview((prev) => ({
          ...prev,
          coverImage: URL.createObjectURL(file),
        }));
      } else if (field === "images") {
        const updatedFiles = [...form.images];
        updatedFiles[index] = file;

        const updatedPreview = [...preview.images];
        updatedPreview[index] = URL.createObjectURL(file);

        setForm((prev) => ({ ...prev, images: updatedFiles }));
        setPreview((prev) => ({ ...prev, images: updatedPreview }));
      }
    } else {
      if (field === "content") {
        const updated = [...form.content];
        updated[index] = value;
        setForm((prev) => ({ ...prev, content: updated }));
      } else {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const addParagraph = () => {
    setForm((prev) => ({
      ...prev,
      content: [...prev.content, ""],
    }));
  };

  // ✅ UPDATE BLOG
  const handleUpdate = async (e) => {
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

      form.content.forEach((para, i) => {
        formData.append(`content[${i}]`, para);
      });

      formData.append("quoteText", form.quoteText);
      formData.append("quoteAuthor", form.quoteAuthor);

      form.images.forEach((img) => {
        if (img instanceof File) {
          formData.append("images", img);
        }
      });

      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      alert("✅ Blog updated successfully");
      router.push("/admin/blogs");
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <div className="text-center p-5">Loading blog...</div>;
  }

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h2 className="mb-4 fw-bold text-center">✏️ Edit Blog</h2>

        <form onSubmit={handleUpdate} encType="multipart/form-data">
          {/* BASIC INFO */}
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter blog title"
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="form-control"
                placeholder="Category"
              />
            </div>
          </div>

          {/* COVER IMAGE */}
          <div className="mt-4">
            <label className="form-label fw-semibold">Cover Image</label>

            {preview.coverImage && (
              <div className="mb-2">
                <img
                  src={preview.coverImage}
                  className="rounded-3 border"
                  style={{ width: "180px", objectFit: "cover" }}
                />
              </div>
            )}

            <input
              type="file"
              name="coverImage"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* CONTENT */}
          <div className="mt-4">
            <label className="form-label fw-semibold">Content</label>

            {form.content.map((para, i) => (
              <textarea
                key={i}
                value={para}
                onChange={(e) => handleChange(e, i, "content")}
                className="form-control mb-2"
                rows="3"
                placeholder={`Paragraph ${i + 1}`}
              />
            ))}

            <button
              type="button"
              onClick={addParagraph}
              className="btn btn-outline-secondary mt-2"
            >
              + Add Paragraph
            </button>
          </div>

          {/* QUOTE */}
          <div className="mt-4">
            <h5 className="fw-semibold mb-2">💬 Quote Section</h5>

            <input
              name="quoteText"
              value={form.quoteText}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Quote text"
            />

            <input
              name="quoteAuthor"
              value={form.quoteAuthor}
              onChange={handleChange}
              className="form-control"
              placeholder="Author name"
            />
          </div>

          {/* EXTRA IMAGES */}
          <div className="mt-4">
            <h5 className="fw-semibold mb-2">🖼️ Additional Images</h5>

            <div className="row">
              {[0, 1].map((i) => (
                <div key={i} className="col-md-6 mb-3">
                  {preview.images[i] && (
                    <img
                      src={preview.images[i]}
                      className="rounded-3 border mb-2"
                      style={{
                        width: "100%",
                        maxHeight: "150px",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <input
                    type="file"
                    onChange={(e) => handleChange(e, i, "images")}
                    className="form-control"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <div className="mt-4 text-end">
            <button
              className="btn btn-success px-4 py-2 fw-semibold"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPortfolio() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    date: "",
    client: "",
    software: "",
    website: "",
    coverImage: null,
    description: [""],
    challengesDescription: "",
    features: [""],
    gallery: [],
  });

  const [preview, setPreview] = useState({
    coverImage: "",
    gallery: [],
  });

  // FETCH DATA
  useEffect(() => {
    if (!id) return; // ✅ FIX 1 (IMPORTANT)

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/portfolio/${id}`);
        const data = await res.json();

        if (!data.success || !data.data) {
          console.error("No data found");
          return;
        }

        const p = data.data;

        setForm({
          title: p.title || "",
          category: p.details?.category || "",
          date: p.details?.date
            ? new Date(p.details.date).toISOString().split("T")[0]
            : "",
          client: p.details?.client || "",
          software: p.details?.software?.join(", ") || "",
          website: p.details?.website || "",
          coverImage: null,
          description: p.description?.length ? p.description : [""], // ✅ FIX 2
          challengesDescription: p.challengesDescription || "",
          features: p.features?.length ? p.features : [""], // ✅ FIX 3
          gallery: [],
        });

        setPreview({
          coverImage: p.coverImage || "",
          gallery: p.gallery || [],
        });
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData();
  }, [id]);

  // HANDLE CHANGE
  const handleChange = (e, index, field) => {
    const { name, value, files } = e.target;

    if (files) {
      if (name === "coverImage") {
        setPreview((prev) => ({
          ...prev,
          coverImage: URL.createObjectURL(files[0]),
        }));
      }

      if (field === "gallery") {
        setPreview((prev) => ({
          ...prev,
          gallery: [...prev.gallery, URL.createObjectURL(files[0])],
        }));

        setForm((prev) => ({
          ...prev,
          gallery: [...prev.gallery, files[0]],
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      }
    } else {
      if (field === "description") {
        const updated = [...form.description];
        updated[index] = value;
        setForm({ ...form, description: updated });
      } else if (field === "features") {
        const updated = [...form.features];
        updated[index] = value;
        setForm({ ...form, features: updated });
      } else {
        setForm({ ...form, [name]: value });
      }
    }
  };

  const addField = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key === "description" || key === "features") {
          form[key].forEach((item) => formData.append(`${key}[]`, item));
        } else if (key === "gallery") {
          form.gallery.forEach((img) => formData.append("gallery", img));
        } else {
          if (form[key]) formData.append(key, form[key]);
        }
      });

      const res = await fetch(`/api/portfolio/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) throw new Error();

      alert("Updated successfully ✅");
      router.push("/admin/portfolio");
    } catch (err) {
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card p-4 shadow-lg border-0 rounded-4">
        <h2 className="mb-4 fw-bold">✏️ Edit Portfolio</h2>

        <form onSubmit={handleUpdate} encType="multipart/form-data">
          {/* BASIC */}
          <div className="row g-3">
            <div className="col-md-6">
              <label>Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-3">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-3">
              <label>Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label>Client</label>
              <input
                name="client"
                value={form.client}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label>Software</label>
              <input
                name="software"
                value={form.software}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-12">
              <label>Website</label>
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          {/* COVER */}
          <div className="mt-4">
            <label>Cover Image</label>

            {preview.coverImage && (
              <img
                src={preview.coverImage}
                width="200"
                className="mb-2 rounded"
              />
            )}

            <input
              type="file"
              name="coverImage"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mt-4">
            <label>Description</label>

            {form.description.map((d, i) => (
              <textarea
                key={i}
                value={d}
                onChange={(e) => handleChange(e, i, "description")}
                className="form-control mb-2"
              />
            ))}

            <button
              type="button"
              onClick={() => addField("description")}
              className="btn btn-secondary"
            >
              + Add
            </button>
          </div>

          {/* CHALLENGES */}
          <div className="mt-4">
            <label>Challenges</label>
            <textarea
              name="challengesDescription"
              value={form.challengesDescription}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* FEATURES */}
          <div className="mt-4">
            <label>Features</label>

            {form.features.map((f, i) => (
              <input
                key={i}
                value={f}
                onChange={(e) => handleChange(e, i, "features")}
                className="form-control mb-2"
              />
            ))}

            <button
              type="button"
              onClick={() => addField("features")}
              className="btn btn-secondary"
            >
              + Add Feature
            </button>
          </div>

          {/* GALLERY */}
          <div className="mt-4">
            <label>Gallery</label>

            <div className="d-flex gap-2 flex-wrap mb-2">
              {preview.gallery.map((img, i) => (
                <img key={i} src={img} width="120" className="rounded" />
              ))}
            </div>

            <input
              type="file"
              onChange={(e) => handleChange(e, null, "gallery")}
              className="form-control"
            />
          </div>

          {/* SUBMIT */}
          <button className="btn btn-success mt-4">
            {loading ? "Updating..." : "Update Portfolio"}
          </button>
        </form>
      </div>
    </div>
  );
}

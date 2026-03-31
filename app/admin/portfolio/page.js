"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PiPlus, PiTrash, PiPencilSimple } from "react-icons/pi";

export default function PortfolioPage() {
  const router = useRouter();

  const [portfolios, setPortfolios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  // FETCH
  const fetchPortfolios = async () => {
    const res = await fetch("/api/portfolio");
    const data = await res.json();
    setPortfolios(data.data || []);
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e, index, field) => {
    const { name, value, files } = e.target;

    if (files) {
      if (field === "gallery") {
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

  // SUBMIT
  const handleSubmit = async (e) => {
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
          formData.append(key, form[key]);
        }
      });

      const res = await fetch("/api/portfolio", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) throw new Error();

      setShowForm(false);
      fetchPortfolios();
    } catch (err) {
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async () => {
    await fetch(`/api/portfolio/${deleteId}`, { method: "DELETE" });
    setPortfolios((prev) => prev.filter((p) => p._id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div
      className="tw-min-h-screen tw-p-8"
      style={{ background: "#0d0d0d", color: "#fff" }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between mb-4">
        <h2>🎨 Portfolio Management</h2>

        <button onClick={() => setShowForm(true)} className="btn btn-warning">
          <PiPlus /> Add Portfolio
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div
          className="mb-4 p-4"
          style={{ background: "#111", borderRadius: "10px" }}
        >
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              name="title"
              placeholder="Title"
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              name="category"
              placeholder="Category"
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              name="client"
              placeholder="Client"
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              name="software"
              placeholder="Software (comma separated)"
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              name="website"
              placeholder="Website"
              onChange={handleChange}
              className="form-control mb-2"
            />

            <input
              type="file"
              name="coverImage"
              onChange={handleChange}
              className="form-control mb-3"
            />

            {/* DESCRIPTION */}
            {form.description.map((d, i) => (
              <textarea
                key={i}
                onChange={(e) => handleChange(e, i, "description")}
                className="form-control mb-2"
                placeholder="Description"
              />
            ))}
            <button
              type="button"
              onClick={() => addField("description")}
              className="btn btn-secondary mb-3"
            >
              + Add Description
            </button>

            {/* CHALLENGES */}
            <textarea
              name="challengesDescription"
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Challenges"
            />

            {/* FEATURES */}
            {form.features.map((f, i) => (
              <input
                key={i}
                onChange={(e) => handleChange(e, i, "features")}
                className="form-control mb-2"
                placeholder="Feature"
              />
            ))}
            <button
              type="button"
              onClick={() => addField("features")}
              className="btn btn-secondary mb-3"
            >
              + Add Feature
            </button>

            {/* GALLERY */}
            <input
              type="file"
              multiple
              onChange={(e) => handleChange(e, null, "gallery")}
              className="form-control mb-3"
            />

            <button className="btn btn-success">
              {loading ? "Uploading..." : "Create Portfolio"}
            </button>
          </form>
        </div>
      )}

      {/* TABLE */}
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>

        <tbody>
          {portfolios.map((p) => (
            <tr key={p._id}>
              <td>{p.title}</td>

              {/* ✅ FIXED CATEGORY */}
              <td>
                {p.details?.category ? (
                  <span
                    style={{
                      background: "rgba(255,106,0,0.1)",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      color: "#ff6a00",
                      fontSize: "12px",
                    }}
                  >
                    {p.details.category}
                  </span>
                ) : (
                  <span className="text-muted">No Category</span>
                )}
              </td>

              <td className="text-end">
                <button
                  onClick={() => router.push(`/admin/portfolio/${p._id}`)}
                  className="btn btn-sm btn-outline-light me-2"
                >
                  <PiPencilSimple />
                </button>

                <button
                  onClick={() => setDeleteId(p._id)}
                  className="btn btn-sm btn-outline-danger"
                >
                  <PiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DELETE CONFIRM */}
      {deleteId && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          <div
            style={{
              background: "#1a1a1a",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <p>Delete this portfolio?</p>
            <button onClick={handleDelete} className="btn btn-danger me-2">
              Delete
            </button>
            <button
              onClick={() => setDeleteId(null)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

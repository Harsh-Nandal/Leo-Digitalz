"use client";

import { useEffect, useState } from "react";
import { PiPlus, PiTrash, PiPencilSimple } from "react-icons/pi";

export default function TestimonialsPage() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false); // ✅ NEW

  const [editId, setEditId] = useState(null); // ✅ NEW

  const [form, setForm] = useState({
    name: "",
    role: "",
    review: "",
    thumb: null,
    clientImg: null,
  });

  // FETCH
  const fetchData = async () => {
    try {
      setPageLoading(true); // ✅ start loading

      const res = await fetch("/api/testimonial", {
        cache: "no-store",
      });

      const result = await res.json();

      setData(result.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false); // ✅ stop loading
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ✅ HANDLE SUBMIT (ADD + UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("role", form.role);
      formData.append("review", form.review);

      if (form.thumb) formData.append("thumb", form.thumb);
      if (form.clientImg) formData.append("clientImg", form.clientImg);

      const url = editId ? `/api/testimonial/${editId}` : "/api/testimonial";

      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (!data.success) throw new Error("Failed");

      // RESET
      setForm({
        name: "",
        role: "",
        review: "",
        thumb: null,
        clientImg: null,
      });

      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      alert("Operation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ EDIT CLICK
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      role: item.role,
      review: item.review,
      thumb: null,
      clientImg: null,
    });

    setEditId(item._id);
    setShowForm(true);
  };

  // DELETE
  const confirmDelete = async () => {
    await fetch(`/api/testimonial/${deleteId}`, {
      method: "DELETE",
    });

    setShowPopup(false);
    fetchData();
  };

  return (
    <div className="tw-p-8">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center tw-mb-10">
        <h2>Testimonials</h2>

        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
          }}
          className="btn btn-warning d-flex align-items-center gap-2"
        >
          <PiPlus /> Add Testimonial
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="border p-4 mb-4 rounded"
        >
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <input
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <textarea
            name="review"
            placeholder="Review"
            value={form.review}
            onChange={handleChange}
            className="form-control mb-2"
          />

          {/* IMAGE */}
          <input
            type="file"
            name="thumb"
            onChange={handleChange}
            className="form-control mb-2"
          />

          <input
            type="file"
            name="clientImg"
            onChange={handleChange}
            className="form-control mb-3"
          />

          <div className="d-flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-success"
            >
              {loading ? "Processing..." : editId ? "Update" : "Upload"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditId(null);
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Review</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {pageLoading ? (
            <tr>
              <td colSpan="4" className="text-center p-5">
                ⏳ Loading testimonials...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-5 text-muted">
                🚫 No testimonials found
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.role}</td>
                <td>{item.review}</td>
                <td className="d-flex gap-2">
                  {/* EDIT */}
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(item)}
                  >
                    <PiPencilSimple />
                  </button>

                  {/* DELETE */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      setDeleteId(item._id);
                      setShowPopup(true);
                    }}
                  >
                    <PiTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pageLoading && !showForm ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-warning" />
          <p className="mt-3">Loading testimonials...</p>
        </div>
      ) : data.length === 0 && !showForm ? (
        <div className="text-center mt-5 text-muted">
          🚫 No testimonials found
        </div>
      ) : null}

      {/* DELETE POPUP */}
      {showPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75">
          <div className="bg-white p-4 rounded text-center">
            <h4>Delete Testimonial?</h4>

            <div className="d-flex gap-2 mt-3">
              <button onClick={confirmDelete} className="btn btn-danger w-100">
                Yes
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

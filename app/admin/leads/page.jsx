"use client";

import { useEffect, useState } from "react";
import { PiTrash } from "react-icons/pi";

export default function LeadsPage() {
  const [data, setData] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // 🔥 POPUP STATE
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // FETCH
  const fetchData = async () => {
    try {
      setPageLoading(true);

      const res = await fetch("/api/contact", {
        cache: "no-store",
      });

      const result = await res.json();

      setData(result.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // DELETE CONFIRM
  const confirmDelete = async () => {
    await fetch(`/api/contact/${deleteId}`, { method: "DELETE" });
    setShowPopup(false);
    setDeleteId(null);
    fetchData();
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    await fetch(`/api/contact/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchData();
  };

  // FILTER
  const filteredData =
    filter === "all"
      ? data
      : data.filter((item) => item.status === filter);

  // LOADING
  if (pageLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh", color: "#fff" }}>
        <div className="text-center">
          <div className="spinner-border text-warning mb-3" />
          <p>Loading leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", color: "#fff" }}>
      <h2 style={{ marginBottom: "20px" }}>📩 Contact Leads</h2>

      {/* FILTER */}
      <div style={{ marginBottom: "20px" }}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-select w-auto"
        >
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
        </select>
      </div>

      <div
        style={{
          background: "#1a1a1a",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-5 text-white">
                  🚫 No leads found
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.message}</td>

                  {/* STATUS */}
                  <td>
                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        background:
                          item.status === "new"
                            ? "#ff6a00"
                            : item.status === "pending"
                            ? "#ffc107"
                            : "#0dcaf0",
                        color: "#000",
                        fontWeight: "600",
                      }}
                    >
                      {item.status || "new"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="d-flex gap-2">
                    <select
                      value={item.status || "new"}
                      onChange={(e) =>
                        updateStatus(item._id, e.target.value)
                      }
                      className="form-select form-select-sm"
                    >
                      <option value="new">New</option>
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                    </select>

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
      </div>

      {/* 🔥 DELETE POPUP */}
      {showPopup && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.7)", zIndex: 999 }}
        >
          <div
            style={{
              background: "#1a1a1a",
              padding: "25px",
              borderRadius: "12px",
              textAlign: "center",
              width: "320px",
            }}
          >
            <h4 className="mb-2">Delete Lead?</h4>
            <p className="text-muted mb-3">
              This action cannot be undone
            </p>

            <div className="d-flex gap-2">
              <button
                onClick={confirmDelete}
                className="btn btn-danger w-100"
              >
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
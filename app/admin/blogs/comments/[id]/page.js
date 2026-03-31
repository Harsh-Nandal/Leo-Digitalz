"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CommentsPage() {
  const params = useParams();
  const id = params?.id;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH COMMENTS (GLOBAL FUNCTION)
  const fetchComments = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/blog/comments/${id}`);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setComments(data.comments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchComments();
  }, [id]);

  // ✅ DELETE COMMENT
  const handleDelete = async (commentId) => {
    try {
      const res = await fetch(`/api/blog/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      // refresh comments
      fetchComments();
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        color: "#fff",
        background: "#111",
        minHeight: "100vh",
      }}
    >
      <h2>💬 Blog Comments ({comments.length})</h2>

      {/* LOADING */}
      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>No comments yet 🚫</p>
      ) : (
        comments.map((c) => (
          <div
            key={c._id}
            style={{
              background: "#1a1a1a",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            <h6 style={{ marginBottom: "5px" }}>{c.name}</h6>
            <small style={{ color: "#aaa" }}>{c.email}</small>
            <p style={{ marginTop: "8px" }}>{c.message}</p>

            {/* DELETE BUTTON */}
            <button
              onClick={() => handleDelete(c._id)}
              className="btn btn-sm btn-danger mt-2"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
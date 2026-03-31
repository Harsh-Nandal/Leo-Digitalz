"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PiPlus, PiTrash, PiPencilSimple } from "react-icons/pi";

export default function TeamPage() {
  const router = useRouter();

  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    designation: "",
    shortBio: "",
    image: null,
    description: [""],
    skills: [""],
    experience: "",
    projects: "",
    clients: "",
    order: 0,
    isFeatured: false,
  });

  // ✅ FETCH
  const fetchTeams = async () => {
    const res = await fetch("/api/team");
    const data = await res.json();
    setTeams(data.data || []);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // ✅ HANDLE CHANGE
  const handleChange = (e, index, field) => {
    const { name, value, files, type, checked } = e.target;

    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      if (field === "description") {
        const updated = [...form.description];
        updated[index] = value;
        setForm({ ...form, description: updated });

      } else if (field === "skills") {
        const updated = [...form.skills];
        updated[index] = value;
        setForm({ ...form, skills: updated });

      } else {
        setForm({ ...form, [name]: value });
      }
    }
  };

  // ✅ ADD FIELD
  const addField = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("slug", form.slug);
      formData.append("designation", form.designation);
      formData.append("shortBio", form.shortBio);
      formData.append("experience", form.experience);
      formData.append("projects", form.projects);
      formData.append("clients", form.clients);
      formData.append("order", form.order);
      formData.append("isFeatured", form.isFeatured);

      if (form.image) formData.append("image", form.image);

      form.description.forEach((d) =>
        formData.append("description[]", d)
      );

      form.skills.forEach((s) =>
        formData.append("skills[]", s)
      );

      const res = await fetch("/api/team", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      setShowForm(false);
      fetchTeams();

    } catch {
      alert("Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    await fetch(`/api/team/${id}`, { method: "DELETE" });
    setTeams((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="tw-p-8" style={{ background: "#0d0d0d", color: "#fff" }}>

      {/* HEADER */}
      <div className="d-flex justify-content-between mb-4">
        <h2>👥 Team Management</h2>

        <button
          onClick={() => setShowForm(true)}
          className="btn btn-warning"
        >
          <PiPlus /> Add Member
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="p-4 mb-4" style={{ background: "#111", borderRadius: "10px" }}>
          <form onSubmit={handleSubmit}>

            <input name="name" placeholder="Name" onChange={handleChange} className="form-control mb-2" />
            <input name="slug" placeholder="Slug" onChange={handleChange} className="form-control mb-2" />
            <input name="designation" placeholder="Designation" onChange={handleChange} className="form-control mb-2" />
            <input name="shortBio" placeholder="Short Bio" onChange={handleChange} className="form-control mb-2" />

            <input type="file" name="image" onChange={handleChange} className="form-control mb-3" />

            {/* DESCRIPTION */}
            {form.description.map((d, i) => (
              <textarea key={i} onChange={(e) => handleChange(e, i, "description")} className="form-control mb-2" placeholder="Description" />
            ))}
            <button type="button" onClick={() => addField("description")} className="btn btn-secondary mb-3">+ Add Description</button>

            {/* SKILLS */}
            {form.skills.map((s, i) => (
              <input key={i} onChange={(e) => handleChange(e, i, "skills")} className="form-control mb-2" placeholder="Skill" />
            ))}
            <button type="button" onClick={() => addField("skills")} className="btn btn-secondary mb-3">+ Add Skill</button>

            <input name="experience" placeholder="Experience (years)" onChange={handleChange} className="form-control mb-2" />
            <input name="projects" placeholder="Projects" onChange={handleChange} className="form-control mb-2" />
            <input name="clients" placeholder="Clients" onChange={handleChange} className="form-control mb-2" />

            <input type="number" name="order" placeholder="Order" onChange={handleChange} className="form-control mb-2" />

            <label className="mb-3">
              <input type="checkbox" name="isFeatured" onChange={handleChange} /> Featured
            </label>

            <button className="btn btn-success">
              {loading ? "Saving..." : "Create Member"}
            </button>

          </form>
        </div>
      )}

      {/* TABLE */}
      <table className="table table-dark">
        <tbody>
          {teams.map((t) => (
            <tr key={t._id}>
              <td>{t.name}</td>
              <td>{t.designation}</td>
              <td className="text-end">
                <button onClick={() => router.push(`/admin/team/${t._id}`)} className="btn btn-sm btn-outline-light me-2">
                  <PiPencilSimple />
                </button>
                <button onClick={() => handleDelete(t._id)} className="btn btn-sm btn-outline-danger">
                  <PiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
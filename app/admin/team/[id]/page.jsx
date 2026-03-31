"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditTeam() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [preview, setPreview] = useState({
    image: "",
  });

  // ✅ FETCH
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const res = await fetch(`/api/team/${id}`);
      const data = await res.json();
      const t = data.data;

      setForm({
        name: t.name || "",
        slug: t.slug || "",
        designation: t.designation || "",
        shortBio: t.shortBio || "",
        image: null,
        description: t.description?.length ? t.description : [""],
        skills: t.skills?.length ? t.skills : [""],
        experience: t.experience || "",
        projects: t.projects || "",
        clients: t.clients || "",
        order: t.order || 0,
        isFeatured: t.isFeatured || false,
      });

      setPreview({
        image: t.image || "",
      });

      setPageLoading(false);
    };

    fetchData();
  }, [id]);

  // ✅ CHANGE
  const handleChange = (e, index, field) => {
    const { name, value, files, type, checked } = e.target;

    if (files) {
      const file = files[0];
      setForm((prev) => ({ ...prev, [name]: file }));
      setPreview((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
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

  const addField = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  // ✅ UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key !== "description" && key !== "skills") {
          formData.append(key, form[key]);
        }
      });

      if (form.image) formData.append("image", form.image);

      form.description.forEach((d) =>
        formData.append("description[]", d)
      );

      form.skills.forEach((s) =>
        formData.append("skills[]", s)
      );

      const res = await fetch(`/api/team/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      alert("Updated ✅");
      router.push("/admin/team");

    } catch {
      alert("Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading || !form)
    return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="container py-5">
      <div className="card p-4 shadow-lg">

        <h2 className="mb-4">Edit Team Member</h2>

        <form onSubmit={handleUpdate}>

          {/* NAME */}
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="form-control mb-3" />

          {/* SLUG */}
          <label>Slug</label>
          <input name="slug" value={form.slug} onChange={handleChange} className="form-control mb-3" />

          {/* DESIGNATION */}
          <label>Designation</label>
          <input name="designation" value={form.designation} onChange={handleChange} className="form-control mb-3" />

          {/* BIO */}
          <label>Short Bio</label>
          <input name="shortBio" value={form.shortBio} onChange={handleChange} className="form-control mb-3" />

          {/* IMAGE */}
          <label>Profile Image</label><br />
          {preview.image && <img src={preview.image} width="100" className="mb-2" />}
          <input type="file" name="image" onChange={handleChange} className="form-control mb-3" />

          {/* DESCRIPTION */}
          <label>Description</label>
          {form.description.map((d, i) => (
            <textarea key={i} value={d} onChange={(e) => handleChange(e, i, "description")} className="form-control mb-2" />
          ))}
          <button type="button" onClick={() => addField("description")} className="btn btn-secondary mb-3">+ Add Description</button>

          {/* SKILLS */}
          <label>Skills</label>
          {form.skills.map((s, i) => (
            <input key={i} value={s} onChange={(e) => handleChange(e, i, "skills")} className="form-control mb-2" />
          ))}
          <button type="button" onClick={() => addField("skills")} className="btn btn-secondary mb-3">+ Add Skill</button>

          {/* STATS */}
          <label>Experience (years)</label>
          <input name="experience" value={form.experience} onChange={handleChange} className="form-control mb-3" />

          <label>Projects</label>
          <input name="projects" value={form.projects} onChange={handleChange} className="form-control mb-3" />

          <label>Clients</label>
          <input name="clients" value={form.clients} onChange={handleChange} className="form-control mb-3" />

          {/* ORDER */}
          <label>Order</label>
          <input type="number" name="order" value={form.order} onChange={handleChange} className="form-control mb-3" />

          {/* FEATURED */}
          <label className="mb-3">
            <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} /> Featured
          </label>

          <br />

          <button className="btn btn-success w-100">
            {loading ? "Updating..." : "Update Member"}
          </button>

        </form>

      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PiPlus,
  PiTrash,
  PiPencilSimple,
} from "react-icons/pi";

export default function ServicesPage() {
  const router = useRouter();

  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    icon: null,
    coverImage: null,
    videoThumbnail: null,
    description: [""],
    benefitsTitle: "Benefits of this service",
    benefitsDescription: "",
    features: [""],
    videoUrl: "",
    delay: 200,
    order: 0,
    isFeatured: false,
    steps: [
      {
        icon: "",
        title: "",
        description: "",
        number: "01",
        delay: 200,
      },
    ],
  });

  // FETCH
  const fetchServices = async () => {
    const res = await fetch("/api/service");
    const data = await res.json();
    setServices(data.data || []);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e, index, field, subField) => {
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

      } else if (field === "features") {
        const updated = [...form.features];
        updated[index] = value;
        setForm({ ...form, features: updated });

      } else if (field === "steps") {
        const updated = [...form.steps];
        updated[index][subField] = value;
        setForm({ ...form, steps: updated });

      } else {
        setForm({ ...form, [name]: value });
      }
    }
  };

  // ADDERS
  const addField = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const addStep = () => {
    setForm((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          icon: "",
          title: "",
          description: "",
          number: `0${prev.steps.length + 1}`,
          delay: 200,
        },
      ],
    }));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("shortDescription", form.shortDescription);
      formData.append("benefitsTitle", form.benefitsTitle);
      formData.append("benefitsDescription", form.benefitsDescription);
      formData.append("videoUrl", form.videoUrl);
      formData.append("delay", form.delay);
      formData.append("order", form.order);
      formData.append("isFeatured", form.isFeatured);

      if (form.icon) formData.append("icon", form.icon);
      if (form.coverImage) formData.append("coverImage", form.coverImage);
      if (form.videoThumbnail) formData.append("videoThumbnail", form.videoThumbnail);

      form.description.forEach((d) =>
        formData.append("description[]", d)
      );

      form.features.forEach((f) =>
        formData.append("features[]", f)
      );

      form.steps.forEach((s, i) => {
        formData.append(`steps[${i}][icon]`, s.icon);
        formData.append(`steps[${i}][title]`, s.title);
        formData.append(`steps[${i}][description]`, s.description);
        formData.append(`steps[${i}][number]`, s.number);
        formData.append(`steps[${i}][delay]`, s.delay);
      });

      const res = await fetch("/api/service", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) throw new Error();

      setShowForm(false);
      fetchServices();

    } catch (err) {
      alert("Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async () => {
    await fetch(`/api/service/${deleteId}`, { method: "DELETE" });

    setServices((prev) =>
      prev.filter((s) => s._id !== deleteId)
    );

    setShowPopup(false);
  };

  return (
    <div className="tw-p-8" style={{ background: "#0d0d0d", color: "#fff" }}>

      {/* HEADER */}
      <div className="d-flex justify-content-between mb-4">
        <h2>🛠 Services Management</h2>

        <button
          onClick={() => setShowForm(true)}
          className="btn btn-warning"
        >
          <PiPlus /> Add Service
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="p-4 mb-4" style={{ background: "#111", borderRadius: "10px" }}>
          <form onSubmit={handleSubmit}>

            <input name="title" placeholder="Title" onChange={handleChange} className="form-control mb-2" />
            <input name="slug" placeholder="Slug" onChange={handleChange} className="form-control mb-2" />
            <input name="shortDescription" placeholder="Short Description" onChange={handleChange} className="form-control mb-2" />

            <textarea name="benefitsDescription" placeholder="Benefits Description" onChange={handleChange} className="form-control mb-2" />

            <input name="videoUrl" placeholder="Video URL" onChange={handleChange} className="form-control mb-2" />

            <input type="number" name="order" placeholder="Order" onChange={handleChange} className="form-control mb-2" />
            <input type="number" name="delay" placeholder="Delay" onChange={handleChange} className="form-control mb-2" />

            <label className="mb-2">
              <input type="checkbox" name="isFeatured" onChange={handleChange} /> Featured
            </label>

            <input type="file" name="icon" onChange={handleChange} className="form-control mb-2" />
            <input type="file" name="coverImage" onChange={handleChange} className="form-control mb-2" />
            <input type="file" name="videoThumbnail" onChange={handleChange} className="form-control mb-3" />

            {/* DESCRIPTION */}
            {form.description.map((d, i) => (
              <textarea key={i} onChange={(e) => handleChange(e, i, "description")} className="form-control mb-2" placeholder="Paragraph" />
            ))}
            <button type="button" onClick={() => addField("description")} className="btn btn-secondary mb-3">+ Add Paragraph</button>

            {/* FEATURES */}
            {form.features.map((f, i) => (
              <input key={i} onChange={(e) => handleChange(e, i, "features")} className="form-control mb-2" placeholder="Feature" />
            ))}
            <button type="button" onClick={() => addField("features")} className="btn btn-secondary mb-3">+ Add Feature</button>

            {/* STEPS */}
            <h5>How We Work</h5>
            {form.steps.map((s, i) => (
              <div key={i} className="mb-2">
                <input placeholder="Icon URL" onChange={(e) => handleChange(e, i, "steps", "icon")} className="form-control mb-1" />
                <input placeholder="Title" onChange={(e) => handleChange(e, i, "steps", "title")} className="form-control mb-1" />
                <input placeholder="Description" onChange={(e) => handleChange(e, i, "steps", "description")} className="form-control mb-1" />
              </div>
            ))}
            <button type="button" onClick={addStep} className="btn btn-secondary mb-3">+ Add Step</button>

            <button className="btn btn-success">
              {loading ? "Saving..." : "Create Service"}
            </button>

          </form>
        </div>
      )}

      {/* TABLE */}
      <table className="table table-dark">
        <tbody>
          {services.map((s) => (
            <tr key={s._id}>
              <td>{s.title}</td>
              <td className="text-end">
                <button onClick={() => router.push(`/admin/services/${s._id}`)} className="btn btn-sm btn-outline-light me-2">
                  <PiPencilSimple />
                </button>
                <button onClick={() => { setDeleteId(s._id); setShowPopup(true); }} className="btn btn-sm btn-outline-danger">
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
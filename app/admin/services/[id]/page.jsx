"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditService() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [form, setForm] = useState(null);

  const [preview, setPreview] = useState({
    icon: "",
    coverImage: "",
    videoThumbnail: "",
  });

  // ✅ FETCH
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/service/${id}`);
        const data = await res.json();

        const s = data.data;

        setForm({
          title: s.title || "",
          slug: s.slug || "",
          shortDescription: s.shortDescription || "",

          icon: null,
          coverImage: null,
          videoThumbnail: null,

          description: s.description?.length ? s.description : [""],

          benefitsTitle: s.benefitsTitle || "",
          benefitsDescription: s.benefitsDescription || "",

          features: s.features?.length ? s.features : [""],

          videoUrl: s.videoUrl || "",

          delay: s.delay || 200,
          order: s.order || 0,
          isFeatured: s.isFeatured || false,

          steps: s.steps?.length
            ? s.steps
            : [
                {
                  icon: "",
                  title: "",
                  description: "",
                  number: "01",
                  delay: 200,
                },
              ],
        });

        setPreview({
          icon: s.icon || "",
          coverImage: s.coverImage || "",
          videoThumbnail: s.videoThumbnail || "",
        });

      } catch (err) {
        alert("Error loading ❌");
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // HANDLE CHANGE
  const handleChange = (e, index, field, subField) => {
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

  // UPDATE
  const handleUpdate = async (e) => {
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

      const res = await fetch(`/api/service/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) throw new Error();

      alert("Updated ✅");
      router.push("/admin/services");

    } catch {
      alert("Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading || !form) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <div className="container py-5">
      <div className="card p-4 shadow-lg">

        <h2 className="mb-4">Edit Service</h2>

        <form onSubmit={handleUpdate}>

          <input name="title" value={form.title} onChange={handleChange} className="form-control mb-2" />
          <input name="slug" value={form.slug} onChange={handleChange} className="form-control mb-2" />
          <input name="shortDescription" value={form.shortDescription} onChange={handleChange} className="form-control mb-2" />

          {/* ICON */}
          {preview.icon && <img src={preview.icon} width="80" className="mb-2" />}
          <input type="file" name="icon" onChange={handleChange} className="form-control mb-2" />

          {/* COVER */}
          {preview.coverImage && <img src={preview.coverImage} width="120" className="mb-2" />}
          <input type="file" name="coverImage" onChange={handleChange} className="form-control mb-2" />

          {/* VIDEO THUMB */}
          {preview.videoThumbnail && <img src={preview.videoThumbnail} width="120" className="mb-2" />}
          <input type="file" name="videoThumbnail" onChange={handleChange} className="form-control mb-3" />

          {/* DESCRIPTION */}
          {form.description.map((d, i) => (
            <textarea key={i} value={d} onChange={(e) => handleChange(e, i, "description")} className="form-control mb-2" />
          ))}
          <button type="button" onClick={() => addField("description")} className="btn btn-secondary mb-3">+ Add Paragraph</button>

          {/* BENEFITS */}
          <input name="benefitsTitle" value={form.benefitsTitle} onChange={handleChange} className="form-control mb-2" />
          <textarea name="benefitsDescription" value={form.benefitsDescription} onChange={handleChange} className="form-control mb-3" />

          {/* FEATURES */}
          {form.features.map((f, i) => (
            <input key={i} value={f} onChange={(e) => handleChange(e, i, "features")} className="form-control mb-2" />
          ))}
          <button type="button" onClick={() => addField("features")} className="btn btn-secondary mb-3">+ Add Feature</button>

          {/* VIDEO */}
          <input name="videoUrl" value={form.videoUrl} onChange={handleChange} className="form-control mb-3" />

          {/* EXTRA */}
          <input type="number" name="order" value={form.order} onChange={handleChange} className="form-control mb-2" />
          <input type="number" name="delay" value={form.delay} onChange={handleChange} className="form-control mb-2" />

          <label className="mb-3">
            <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} /> Featured
          </label>

          {/* STEPS */}
          <h5>Steps</h5>
          {form.steps.map((s, i) => (
            <div key={i} className="mb-2">
              <input value={s.icon} onChange={(e) => handleChange(e, i, "steps", "icon")} className="form-control mb-1" placeholder="Icon URL" />
              <input value={s.title} onChange={(e) => handleChange(e, i, "steps", "title")} className="form-control mb-1" />
              <input value={s.description} onChange={(e) => handleChange(e, i, "steps", "description")} className="form-control mb-1" />
            </div>
          ))}
          <button type="button" onClick={addStep} className="btn btn-secondary mb-3">+ Add Step</button>

          <button className="btn btn-success">
            {loading ? "Updating..." : "Update"}
          </button>

        </form>

      </div>
    </div>
  );
}
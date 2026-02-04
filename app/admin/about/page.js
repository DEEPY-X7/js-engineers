"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AboutManager() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    founderName: "",
    founderImage: "",
  });

  const loadAbout = async () => {
    try {
      const res = await fetch("/api/about");
      const data = await res.json();

      if (data.success && data.data) {
        setForm(data.data);
      }
    } catch (error) {
      console.error("Failed to load About data:", error);
    }
  };

  useEffect(() => {
    loadAbout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/about", {
      method: "PUT",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    alert(data.message || "Updated");
  };

  return (
    <AdminLayout title="About Page Settings">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          className="w-full border p-2 rounded"
          rows={5}
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Founder Name"
          value={form.founderName}
          onChange={(e) =>
            setForm({ ...form, founderName: e.target.value })
          }
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Founder Image URL"
          value={form.founderImage}
          onChange={(e) =>
            setForm({ ...form, founderImage: e.target.value })
          }
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Save
        </button>
      </form>
    </AdminLayout>
  );
}
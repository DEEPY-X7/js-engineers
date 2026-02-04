"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useRouter } from "next/navigation";

export default function TestimonialForm({ params }) {
  const router = useRouter();
  const isEdit = !!params?.id;

  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 5,
    location: "",
  });

  const loadExisting = async () => {
    const res = await fetch(`/api/testimonials`);
    const data = await res.json();

    if (data.success) {
      const item = data.data.find((t) => t._id === params.id);
      if (item) setForm(item);
    }
  };

  useEffect(() => {
    if (isEdit) loadExisting();
  }, []);

  const save = async () => {
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `/api/testimonials/${params.id}`
      : `/api/testimonials`;

    await fetch(url, {
      method,
      body: JSON.stringify(form),
    });

    router.push("/admin/testimonials");
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <AdminHeader title={isEdit ? "Edit Testimonial" : "Add Testimonial"} />

        <div className="bg-white p-6 rounded shadow max-w-xl space-y-5">

          {["name", "location"].map((field) => (
            <div key={field}>
              <label className="block mb-1 capitalize font-medium">
                {field}
              </label>
              <input
                className="w-full border p-2 rounded"
                value={form[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
              />
            </div>
          ))}

          <div>
            <label className="block mb-1">Message</label>
            <textarea
              rows={4}
              className="w-full border p-2 rounded"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-1">Rating</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              min="1"
              max="5"
              value={form.rating}
              onChange={(e) =>
                setForm({ ...form, rating: Number(e.target.value) })
              }
            />
          </div>

          <button
            onClick={save}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
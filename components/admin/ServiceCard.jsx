"use client";

import { useState } from "react";

export default function ServiceCard({ item, refresh }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    title: item.title,
    description: item.description,
    icon: item.icon,
    category: item.category,
  });

  // Update handler
  const handleUpdate = async () => {
    try {
      const res = await fetch("/api/services/" + item._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Service updated!");
        setEditMode(false);
        refresh();
      } else {
        alert(data.error);
      }
    } catch (e) {
      console.error("Update error:", e);
    }
  };

  // Delete handler
  const handleDelete = async () => {
    if (!confirm("Delete this service?")) return;

    try {
      const res = await fetch("/api/services/" + item._id, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        alert("Service deleted!");
        refresh();
      }
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  return (
    <div className="bg-white border rounded-xl shadow p-5">

      {/* NORMAL VIEW */}
      {!editMode && (
        <>
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="text-gray-700 mb-2">{item.description}</p>
          <p className="text-sm text-gray-500">Category: {item.category}</p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setEditMode(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </>
      )}

      {/* EDIT MODE */}
      {editMode && (
        <div className="space-y-4">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <textarea
            rows="3"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="w-full border p-2 rounded"
          >
            <option value="electrical">Electrical</option>
            <option value="telecom">Telecom</option>
            <option value="satellite">Satellite</option>
          </select>

          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

export default function ContactSettingsManager() {
  const [data, setData] = useState(null);
  const [form, setForm] = useState({
    phone: "",
    email: "",
    address: "",
    mapUrl: "",
    workHours: "",
    facebook: "",
    instagram: "",
    linkedin: "",
  });

  // Load existing settings
  const loadSettings = async () => {
    try {
      const res = await fetch("/api/contact");
      const result = await res.json();

      if (result.success && result.data) {
        setData(result.data);

        setForm({
          phone: result.data.phone || "",
          email: result.data.email || "",
          address: result.data.address || "",
          mapUrl: result.data.mapUrl || "",
          workHours: result.data.workHours || "",
          facebook: result.data.facebook || "",
          instagram: result.data.instagram || "",
          linkedin: result.data.linkedin || "",
        });
      }
    } catch (error) {
      console.error("Contact load error:", error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // Save handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = data ? "PUT" : "POST";

    try {
      const res = await fetch("/api/contact", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (result.success) {
        alert("Contact settings updated!");
        loadSettings();
      } else {
        alert(result.error || "Update failed");
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 border rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4">
        {data ? "Update Contact Settings" : "Create Contact Settings"}
      </h2>

      <input
        type="text"
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full border p-3 rounded"
      />

      <input
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full border p-3 rounded"
      />

      <textarea
        placeholder="Address"
        rows="2"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="w-full border p-3 rounded"
      />

      <input
        type="text"
        placeholder="Google Map URL"
        value={form.mapUrl}
        onChange={(e) => setForm({ ...form, mapUrl: e.target.value })}
        className="w-full border p-3 rounded"
      />

      <input
        type="text"
        placeholder="Working Hours (e.g., Mon–Sat, 9am–7pm)"
        value={form.workHours}
        onChange={(e) => setForm({ ...form, workHours: e.target.value })}
        className="w-full border p-3 rounded"
      />

      {/* Social Links */}
      <input
        type="text"
        placeholder="Facebook (optional)"
        value={form.facebook}
        onChange={(e) => setForm({ ...form, facebook: e.target.value })}
        className="w-full border p-3 rounded"
      />

      <input
        type="text"
        placeholder="Instagram (optional)"
        value={form.instagram}
        onChange={(e) => setForm({ ...form, instagram: e.target.value })}
        className="w-full border p-3 rounded"
      />

      <input
        type="text"
        placeholder="LinkedIn (optional)"
        value={form.linkedin}
        onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
        className="w-full border p-3 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Save Settings
      </button>
    </form>
  );
}
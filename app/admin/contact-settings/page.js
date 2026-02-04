"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";

export default function ContactSettingsPage() {
  const [form, setForm] = useState({
    phone: "",
    email: "",
    address: "",
    whatsapp: "",
    mapLink: "",
  });

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const loadSettings = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();

      if (data.success && data.data) {
        setForm(data.data);
      }
    } catch (error) {
      console.error("Load settings error:", error);
    }
    setLoading(false);
  };

  const updateSettings = async () => {
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (error) {
      console.error("Update settings error:", error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <AdminHeader title="Contact Settings" />

        <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
          <div className="space-y-4">

            {["phone", "email", "address", "whatsapp", "mapLink"].map((field) => (
              <div key={field}>
                <label className="block font-medium mb-1 capitalize">
                  {field}
                </label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={form[field] || ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [field]: e.target.value }))
                  }
                />
              </div>
            ))}

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={updateSettings}
            >
              Save Settings
            </button>

            {saved && <p className="text-green-600 mt-2">Saved Successfully!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
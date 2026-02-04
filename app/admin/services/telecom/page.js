"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";

export default function AdminTelecomServicesPage() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
    category: "telecom",
  });

  const loadServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();

      if (data.success) {
        const telecomOnly = data.data.filter(
          (item) => item.category === "telecom"
        );
        setServices(telecomOnly);
      }
    } catch (err) {
      console.error("Error loading telecom services:", err);
    }
    setLoading(false);
  };

  const createService = async () => {
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setForm({ title: "", description: "", icon: "", category: "telecom" });
        loadServices();
      }
    } catch (err) {
      console.error("Create service error:", err);
    }
  };

  const deleteService = async (id) => {
    try {
      const res = await fetch("/api/services", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) loadServices();
    } catch (err) {
      console.error("Delete service error:", err);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <AdminHeader title="Telecom Services Manager" />

        {/* ADD NEW TELECOM SERVICE */}
        <div className="bg-white p-6 shadow rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Add Telecom Service</h2>

          <input
            className="border p-2 rounded w-full mb-3"
            placeholder="Service Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className="border p-2 rounded w-full mb-3"
            placeholder="Service Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            className="border p-2 rounded w-full mb-3"
            placeholder="Icon (optional)"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
          />

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={createService}
          >
            Add Telecom Service
          </button>
        </div>

        {/* LIST TELECOM SERVICES */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">All Telecom Services</h2>

          {loading ? (
            <p>Loading...</p>
          ) : services.length === 0 ? (
            <p>No telecom services found.</p>
          ) : (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Icon</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {services.map((item) => (
                  <tr key={item._id}>
                    <td className="border p-2">{item.title}</td>
                    <td className="border p-2">{item.description}</td>
                    <td className="border p-2">{item.icon || "-"}</td>
                    <td className="border p-2">
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => deleteService(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
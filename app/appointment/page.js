"use client";

import { useState } from "react";

export default function AppointmentPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    date: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        setError("Something went wrong. Please try again.");
        setSending(false);
        return;
      }

      setSuccess("Appointment booked successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        date: "",
        message: "",
      });
      setSending(false);
    } catch (err) {
      console.error(err);
      setError("Server error");
      setSending(false);
    }
  }

  return (
    <div className="px-6 py-12 max-w-2xl mx-auto space-y-10">

      <h1 className="text-4xl font-bold text-center">Book an Appointment</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow border space-y-6">

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
        </div>

        {/* Service Type */}
        <div>
          <label className="block mb-1 font-medium">Service Type</label>
          <select
            className="w-full border p-2 rounded"
            value={form.serviceType}
            onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
            required
          >
            <option value="">Select Service</option>
            <option value="Electrical">Electrical</option>
            <option value="Satellite">Satellite</option>
            <option value="Telecom">Telecom</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Preferred Date</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-medium">Message (Optional)</label>
          <textarea
            className="w-full border p-2 rounded h-28"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Success */}
        {success && <p className="text-green-600 text-center">{success}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={sending}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {sending ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}
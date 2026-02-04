"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Submit form
  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/contact-massages", {
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

      setSuccess("Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
      setSending(false);

    } catch (err) {
      console.error(err);
      setError("Server error");
      setSending(false);
    }
  }

  return (
    <div className="px-6 py-12 max-w-2xl mx-auto space-y-12">

      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>

      <p className="text-gray-700 text-center mb-8">
        Have a question or need service? Send us a message and we’ll get back to you quickly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow p-6 rounded border">

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
          <label className="block mb-1 font-medium">Phone (Optional)</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            className="w-full border p-2 rounded h-28"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
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
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {sending ? "Sending..." : "Send Message"}
        </button>

      </form>
    </div>
  );
}
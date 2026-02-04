"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "electrical",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    try {
      const res = await fetch("/api/contact-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (result.success) {
        setStatusMsg("Message sent successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          service: "electrical",
          message: "",
        });
      } else {
        setStatusMsg("Failed! Try again.");
      }
    } catch (error) {
      setStatusMsg("Server error! Try later.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Name */}
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-md"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block mb-1 font-medium">Phone</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-md"
        />
      </div>

      {/* Service type */}
      <div>
        <label className="block mb-1 font-medium">Service Type</label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md"
        >
          <option value="electrical">Electrical</option>
          <option value="telecom">Telecom</option>
          <option value="satellite">Satellite</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block mb-1 font-medium">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows="4"
          className="w-full border px-4 py-2 rounded-md"
        ></textarea>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-md"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {/* Msg */}
      {statusMsg && (
        <p className="mt-2 text-green-600 font-medium">{statusMsg}</p>
      )}
    </form>
  );
}
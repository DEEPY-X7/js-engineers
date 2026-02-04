"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";

export default function TestimonialsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setItems(d.data);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">
      <SectionTitle
        title="What Clients Say"
        subtitle="Real feedback from our customers"
      />

      <div className="space-y-6">
        {items.map((t) => (
          <div
            key={t._id}
            className="bg-white p-6 shadow border rounded-xl"
          >
            <h3 className="font-semibold text-xl">{t.name}</h3>
            <p className="text-gray-700 mt-2">{t.message}</p>
            <p className="text-xs text-gray-500 mt-3">
              {new Date(t.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
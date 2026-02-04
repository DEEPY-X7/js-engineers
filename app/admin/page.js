"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    gallery: 0,
    testimonials: 0,
    appointments: 0,
  });

  const fetchStats = async () => {
    try {
      const [servicesRes, galleryRes, testimonialsRes, appointmentsRes] =
        await Promise.all([
          fetch("/api/services"),
          fetch("/api/gallery"),
          fetch("/api/testimonials"),
          fetch("/api/appointments"),
        ]);

      const services = await servicesRes.json();
      const gallery = await galleryRes.json();
      const testimonials = await testimonialsRes.json();
      const appointments = await appointmentsRes.json();

      setStats({
        services: services?.data?.length || 0,
        gallery: gallery?.data?.length || 0,
        testimonials: testimonials?.data?.length || 0,
        appointments: appointments?.data?.length || 0,
      });
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Services",
      value: stats.services,
      color: "bg-blue-600",
    },
    {
      title: "Gallery Photos",
      value: stats.gallery,
      color: "bg-green-600",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      color: "bg-orange-600",
    },
    {
      title: "Appointments",
      value: stats.appointments,
      color: "bg-purple-600",
    },
  ];

  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Dashboard Overview
      </h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`text-white rounded-xl shadow-lg p-8 ${card.color}`}
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="text-4xl font-bold mt-4">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-14 bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <p className="text-gray-600">
          Recent updates and activity will appear here (optional future module).
        </p>
      </div>
    </div>
  );
}

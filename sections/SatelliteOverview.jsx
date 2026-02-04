"use client";

import Image from "next/image";
import { IMAGES } from "@/config/images";
import Link from "next/link";

export default function SatelliteOverview() {
  const points = [
    "Satellite dish installation",
    "Dish alignment & signal setup",
    "Troubleshooting & maintenance",
    "Home & commercial satellite services",
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Image */}
        <div className="relative h-80 md:h-[28rem] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={IMAGES.SATELLITE_DISH}
            alt="Satellite Services"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Reliable Satellite Services
          </h2>

          <p className="text-gray-600 mt-3 mb-6">
            Satellite installation & alignment services with proper tools, 
            experienced technicians, and guaranteed signal quality.
          </p>

          <ul className="space-y-4">
            {points.map((text, index) => (
              <li key={index} className="flex gap-3">
                <span className="h-6 w-6 flex items-center justify-center text-sm rounded-full bg-purple-600 text-white">
                  ✓
                </span>
                <p className="text-gray-700">{text}</p>
              </li>
            ))}
          </ul>

          <Link
            href="/services/satellite"
            className="inline-block mt-8 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg rounded-lg"
          >
            View Satellite Services
          </Link>
        </div>

      </div>
    </section>
  );
}
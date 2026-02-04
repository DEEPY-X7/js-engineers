"use client";

import Image from "next/image";
import { IMAGES } from "@/config/images";
import Link from "next/link";

export default function ElectricalHighlight() {
  const electricalPoints = [
    "Panel wiring & repair",
    "Home wiring & full house setup",
    "Meter, MCB, earthing installation",
    "AC installation & maintenance",
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Image */}
        <div className="relative h-80 md:h-[28rem] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={IMAGES.ELECTRICAL_PANEL}
            alt="Electrical Services"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Expert Electrical Services
          </h2>

          <p className="text-gray-600 mt-3 mb-6">
            Professional, safe, and reliable electrical solutions for homes, shops,
            and commercial spaces.
          </p>

          {/* Bullet Points */}
          <ul className="space-y-4">
            {electricalPoints.map((text, index) => (
              <li key={index} className="flex gap-3">
                <span className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center text-white text-sm">
                  ✓
                </span>
                <p className="text-gray-700">{text}</p>
              </li>
            ))}
          </ul>

          {/* Button */}
          <Link
            href="/services/electrical"
            className="inline-block mt-8 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded-lg"
          >
            View Electrical Services
          </Link>
        </div>
      </div>
    </section>
  );
}
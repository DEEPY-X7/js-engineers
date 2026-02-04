"use client";

import Image from "next/image";
import { IMAGES } from "@/config/images";
import Link from "next/link";

export default function TelecomOverview() {
  const telecomPoints = [
    "Telecom network maintenance",
    "Wireless network setup",
    "Tower cabling & servicing",
    "Fiber/cable management work",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Image Section */}
        <div className="relative h-80 md:h-[28rem] rounded-xl overflow-hidden shadow-xl">
          <Image
            src={IMAGES.TELECOM_MAINTENANCE}
            alt="Telecom Services"
            fill
            className="object-cover"
          />
        </div>

        {/* Content Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Professional Telecom Solutions
          </h2>

          <p className="text-gray-600 mt-3 mb-6">
            Experienced technicians handling telecom maintenance, wireless networks, 
            and full installation support.
          </p>

          <ul className="space-y-4">
            {telecomPoints.map((text, index) => (
              <li key={index} className="flex gap-3">
                <span className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                  ✓
                </span>
                <p className="text-gray-700">{text}</p>
              </li>
            ))}
          </ul>

          <Link
            href="/services/telecom"
            className="inline-block mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg"
          >
            View Telecom Services
          </Link>
        </div>

      </div>
    </section>
  );
}
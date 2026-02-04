"use client";

import Image from "next/image";
import { IMAGES } from "@/config/images";

export default function WhyChooseUs() {
  const points = [
    {
      title: "Experienced Technicians",
      desc: "Skilled in electrical, telecom & satellite solutions with safe and reliable work quality.",
    },
    {
      title: "Fast & On-Time Service",
      desc: "Prayagraj area me quick response, timely job completion & organized workflow.",
    },
    {
      title: "Affordable & Transparent",
      desc: "Clear pricing, no hidden charges — client focus is our priority.",
    },
    {
      title: "End-to-End Solutions",
      desc: "Installation se leke maintenance tak poora solution — one-stop engineering support.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Image left side */}
        <div className="relative h-80 md:h-[28rem] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={IMAGES.HOME_WHYCHOOSEUS}
            alt="Why Choose Us"
            fill
            className="object-cover"
          />
        </div>

        {/* Content right side */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Choose JS Engineers?
          </h2>
          <p className="text-gray-600 mt-3 mb-8">
            Professional work with a client-first approach — delivering quality service 
            across Electrical, Telecom & Satellite domains.
          </p>

          <ul className="space-y-6">
            {points.map((item, index) => (
              <li key={index} className="flex gap-4">
                <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
"use client";

import Image from "next/image";
import { IMAGES } from "@/config/images";

export default function TestimonialsSection({ items = [] }) {
  return (
    <section className="py-20 relative">

      {/* Background Image */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <Image
          src={IMAGES.TESTIMONIALS_BG}
          alt="Testimonials Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 mt-2 mb-12">
          Trusted by homes, shops & businesses in Prayagraj.
        </p>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {items.length === 0 ? (
            <p className="text-gray-600 col-span-3">
              No testimonials added yet.
            </p>
          ) : (
            items.slice(0, 3).map((review, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow"
              >
                <p className="text-gray-700 italic">
                  “{review.message || review.text || "Great service!"}”
                </p>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {review.name || "Client"}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {review.position || review.service || ""}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
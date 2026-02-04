"use client";

import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/config/images";

export default function GalleryPreview({ images = [] }) {
  // Show max 8 images
  const previewImages = images.slice(0, 8);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
          Our Work Gallery
        </h2>
        <p className="text-center text-gray-600 mt-3 mb-10">
          Electrical, Telecom & Satellite projects completed by our team.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previewImages.length === 0 ? (
            <p className="text-center col-span-4 text-gray-600">
              No gallery images added yet.
            </p>
          ) : (
            previewImages.map((item, idx) => (
              <div
                key={idx}
                className="relative h-32 md:h-40 rounded-lg overflow-hidden shadow-md"
              >
                <Image
                  src={item.image}
                  alt={`gallery-${idx}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))
          )}
        </div>

        {/* Button */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-block mt-10 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg"
          >
            View Full Gallery
          </Link>
        </div>

      </div>
    </section>
  );
}
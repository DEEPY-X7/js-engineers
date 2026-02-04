"use client";

import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/config/images";

export default function AppointmentCTA() {
  return (
    <section className="relative py-20">
      
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={IMAGES.HOME_CTA}
          alt="Book Appointment"
          fill
          className="object-cover brightness-75"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Need an Electrical, Telecom or Satellite Service?
        </h2>

        <p className="text-gray-200 mt-4 mb-8 text-lg">
          Book your appointment now. Our technician will get in touch with you shortly.
        </p>

        <Link
          href="/appointment"
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md"
        >
          Book Appointment
        </Link>
      </div>
    </section>
  );
}
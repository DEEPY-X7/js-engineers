"use client";

import Image from "next/image";
import { IMAGES } from "@/config/images";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center text-white">

      {/* Background Image */}
      <Image
        src={IMAGES.HERO}
        alt="JS Engineers Hero"
        fill
        priority
        className="object-cover brightness-75"
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Professional Electrical, Telecom & Satellite Services
        </h1>

        <p className="mt-5 text-lg md:text-xl text-gray-200">
          Reliable technicians. Quality service. 1+ year trusted work experience in Prayagraj.
        </p>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            href="/appointment"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-medium shadow-md"
          >
            Book Appointment
          </Link>

          <Link
            href="/services"
            className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-lg font-medium border border-white/30"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
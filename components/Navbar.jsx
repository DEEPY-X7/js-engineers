"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          JS Engineers
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/services" className="hover:text-blue-600">Services</Link>
          <Link href="/gallery" className="hover:text-blue-600">Gallery</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/faq" className="hover:text-blue-600">FAQ</Link>

          <Link
            href="/contact"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-inner">
          <div className="flex flex-col px-6 py-4 gap-4 font-medium">

            <Link href="/" onClick={() => setOpen(false)} className="hover:text-blue-600">
              Home
            </Link>

            <Link href="/services" onClick={() => setOpen(false)} className="hover:text-blue-600">
              Services
            </Link>

            <Link href="/gallery" onClick={() => setOpen(false)} className="hover:text-blue-600">
              Gallery
            </Link>

            <Link href="/about" onClick={() => setOpen(false)} className="hover:text-blue-600">
              About
            </Link>

            <Link href="/faq" onClick={() => setOpen(false)} className="hover:text-blue-600">
              FAQ
            </Link>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
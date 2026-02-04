"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What services do you provide?",
    a: "We provide electrical, satellite, telecom, installation, maintenance and repair services for homes, offices and industrial buildings.",
  },
  {
    q: "Do you offer emergency service?",
    a: "Yes, emergency support is available depending on location and technician availability.",
  },
  {
    q: "How can I book an appointment?",
    a: "You can book directly from the appointment page. Just fill the form and our team will contact you.",
  },
  {
    q: "Do you provide warranty?",
    a: "Yes. All installations and repairs include service warranty based on project type.",
  },
  {
    q: "Which areas do you serve?",
    a: "We serve residential, commercial and industrial clients in multiple regions. Contact us for details.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto space-y-12">

      <h1 className="text-4xl font-bold text-center mb-6">Frequently Asked Questions</h1>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border rounded shadow bg-white">
            <button
              onClick={() => toggle(i)}
              className="w-full text-left px-4 py-3 font-semibold flex justify-between items-center"
            >
              {faq.q}
              <span>{openIndex === i ? "-" : "+"}</span>
            </button>

            {openIndex === i && (
              <div className="px-4 py-3 text-gray-700 border-t bg-gray-50">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
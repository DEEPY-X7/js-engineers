export const metadata = {
  title: "About Us",
  description: "Learn more about our engineering company, experience, values and mission.",
};

export default function AboutPage() {
  return (
    <div className="px-6 py-12 space-y-12 max-w-4xl mx-auto">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>

      {/* INTRO */}
      <section className="space-y-4 text-gray-700 leading-relaxed">
        <p>
          We are a professional engineering service provider offering electrical, telecom, satellite,
          and installation solutions for residential, commercial and industrial clients.  
        </p>
        <p>
          With years of experience, we focus on delivering high-quality, reliable and affordable 
          services with a strong commitment to customer satisfaction.
        </p>
      </section>

      {/* MISSION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to provide world-class engineering solutions with precision, safety,
          and professionalism. We aim to build long-term trust by delivering consistent service
          quality and quick response to customer needs.
        </p>
      </section>

      {/* WHY CHOOSE US */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Why Choose Us</h2>

        <ul className="space-y-3 text-gray-700 leading-relaxed">
          <li>• Skilled and certified technicians</li>
          <li>• Fast, safe and reliable service</li>
          <li>• Affordable pricing with guaranteed quality</li>
          <li>• On-time delivery and responsive support</li>
          <li>• Modern tools, methods and engineering standards</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center mt-12">
        <a
          href="/contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
        >
          Contact Us
        </a>
      </section>

    </div>
  );
}
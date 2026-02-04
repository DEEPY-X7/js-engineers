export const metadata = {
  title: "Satellite Services",
  description: "Professional satellite dish installation, alignment & signal optimization services.",
};

export default function SatelliteServicesPage() {
  return (
    <div className="px-6 py-12 space-y-12">

      {/* HERO */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Satellite Services</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          High-quality satellite installation, dish alignment, cable routing, and signal optimization
          services for homes, commercial buildings, hotels, and offices.
        </p>
      </section>

      {/* DETAILS */}
      <section className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">Our Satellite Solutions</h2>

        <ul className="space-y-3 text-gray-700">
          <li>• New satellite dish installation</li>
          <li>• Precise dish alignment for best signal</li>
          <li>• HD/4K set-top box setup</li>
          <li>• Multi-TV connectivity configuration</li>
          <li>• Cable routing & wall mounting</li>
          <li>• Signal quality improvement & troubleshooting</li>
          <li>• LNB, connectors & wiring replacement</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center mt-12">
        <a
          href="/contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
        >
          Book Satellite Service
        </a>
      </section>

    </div>
  );
}
import ServicesList from "@/components/services/ServicesList";

export const revalidate = 0; // Always fresh

export const metadata = {
  title: "Telecom Services",
  description:
    "Professional telecom networking, fiber installation, LAN setup & maintenance services.",
};

// ------- FETCH TELECOM SERVICES -------
async function fetchTelecomServices() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services?category=telecom`,
      { cache: "no-store" }
    );

    const data = await res.json();
    return data.success ? data.services : [];
  } catch (error) {
    console.error("Failed to fetch telecom services:", error);
    return [];
  }
}

// ------- PAGE -------
export default async function TelecomServicesPage() {
  const services = await fetchTelecomServices();

  return (
    <div className="px-6 py-12 space-y-12">

      {/* HERO */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Telecom Services</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We provide end-to-end telecom solutions including fiber installation, networking,
          communication systems setup, maintenance, and troubleshooting for residential,
          commercial, and industrial clients.
        </p>
      </section>

      {/* DYNAMIC SERVICES LIST */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Available Telecom Services</h2>

        {services.length === 0 ? (
          <p className="text-gray-600">No telecom services available right now.</p>
        ) : (
          <ServicesList services={services} />
        )}
      </section>

      {/* STATIC FEATURES LIST */}
      <section className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">What We Offer</h2>

        <ul className="space-y-3 text-gray-700">
          <li>• Fiber optic cable installation & termination</li>
          <li>• LAN, WAN & structured cabling solutions</li>
          <li>• WiFi setup & range optimization</li>
          <li>• CCTV / IP camera networking</li>
          <li>• Router, switches & network device configuration</li>
          <li>• Telecom communication systems setup</li>
          <li>• Network health check & troubleshooting</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center mt-12">
        <a
          href="/contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
        >
          Book Telecom Service
        </a>
      </section>

    </div>
  );
}
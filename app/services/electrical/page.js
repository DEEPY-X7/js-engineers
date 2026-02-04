import ServicesList from "@/components/services/ServicesList";

export const revalidate = 0;

export const metadata = {
  title: "Electrical Services",
  description:
    "Professional electrical installation, repair, and maintenance services.",
};

// -------- FETCH ELECTRICAL SERVICES --------
async function fetchElectricalServices() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services?category=electrical`,
      { cache: "no-store" }
    );

    const data = await res.json();
    return data.success ? data.services : [];
  } catch (error) {
    console.error("Failed to fetch electrical services:", error);
    return [];
  }
}

// -------- PAGE --------
export default async function ElectricalServicesPage() {
  const services = await fetchElectricalServices();

  return (
    <div className="px-6 py-12 space-y-12">

      {/* HERO */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Electrical Services</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We offer complete electrical solutions including wiring, installation,
          maintenance, and repairs for homes, offices, and industrial spaces.
        </p>
      </section>

      {/* DYNAMIC SERVICES */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Available Electrical Services</h2>

        {services.length === 0 ? (
          <p className="text-gray-600">No electrical services available right now.</p>
        ) : (
          <ServicesList services={services} />
        )}
      </section>

      {/* STATIC DETAILS */}
      <section className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">What We Provide</h2>

        <ul className="space-y-3 text-gray-700">
          <li>• Full house electrical wiring</li>
          <li>• Commercial wiring and maintenance</li>
          <li>• Electrical installations (lights, fans, appliances, etc.)</li>
          <li>• Fuse, MCB, and switchboard repair</li>
          <li>• Power backup & inverter setup</li>
          <li>• Short circuit & overload fixing</li>
          <li>• Industrial electrical services</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center mt-12">
        <a
          href="/contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
        >
          Contact for Electrical Work
        </a>
      </section>
    </div>
  );
}
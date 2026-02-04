import ServicesList from "@/components/services/ServicesList";

export const revalidate = 0; // Always fresh SSR

// -------- FETCH ALL SERVICES --------
async function fetchServices() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services`,
      { cache: "no-store" }
    );

    const data = await res.json();
    return data.success ? data.services : [];
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

// -------- PAGE --------
export default async function ServicesPage() {
  const services = await fetchServices();

  return (
    <div className="px-6 py-12 space-y-12">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>

      {/* DATA RENDERING */}
      {services.length === 0 ? (
        <p className="text-center text-gray-600">No services available.</p>
      ) : (
        <ServicesList services={services} />
      )}

    </div>
  );
}
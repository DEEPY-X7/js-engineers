import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/config/images";

// -------- FETCH HOME PAGE DATA ----------
const FALLBACK_SERVICES = [
  {
    title: "Electrical Systems",
    description: "Safe, compliant installations, upgrades, and maintenance.",
  },
  {
    title: "Telecom Infrastructure",
    description: "Structured cabling, fiber, and network build-outs.",
  },
  {
    title: "Satellite & AV",
    description: "Satellite installation, alignment, and support.",
  },
];

const FALLBACK_GALLERY = [
  { image: IMAGES.WORK_PANEL, title: "Panel installation" },
  { image: IMAGES.WORK_TELECOM, title: "Telecom site build" },
  { image: IMAGES.WORK_SAT, title: "Satellite installation" },
];

const FALLBACK_TESTIMONIALS = [
  {
    name: "Operations Lead",
    message: "Clear communication and quality workmanship throughout.",
  },
  {
    name: "Facility Manager",
    message: "Fast response and professional follow-through on every visit.",
  },
];

async function safeFetch(path) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    const response = await fetch(`${base}${path}`, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    return null;
  }
}

async function getHomeData() {
  const [servicesRes, galleryRes, testiRes] = await Promise.allSettled([
    safeFetch("/api/services"),
    safeFetch("/api/gallery"),
    safeFetch("/api/testimonials"),
  ]);

  const services =
    servicesRes.status === "fulfilled"
      ? servicesRes.value?.data?.slice(0, 3) || []
      : [];
  const gallery =
    galleryRes.status === "fulfilled"
      ? galleryRes.value?.data?.slice(0, 3) || []
      : [];
  const testimonials =
    testiRes.status === "fulfilled"
      ? testiRes.value?.data?.slice(0, 2) || []
      : [];

  return {
    services: services.length ? services : FALLBACK_SERVICES,
    gallery: gallery.length ? gallery : FALLBACK_GALLERY,
    testimonials: testimonials.length ? testimonials : FALLBACK_TESTIMONIALS,
  };
}

export default async function HomePage() {
  const { services, gallery, testimonials } = await getHomeData();

  return (
    <div className="space-y-20">

      {/* ---------------- HERO ---------------- */}
      <section className="bg-blue-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Engineering Solutions</h1>
            <p className="text-lg mb-6">
              Professional electrical, satellite, telecom, and engineering services.
            </p>

            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-semibold"
            >
              Contact Us
            </Link>
          </div>
          <div className="relative w-full h-64 sm:h-72 lg:h-80">
            <Image
              src={IMAGES.HERO}
              alt="Engineering team on site"
              fill
              className="object-cover rounded-xl shadow-lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item) => (
              <div key={item._id || item.id} className="bg-white shadow rounded p-5 border hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>

                <Link href="/services" className="text-blue-600 font-medium hover:underline">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- GALLERY ---------------- */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Work</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {gallery.map((img) => (
              <div key={img._id || img.id || img.image} className="rounded overflow-hidden shadow hover:shadow-lg transition">
                <div className="relative w-full h-48">
                  <Image
                    src={img.image}
                    alt={img.title || "Gallery item"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>

          <Link href="/gallery" className="block mt-6 text-blue-600 font-medium hover:underline">
            View Full Gallery →
          </Link>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="px-6 bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Testimonials</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((item) => (
              <div key={item._id || item.id} className="bg-white shadow rounded p-5 border">
                <p className="text-gray-700 italic mb-3">"{item.message}"</p>
                <h4 className="font-semibold text-blue-600">{item.name}</h4>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/testimonials" className="text-blue-600 font-medium hover:underline">
              View More Testimonials →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

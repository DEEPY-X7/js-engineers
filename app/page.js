import Link from "next/link";
import { IMAGES } from "@/config/images";

export const metadata = {
  title: "Home",
  description:
    "Trusted electrical, telecom, and satellite engineering services for homes and businesses.",
};

// -------- FETCH HOME PAGE DATA ----------
async function getHomeData() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "";

    const [servicesRes, galleryRes, testiRes] = await Promise.all([
      fetch(`${base}/api/services`, { cache: "no-store" }),
      fetch(`${base}/api/gallery`, { cache: "no-store" }),
      fetch(`${base}/api/testimonials`, { cache: "no-store" }),
    ]);

    const services = await servicesRes.json();
    const gallery = await galleryRes.json();
    const testimonials = await testiRes.json();

    return {
      services: services.data?.slice(0, 3) || [],
      gallery: gallery.data?.slice(0, 3) || [],
      testimonials: testimonials.data?.slice(0, 2) || [],
    };
  } catch (err) {
    return { services: [], gallery: [], testimonials: [] };
  }
}

export default async function HomePage() {
  const { services, gallery, testimonials } = await getHomeData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "JS Engineers",
    url: siteUrl,
    image: IMAGES.HERO,
    description:
      "Professional electrical, satellite, and telecom engineering services.",
    areaServed: "IN",
    serviceType: [
      "Electrical Services",
      "Telecom Solutions",
      "Satellite Installation",
    ],
  };

  return (
    <div className="space-y-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <img
          src={IMAGES.HERO}
          alt="Engineering team at work"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/70" />
        <div className="relative z-10 px-6 py-24 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Engineering Solutions</h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Professional electrical, satellite, telecom, and engineering services delivered by
            certified experts across residential and commercial projects.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-blue-700 px-6 py-3 rounded-md font-semibold shadow"
            >
              Contact Us
            </Link>
            <Link
              href="/services"
              className="border border-white px-6 py-3 rounded-md font-semibold"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- HIGHLIGHTS ---------------- */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Electrical Services",
              image: IMAGES.HOME_ELECTRICAL,
              description: "Safe wiring, panels, and maintenance with certified technicians.",
            },
            {
              title: "Telecom Solutions",
              image: IMAGES.HOME_TELECOM,
              description: "Modern networking, fiber, and wireless installation at scale.",
            },
            {
              title: "Satellite & Security",
              image: IMAGES.HOME_SATELLITE,
              description: "Satellite setup, signal troubleshooting, and secure monitoring.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl shadow border overflow-hidden">
              <img src={item.image} alt={item.title} className="h-44 w-full object-cover" />
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
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

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Why Choose JS Engineers</h2>
            <p className="text-gray-600">
              We deliver end-to-end engineering support with transparent pricing, certified
              technicians, and a commitment to safety and quality across every project.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• 10+ years of field expertise</li>
              <li>• Licensed and insured professionals</li>
              <li>• 24/7 emergency support</li>
              <li>• Modern tooling and safety-first processes</li>
            </ul>
            <Link href="/about" className="text-blue-600 font-medium hover:underline">
              Learn about our team →
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={IMAGES.HOME_WHY}
              alt="Engineers collaborating"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---------------- GALLERY ---------------- */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Work</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {gallery.map((img) => (
              <div key={img._id || img.id} className="rounded overflow-hidden shadow hover:shadow-lg transition">
                <img
                  src={img.image}
                  alt="Gallery item"
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
            {!gallery.length && (
              <div className="rounded overflow-hidden shadow hover:shadow-lg transition">
                <img
                  src={IMAGES.WORK_TELECOM}
                  alt="Telecom site installation"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </div>

          <Link href="/gallery" className="block mt-6 text-blue-600 font-medium hover:underline">
            View Full Gallery →
          </Link>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section
        className="px-6 py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(249,250,251,0.95), rgba(249,250,251,0.95)), url(${IMAGES.TESTIMONIAL_BG})`,
          backgroundSize: "cover",
        }}
      >
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

      {/* ---------------- CTA ---------------- */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto bg-blue-600 text-white rounded-2xl overflow-hidden shadow-lg grid md:grid-cols-2">
          <div className="p-10 space-y-4">
            <h3 className="text-3xl font-bold">Need expert engineering support?</h3>
            <p className="text-blue-100">
              Our team is ready to assist with design, installation, and ongoing maintenance.
            </p>
            <Link
              href="/appointment"
              className="inline-block bg-white text-blue-700 px-5 py-3 rounded-md font-semibold"
            >
              Book an Appointment
            </Link>
          </div>
          <img
            src={IMAGES.HOME_CTA}
            alt="Engineering consultation"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

    </div>
  );
}

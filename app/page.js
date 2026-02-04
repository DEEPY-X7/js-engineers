import Link from "next/link";
import { IMAGES } from "@/config/images";

// -------- FETCH HOME PAGE DATA ----------
async function getHomeData() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL;

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

  return (
    <div className="space-y-20">

      {/* ---------------- HERO ---------------- */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Engineering Solutions</h1>
        <p className="text-lg mb-6">
          Professional electrical, satellite, telecom, and engineering services.
        </p>

        <Link
          href="/contact"
          className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold"
        >
          Contact Us
        </Link>
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
              <div key={img._id || img.id} className="rounded overflow-hidden shadow hover:shadow-lg transition">
                <img
                  src={img.image}
                  alt="Gallery item"
                  className="w-full h-48 object-cover"
                />
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
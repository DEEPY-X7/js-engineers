export default function ServicesOverview({ services = [] }) {
  const electrical = services.filter(s => s.category === "electrical").slice(0, 3);
  const telecom = services.filter(s => s.category === "telecom").slice(0, 3);
  const satellite = services.filter(s => s.category === "satellite").slice(0, 3);

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 space-y-10">

      <h2 className="text-3xl font-bold text-center">Our Core Services</h2>

      <div className="grid md:grid-cols-3 gap-8">

        {[ 
          { title: "Electrical Services", list: electrical, link: "/services/electrical" },
          { title: "Telecom Services", list: telecom, link: "/services/telecom" },
          { title: "Satellite Services", list: satellite, link: "/services/satellite" },
        ].map((box, idx) => (
          <div key={idx} className="bg-white shadow-lg p-6 rounded-xl border">
            <h3 className="text-xl font-bold mb-4">{box.title}</h3>

            {box.list.length === 0 ? (
              <p className="text-gray-500 text-sm">No services added yet.</p>
            ) : (
              <ul className="space-y-2">
                {box.list.map((s) => (
                  <li key={s._id} className="text-gray-700">
                    • {s.title}
                  </li>
                ))}
              </ul>
            )}

            <a
              href={box.link}
              className="inline-block mt-4 text-blue-600 font-semibold"
            >
              View More →
            </a>
          </div>
        ))}

      </div>

    </section>
  );
}
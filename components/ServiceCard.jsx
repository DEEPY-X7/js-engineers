export default function ServiceCard({ title, description, image, fallbackImage }) {
  const displayImage = image || fallbackImage;
  return (
    <div className="bg-white shadow rounded-lg p-6 border hover:shadow-lg transition">

      {/* Image (optional) */}
      {displayImage && (
        <img
          src={displayImage}
          alt={title}
          className="w-full h-40 object-cover rounded mb-4 border"
        />
      )}

      {/* Title */}
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-700 mb-4">{description}</p>

      {/* CTA */}
      <a
        href="/services"
        className="text-blue-600 font-medium hover:underline"
      >
        Learn More →
      </a>
    </div>
  );
}

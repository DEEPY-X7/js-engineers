export default function TestimonialCard({ name, message, rating }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 border hover:shadow-lg transition">

      {/* Rating Stars */}
      {rating && (
        <div className="flex text-yellow-500 mb-3">
          {Array.from({ length: rating }).map((_, idx) => (
            <span key={idx}>★</span>
          ))}
        </div>
      )}

      {/* Message */}
      <p className="text-gray-700 italic mb-4">“{message}”</p>

      {/* Name */}
      <h4 className="font-semibold text-gray-900">{name}</h4>
    </div>
  );
}
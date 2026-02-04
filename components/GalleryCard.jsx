export default function GalleryCard({ image, caption }) {
  return (
    <div className="rounded shadow border overflow-hidden hover:shadow-lg transition">

      {/* Image */}
      <img
        src={image}
        alt={caption || "Gallery Image"}
        className="w-full h-56 object-cover"
      />

      {/* Caption */}
      {caption && (
        <p className="p-3 text-gray-700 bg-gray-50 border-t">
          {caption}
        </p>
      )}
    </div>
  );
}
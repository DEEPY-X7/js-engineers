export default function GalleryItem({ src, alt }) {
  return (
    <div className="rounded overflow-hidden shadow">
      <img src={src} alt={alt || "gallery"} className="w-full h-48 object-cover" />
    </div>
  );
}

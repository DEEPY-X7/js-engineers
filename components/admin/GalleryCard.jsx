"use client";

export default function GalleryCard({ item, refresh }) {
  const handleDelete = async () => {
    if (!confirm("Delete this image?")) return;

    try {
      const res = await fetch("/api/gallery/" + item._id, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Image deleted!");
        refresh();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="border rounded-xl overflow-hidden shadow bg-white">
      <img
        src={item.imageUrl}
        alt="Gallery"
        className="w-full h-48 object-cover"
      />

      <div className="p-3 flex justify-between items-center">
        <span className="text-gray-600 text-sm">{item._id}</span>

        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
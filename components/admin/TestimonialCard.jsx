"use client";

export default function TestimonialCard({ item, refresh }) {
  const handleDelete = async () => {
    if (!confirm("Delete this testimonial?")) return;

    try {
      const res = await fetch("/api/testimonials/" + item._id, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        alert("Testimonial deleted!");
        refresh();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="bg-white border rounded-xl shadow p-5">
      <p className="text-gray-800 italic mb-4">“{item.message}”</p>

      <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>

      {item.role && <p className="text-gray-500 text-sm">{item.role}</p>}

      <button
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
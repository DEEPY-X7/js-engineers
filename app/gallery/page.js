// Fetch gallery items (server-side)
async function getGallery() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/gallery`, {
      cache: "no-store",
    });

    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    return [];
  }
}

export const metadata = {
  title: "Gallery",
  description: "View our completed projects and engineering work gallery.",
};

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <div className="px-6 py-12 space-y-12">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-center mb-8">Our Gallery</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-600">No images available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((img) => (
            <div key={img.id} className="rounded shadow overflow-hidden border">
              <img
                src={img.image}
                alt={img.caption || "Gallery Image"}
                className="w-full h-56 object-cover"
              />

              {img.caption && (
                <p className="p-3 text-gray-700 border-t bg-gray-50">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
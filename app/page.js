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
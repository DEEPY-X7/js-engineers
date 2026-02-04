'use client';

import ServiceCard from '@/components/ServiceCard';
import { IMAGES } from '@/config/images';

export default function ServicesList({ services }) {
  if (!services || services.length === 0) {
    return <p className="text-gray-600">No services available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ServiceCard
          key={service._id}
          title={service.title}
          description={service.description}
          image={service.image}
          fallbackImage={[
            IMAGES.E_PANEL,
            IMAGES.T_MAINTENANCE,
            IMAGES.S_DISH,
          ][index % 3]}
        />
      ))}
    </div>
  );
}

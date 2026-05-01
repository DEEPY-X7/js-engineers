import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import MobileBottomNav from '@/components/ui/MobileBottomNav';

export const metadata = {
  title: 'J. S. Engineers & Consultant | Electrical, Telecom & Satellite Services in Prayagraj',
  description: 'J. S. Engineers & Consultant provides professional Electrical, Telecom, and Satellite engineering services in Prayagraj. MSME registered, GST compliant. Call +91 7042099984.',
  keywords: 'Electrical services Prayagraj, Telecom services Prayagraj, Satellite installation Prayagraj, Engineering consultant Prayagraj',
  authors: [{ name: 'J. S. Engineers & Consultant' }],
  openGraph: {
    title: 'J. S. Engineers & Consultant',
    description: 'Professional Electrical, Telecom & Satellite Engineering Services in Prayagraj, UP',
    type: 'website',
    url: 'https://jsengineers.in',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
          rel="stylesheet"
        />
        {/* Local Business Schema — helps Google rank for Prayagraj searches */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "J. S. Engineers & Consultant",
              "image": "https://jsengineers.in/og-image.jpg",
              "url": "https://jsengineers.in",
              "telephone": "+917042099984",
              "email": "js.engineeringconsultant77@gmail.com",
              "priceRange": "₹₹",
              "description": "Professional Electrical, Telecom and Satellite engineering services in Prayagraj, UP. MSME registered, GST compliant.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "77/12A/2B, Newada Ashok Nagar",
                "addressLocality": "Prayagraj",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "211001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 25.4358,
                "longitude": 81.8463
              },
              "openingHoursSpecification": [
                { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "09:00", "closes": "18:00" }
              ],
              "sameAs": ["https://wa.me/917042099984"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Engineering Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Electrical Services Prayagraj" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Telecom Services Prayagraj" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Satellite Installation Prayagraj" } }
                ]
              },
              "identifier": [
                { "@type": "PropertyValue", "name": "MSME (Udyam)", "value": "UDYAM-UP-03-0110637" },
                { "@type": "PropertyValue", "name": "GST", "value": "09AUUPS5965Q1Z1" }
              ]
            })
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileBottomNav />
      </body>
    </html>
  );
}

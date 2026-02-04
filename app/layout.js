import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGES } from "@/config/images";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JS Engineers",
    template: "%s | JS Engineers",
  },
  description: "Professional electrical, satellite & telecom engineering services.",
  keywords: [
    "engineering services",
    "electrical services",
    "telecom solutions",
    "satellite installation",
    "maintenance",
    "JS Engineers",
  ],
  openGraph: {
    title: "JS Engineers",
    description: "Professional electrical, satellite & telecom engineering services.",
    url: siteUrl,
    siteName: "JS Engineers",
    images: [
      {
        url: IMAGES.HERO,
        width: 1200,
        height: 630,
        alt: "JS Engineers hero banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JS Engineers",
    description: "Professional electrical, satellite & telecom engineering services.",
    images: [IMAGES.HERO],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}

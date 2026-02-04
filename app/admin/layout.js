// ------------------------------------------------------
// Admin Layout (Protected Area)
// Protects all /admin routes using JWT verification
// ------------------------------------------------------

import "../globals.css";import { cookies } from "next/headers";import { verifyJwt } from "@/utils/security";
import { redirect } from "next/navigation";

// HTML Skeleton for Admin Panel
export const metadata = {
  title: "Admin Panel",
  description: "Manage services, gallery, testimonials, messages & appointments",
};

export default async function AdminLayout({ children }) {
  // --------- AUTH PROTECTION ---------
  try {
    const token = cookies().get("admin_token")?.value;

    if (!token) {
      redirect("/admin/login");
    }

    const valid = await verifyJwt(token);
    if (!valid) {
      redirect("/admin/login");
    }
  } catch (err) {
    redirect("/admin/login");
  }

  // --------- RENDER LAYOUT ---------
  return (
    <html lang="en">
      <body className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Admin Panel</h2>

          <nav className="flex flex-col gap-3 text-sm">
            <a href="/admin" className="hover:text-blue-600">Dashboard</a>
            <a href="/admin/services" className="hover:text-blue-600">Services</a>
            <a href="/admin/gallery" className="hover:text-blue-600">Gallery</a>
            <a href="/admin/testimonials" className="hover:text-blue-600">Testimonials</a>
            <a href="/admin/messages" className="hover:text-blue-600">Messages</a>
            <a href="/admin/appointments" className="hover:text-blue-600">Appointments</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
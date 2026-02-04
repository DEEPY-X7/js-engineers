// /components/AdminSidebar.jsx

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white h-screen shadow-lg p-4">
      <ul className="space-y-2">
        <li>
          <a href="/admin/services" className="block py-2 px-3 hover:bg-gray-200 rounded">
            Services
          </a>
        </li>

        <li>
          <a href="/admin/gallery" className="block py-2 px-3 hover:bg-gray-200 rounded">
            Gallery
          </a>
        </li>

        <li>
          <a href="/admin/testimonials" className="block py-2 px-3 hover:bg-gray-200 rounded">
            Testimonials
          </a>
        </li>

        <li>
          <a href="/admin/about" className="block py-2 px-3 hover:bg-gray-200 rounded">
            About
          </a>
        </li>

        <li>
          <a href="/admin/appointments" className="block py-2 px-3 hover:bg-gray-200 rounded">
            Appointments
          </a>
        </li>

        <li>
          <a href="/admin/contact-messages" className="block py-2 px-3 hover:bg-gray-200 rounded">
            Contact Messages
          </a>
        </li>
      </ul>
    </aside>
  );
}

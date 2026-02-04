"use client";

import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";
    router.push("/login");
  };

  return (
    <header className="bg-white border-b shadow-sm px-8 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">
        Admin Dashboard
      </h2>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
}

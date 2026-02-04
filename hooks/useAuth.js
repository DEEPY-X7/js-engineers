"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * very small auth helper for client components.
 * It checks token cookie existence by calling /api/auth (if you create it),
 * or you can use server-side getUserFromRequest.
 */
export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch("/api/auth/check"); // optional endpoint, safe to 404
        if (!res.ok) {
          setUser(null);
        } else {
          const json = await res.json();
          if (json?.success && json.data?.user) setUser(json.data.user);
        }
      } catch (err) {
        setUser(null);
      }
      setLoading(false);
    }
    check();
  }, []);

  const logout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";
    setUser(null);
    router.push("/login");
  };

  return { user, loading, logout };
}

"use client";

import { useEffect, useState } from "react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all messages
  async function loadMessages() {
    try {
      const res = await fetch("/contact-massages"); 
      const data = await res.json();

      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
    setLoading(false);
  }

  // Delete message
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/contact-massages`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages(messages.filter((msg) => msg.id !== id));
      } else {
        alert("Error deleting message");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      {loading ? (
        <p>Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-600">No messages found.</p>
      ) : (
        <div className="bg-white shadow rounded p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Message</th>
                <th className="p-2 w-32">Actions</th>
              </tr>
            </thead>

            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-b">
                  <td className="p-2">{msg.name}</td>
                  <td className="p-2">{msg.email}</td>
                  <td className="p-2">{msg.phone || "-"}</td>
                  <td className="p-2">{msg.message}</td>

                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
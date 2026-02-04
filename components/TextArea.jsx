import React from "react";

export default function TextArea(props) {
  return (
    <textarea
      className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
      {...props}
    />
  );
}

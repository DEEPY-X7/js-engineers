import React from 'react';

export default function AdminLayout({ children, title }) {
  return (
    <div className="admin-layout">
      {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}

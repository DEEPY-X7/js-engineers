import React from 'react';

const Table = ({ columns, data, onDelete, onEdit }) => {
  if (data.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
              <td>
                <button onClick={() => onEdit(item._id)}>Edit</button>
                <button onClick={() => onDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
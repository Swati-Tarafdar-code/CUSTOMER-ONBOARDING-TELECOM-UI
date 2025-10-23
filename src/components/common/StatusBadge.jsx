// src/components/common/StatusBadge.jsx
import React from 'react';

// Define status colors for scalability
const statusClasses = {
  PENDING_REVIEW: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  UNKNOWN: "bg-gray-100 text-gray-800",
  // For overall user status in admin view
  INCOMPLETE: "bg-blue-100 text-blue-800", 
};

function StatusBadge({ status }) {
  const normalizedStatus = status ? status.toUpperCase().replace(/\s/g, '_') : 'UNKNOWN';
  const className = statusClasses[normalizedStatus] || statusClasses.UNKNOWN;

  return (
    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${className}`}>
      {normalizedStatus.replace(/_/g, ' ')}
    </span>
  );
}

export default StatusBadge;
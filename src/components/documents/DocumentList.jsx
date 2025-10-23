// src/components/documents/DocumentList.jsx
import React from 'react';
import StatusBadge from '../common/StatusBadge';

function DocumentList({ documents }) {
  if (documents.length === 0) {
    return (
      <div className="p-6 border rounded-lg bg-gray-50 text-center">
        <p className="text-lg text-gray-600">You have not uploaded any documents yet. Please start your onboarding!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <h3 className="text-2xl font-semibold mb-4">Uploaded Documents</h3>
      <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded On</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {documents.map((doc) => (
            <tr key={doc.document_id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800">
                <a href={doc.file_path} target="_blank" rel="noopener noreferrer">{doc.file_name}</a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {doc.document_type || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={doc.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(doc.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DocumentList;
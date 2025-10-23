// src/pages/DocumentReviewPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function DocumentReviewPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      // Endpoint: router.get('/:userId/details', protect, adminOnly, getUserDetails);
      const res = await api.get(`/users/${userId}/details`); 
      setUserDetails(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch user details", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);


  // 1. Action: Review a single document
  const handleDocumentReview = async (documentId, status) => {
    try {
      // Endpoint: router.put('/:documentId/review', protect, reviewDocument);
      await api.put(`/documents/${documentId}/review`, { status });
      alert(`Document ${documentId} ${status} successfully.`);
      fetchUserDetails(); // Refresh data
    } catch (err) {
      alert('Document review failed.');
    }
  };

  // 2. Action: Update overall user status
  const handleUserStatusUpdate = async (status) => {
    if (!window.confirm(`Are you sure you want to set ALL documents for user ${userId} to ${status}?`)) return;
    try {
      // Endpoint: router.put('/:userId/status', protect, adminOnly, updateUserStatus); 
      await api.put(`/users/${userId}/status`, { status });
      alert(`User status updated to ${status}.`);
      navigate('/admin'); // Go back to the pending list
    } catch (err) {
      alert('User status update failed.');
    }
  };
  
  if (loading) return <div>Loading user details...</div>;
  if (!userDetails) return <div>User not found.</div>;

  return (
    <div className="space-y-6">
      <h2>Review User: {userDetails.username} ({userDetails.email})</h2>
      
      {/* Overall User Action Panel */}
      <div className="p-4 border rounded-lg flex space-x-4 bg-green-50">
        <button 
          onClick={() => handleUserStatusUpdate('APPROVED')}
          className="bg-green-500 text-white p-2 rounded"
        >
          Final APPROVE User
        </button>
        <button 
          onClick={() => handleUserStatusUpdate('REJECTED')}
          className="bg-red-500 text-white p-2 rounded"
        >
          Final REJECT User
        </button>
      </div>

      {/* Documents List */}
      <h3 className="text-xl font-semibold">Documents ({userDetails.documents.length})</h3>
      <div className="space-y-4">
        {userDetails.documents.map((doc) => (
          <div key={doc.document_id} className="border p-4 rounded-lg">
            <p><strong>Type:</strong> {doc.document_type}</p>
            <p><strong>Status:</strong> {doc.status}</p>
            <p><strong>File Path:</strong> <a href={doc.file_path} target="_blank" rel="noopener noreferrer">View Document</a></p>
            
            <h4 className="font-medium mt-2">Extracted Data:</h4>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
              {doc.extracted_data ? JSON.stringify(JSON.parse(doc.extracted_data), null, 2) : 'No data extracted yet.'}
            </pre>

            <div className="mt-4 space-x-2">
              <button onClick={() => handleDocumentReview(doc.document_id, 'APPROVED')} className="bg-blue-500 text-white p-1">
                Approve Doc
              </button>
              <button onClick={() => handleDocumentReview(doc.document_id, 'REJECTED')} className="bg-yellow-500 text-white p-1">
                Reject Doc
              </button>
              {/* Optional: Trigger manual OCR/Extraction */}
              <button onClick={async () => { 
                await api.post(`/data-extraction/${doc.document_id}/ocr`);
                fetchUserDetails(); 
              }} className="bg-purple-500 text-white p-1">
                Run OCR
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentReviewPage;
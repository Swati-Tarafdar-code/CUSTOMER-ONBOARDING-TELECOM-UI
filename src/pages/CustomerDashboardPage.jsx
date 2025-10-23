// src/pages/CustomerDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import DocumentUploadForm from '../components/documents/DocumentUploadForm';
import DocumentList from '../components/documents/DocumentList';
import api from '../services/api';

function CustomerDashboardPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ❗ NOTE: A 'GET /api/documents' route is required for the backend to list documents
  // Assuming a future route: router.get('/', protect, getMyDocuments); 
  const fetchDocuments = async () => {
    try {
      // Placeholder for fetching customer's documents
      const res = await api.get('/documents/my-list'); 
      setDocuments(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch documents", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <h1>Customer Dashboard</h1>
      <div className="p-4 border rounded-lg bg-yellow-50">
        <p className="font-bold">Onboarding Status: {documents.length > 0 ? 'Pending Review' : 'Awaiting Documents'}</p>
      </div>

      <DocumentUploadForm onUploadSuccess={fetchDocuments} />
      
      <DocumentList documents={documents} />
    </div>
  );
}

export default CustomerDashboardPage;


// src/components/documents/DocumentUploadForm.jsx
// Handles POST /api/documents/upload
function DocumentUploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('document', file); // 'document' must match the key used in your multer middleware

    setUploading(true);
    try {
      // Endpoint: router.post('/upload', protect, uploadService, uploadDocument);
      await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Document uploaded successfully!');
      setFile(null);
      onUploadSuccess(); // Refresh the list
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.error || 'Server error'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Upload New Document</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
          disabled={uploading}
          required 
        />
        <button type="submit" disabled={!file || uploading}>
          {uploading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>
    </div>
  );
}
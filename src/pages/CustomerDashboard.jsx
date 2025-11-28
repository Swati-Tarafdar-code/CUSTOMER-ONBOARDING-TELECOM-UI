// src/pages/CustomerDashboard.jsx


import React, { useState } from 'react';
import UploadDocument from './customer/UploadDocument';
import { runOcr } from '../api/ocr';
import '../CustomerDashboard.css';

const CustomerDashboard = () => {
  const [uploaded, setUploaded] = useState(null); // expect { id, fileUrl, uploadedAt, ... }
  const [message, setMessage] = useState('');
  const [ocrLoading, setOcrLoading] = useState(false);

  const handleUploadSuccess = (data) => {
    // data shape depends on backend; adjust keys if needed
    setUploaded(data);
    setMessage('Upload successful');
  };

  const handleProceed = async () => {
    setMessage('');
    if (!uploaded?.id && !uploaded?.documentId) {
      setMessage('Please upload a document first.');
      return;
    }
    const documentId = uploaded.id || uploaded.documentId;
    setOcrLoading(true);
    try {
      await runOcr(documentId);
      setMessage('Request raised');
    } catch (err) {
      console.error('OCR error', err);
      setMessage(err?.response?.data?.message || err.message || 'OCR request failed');
    } finally {
      setOcrLoading(false);
    }
  };

  return (
    <div className="customer-dashboard">
      <div className="cards">
        <div className="card upload-card">
          <h3>Document Upload</h3>
          <p className="muted">Effortlessly upload your required documents for verification.</p>

          <UploadDocument onUploadSuccess={handleUploadSuccess} />

          <div className="actions-row">
            <button className="btn btn-primary" onClick={handleProceed} disabled={ocrLoading || !uploaded}>
              {ocrLoading ? 'Processing…' : 'Proceed'}
            </button>
            <div className="status-message">{message}</div>
          </div>
        </div>

        <div className="card activity-card">
          <h3>Recent Activity</h3>
          <p className="muted">Latest updates on your document submissions.</p>

          <div className="activity-item">
            <div className="label">Status</div>
            <div className="value">{uploaded ? (uploaded.status || 'Pending') : 'No documents'}</div>
          </div>

          <div className="divider" />

          <div className="activity-item">
            <div className="label">Last Uploaded</div>
            <div className="value">{uploaded?.uploadedAt ? uploaded.uploadedAt.slice(0,10) : '-'}</div>
          </div>

          {uploaded?.fileUrl && (
            <>
              <div className="divider" />
              <div className="activity-item">
                <div className="label">File</div>
                <div className="value"><a href={uploaded.fileUrl} target="_blank" rel="noreferrer">View</a></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

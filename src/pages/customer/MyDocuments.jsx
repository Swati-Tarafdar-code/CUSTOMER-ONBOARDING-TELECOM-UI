// src/pages/Customer/MyDocuments.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getCustomerStatus } from '../../api/users';
import '../../MyDocuments.css';

const MyDocuments = () => {
  const { userId } = useAuth();
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');

  const fetchDocuments = async () => {
    if (!userId) return;
    setError('');
    setLoading(true);
    try {
      const res = await getCustomerStatus(userId);
      // backend returns user object with documents array
      setDocs(res.data?.documents || []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDocuments();
    setRefreshing(false);
  };

  return (
    <div className="status-page">
      <div className="status-header card">
        <div className="status-left">
          <h4>Overall Status</h4>
          <div className="status-summary">{docs.length} documents submitted</div>
        </div>
        <div className="status-right">
          <button className="btn-outline" onClick={handleRefresh} disabled={refreshing || loading}>
            {refreshing ? 'Refreshing…' : 'Refresh Status'}
          </button>
        </div>
      </div>

      <div className="documents-card card">
        <h3>My Document Status</h3>
        <p className="muted">Latest updates on your document submissions.</p>

        {loading ? (
          <div className="loading">Loading documents…</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : docs.length === 0 ? (
          <div className="empty">No documents submitted yet.</div>
        ) : (
          <div className="table-wrap">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Document ID</th>
                  <th>Document Type</th>
                  <th>Upload Date</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>DOB</th>
                  <th>Verification Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {docs.map((d) => (
                  <tr key={d.documentid || d.id}>
                    <td>{d.documentid || d.id}</td>
                    <td>{d.documenttype || d.type || '-'}</td>
                    <td>{d.uploadedAt ? new Date(d.uploadedAt).toLocaleDateString() : '-'}</td>
                    <td>{d.name || '-'}</td>
                    <td className="address-col">{d.address || '-'}</td>
                    <td>{d.dob ? new Date(d.dob).toLocaleDateString() : '-'}</td>
                    <td>
                      <span className={`status-pill ${((d.status || '').toLowerCase()) || 'pending'}`}>
                        {d.status || 'Pending'}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <Link to={`/customer/ocr/${d.documentid || d.id}`} className="link-action">
                          Run OCR
                        </Link>
                        {d.fileUrl && (
                          <a href={d.fileUrl} target="_blank" rel="noreferrer" className="link-action">
                            View
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="review-card card">
        <div className="review-grid">
          <input
            className="review-input"
            placeholder="Review Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <input className="review-input wide" placeholder="Input text" />
          <button className="btn-primary small">Save Comment</button>
        </div>
      </div>
    </div>
  );
};

export default MyDocuments;



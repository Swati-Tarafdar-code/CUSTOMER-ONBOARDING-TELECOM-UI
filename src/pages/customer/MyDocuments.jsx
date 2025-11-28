// // // src/pages/Customer/MyDocuments.jsx

// ...existing code...
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCustomerStatus } from '../../api/users';
import '../../MyDocuments.css';

const MyDocuments = () => {
  const [user, setUser] = useState(null); // full payload (includes status + reviewer_comment)
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');

  const fetchDocuments = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await getCustomerStatus();
      const payload = res.data || {};
      setUser(payload);
      setDocs(payload.documents || []);
      // read comment from backend only (do not PUT)
      setComment(payload.reviewer_comment ?? payload.reviewComment ?? payload.comment ?? '');
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err?.response?.data?.message || err.message || 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDocuments();
    setRefreshing(false);
  };

  const friendlyStatus = (s) => {
    if (!s) return 'N/A';
    const map = {
      PENDING_REVIEW: 'Pending Review',
      APPROVED: 'Approved',
      REJECTED: 'Rejected',
      PENDING: 'Pending',
    };
    return map[s] || s;
  };

  return (
    <div className="status-page">
      <div className="status-header card">
        <div className="status-left">
          <h4>Overall Status</h4>
          <div className="status-summary">{docs.length} documents submitted</div>
          <div className="status-summary">
            Status <span style={{ fontWeight: 700, marginLeft: 6 }}>{friendlyStatus(user?.status)}</span>
          </div>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {docs.map((d, idx) => (
                  <tr key={d.document_id || d.documentid || idx}>
                    <td>{d.document_id || d.documentid || d.id}</td>
                    <td>{d.document_type || d.documenttype || d.type || '-'}</td>
                    <td>
                      {d.created_at || d.uploadedAt
                        ? new Date(d.created_at || d.uploadedAt).toLocaleDateString()
                        : '-'}
                    </td>
                    <td>{d.name || '-'}</td>
                    <td className="address-col">{d.address || '-'}</td>
                    <td>{d.dob ? new Date(d.dob).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="review-card card">
        <h4>Comment</h4>
        <div className="review-grid">
          {/* comment is read from backend (no PUT). show as read-only */}
          <textarea
            className="review-input"
            placeholder="Reviewer comment (from database)"
            value={comment}
            onChange={() => {}}
            rows="3"
            readOnly
          />
          {error && <div style={{ color: '#9f1239', marginTop: 8 }}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default MyDocuments;
// ...existing code...


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getCustomerStatus } from '../../api/users';
// import '../../MyDocuments.css';

// const MyDocuments = () => {
//   const [docs, setDocs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState('');
//   const [comment, setComment] = useState('');

//   const fetchDocuments = async () => {
//     setError('');
//     setLoading(true);
//     try {
//       const res = await getCustomerStatus();
//       // backend returns user object with documents array
//       setDocs(res.data?.documents || []);
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError(err?.response?.data?.message || err.message || 'Failed to load documents');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchDocuments();
//     setRefreshing(false);
//   };

//   const handleSaveComment = () => {
//     if (!comment.trim()) {
//       alert('Please enter a comment');
//       return;
//     }
//     // TODO: Call backend API to save comment if needed
//     console.log('Comment saved:', comment);
//     setComment('');
//   };

//   return (
//     <div className="status-page">
//       <div className="status-header card">
//         <div className="status-left">
//           <h4>Overall Status</h4>
//           <div className="status-summary">{docs.length} documents submitted</div>
//           <div className="status-summary">Status {} </div>
//         </div>
//         <div className="status-right">
//           <button className="btn-outline" onClick={handleRefresh} disabled={refreshing || loading}>
//             {refreshing ? 'Refreshing…' : 'Refresh Status'}
//           </button>
//         </div>
//       </div>

//       <div className="documents-card card">
//         <h3>My Document Status</h3>
//         <p className="muted">Latest updates on your document submissions.</p>

//         {loading ? (
//           <div className="loading">Loading documents…</div>
//         ) : error ? (
//           <div className="error">{error}</div>
//         ) : docs.length === 0 ? (
//           <div className="empty">No documents submitted yet.</div>
//         ) : (
//           <div className="table-wrap">
//             <table className="docs-table">
//               <thead>
//                 <tr>
//                   <th>Document ID</th>
//                   <th>Document Type</th>
//                   <th>Upload Date</th>
//                   <th>Name</th>
//                   <th>Address</th>
//                   <th>DOB</th>
//                   {/* <th>Verification Status</th> */}
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {docs.map((d, idx) => (
//                   <tr key={d.document_id || d.documentid || idx}>
//                     <td>{d.document_id || d.documentid || d.id}</td>
//                     <td>{d.document_type || d.documenttype || d.type || '-'}</td>
//                     <td>{d.created_at || d.uploadedAt ? new Date(d.created_at || d.uploadedAt).toLocaleDateString() : '-'}</td>
//                     <td>{d.name || '-'}</td>
//                     <td className="address-col">{d.address || '-'}</td>
//                     <td>{d.dob ? new Date(d.dob).toLocaleDateString() : '-'}</td>
//                     {/* <td>
//                       <span className={`status-pill ${((d.status || '').toLowerCase()) || 'pending'}`}>
//                         {d.status || 'Pending'}
//                       </span>
//                     </td> */}
//                     {/* <td>
//                       <div className="row-actions">
//                         {d.file_path && (
//                           <a href={d.file_path} target="_blank" rel="noreferrer" className="link-action">
//                             View
//                           </a>
//                         )}
//                       </div>
//                     </td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       <div className="review-card card">
//         <h4>Comment</h4>
//         <div className="review-grid">
//           <textarea
//             className="review-input"
//             placeholder="Add your comment here…"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             rows="3"
//           />

//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyDocuments;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserDetails, updateUserStatus } from '../../api/users';
import '../../VerifyUser.css';

const VerifyUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getUserDetails(userId);
        if (mounted) setUser(res.data);
      } catch (err) {
        if (mounted) setError(err?.response?.data?.message || err.message || 'Failed to load user details');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [userId]);

  const handleUpdate = async (newStatus) => {
    const label = newStatus.toUpperCase();
    if (!window.confirm(`Confirm ${label} this user?`)) return;
    setActionLoading(true);
    setError('');
    setSuccess('');
    try {
      await updateUserStatus(userId, label);
      setSuccess(`User ${label} successfully.`);
      setUser((u) => (u ? { ...u, status: label } : u));
      setTimeout(() => navigate('/admin/pending'), 900);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="verify-loading">Loading user…</div>;
  if (error) return <div className="verify-error">{error}</div>;
  if (!user) return null;

  return (
    <div className="verify-user">
      <div className="verify-header">
        <div>
          <h1>Verify User</h1>
          <p className="verify-sub">Review documents and approve or reject verification requests.</p>
        </div>
        <div className="verify-actions-top">
          <Link to="/admin/pending" className="link-back">← Back to Pending</Link>
        </div>
      </div>


       <div className="verify-card">
         <div className="verify-profile">
           <div className="avatar">
             {user.avatar ? <img src={user.avatar} alt="avatar" /> : <span>👤</span>}
           </div>
           <div className="profile-meta">
             <div className="meta-row">
               <label>ID</label>
               <div>{user.userid || user.user_id || user.id}</div>
             </div>
             <div className="meta-row">
               <label>Name</label>
               <div>{user.username || user.name || '-'}</div>
             </div>
             <div className="meta-row">
               <label>Status</label>
               <div className={`status-pill ${((user.status||'pending').toLowerCase())}`}>{user.status || 'Pending'}</div>
             </div>

             <div className="meta-row">
               <label>Email</label>
              <div>{user.email || '-'}</div>
            </div>
           </div>
         </div>




        {/* Documents table with Address and DOB columns */}
        <div className="verify-docs">
          <h3>Submitted Documents</h3>
          <div className="table-wrap">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Document ID</th>
                  <th>Type</th>
                  <th>Uploaded</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>DOB</th>
                  <th>Status</th>
                  <th>Preview</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(user.documents) && user.documents.length > 0 ? (
                  user.documents.map((d, idx) => (
                    <tr key={`${d.document_id}-${idx}`}>
                      <td>{d.document_id || d.documentid || d.id}</td>
                      <td>{d.document_type || d.documenttype || d.type || '-'}</td>
                      <td>{d.created_at || d.uploadedAt ? new Date(d.created_at || d.uploadedAt).toLocaleDateString() : '-'}</td>
                      <td>{d.name || '-'}</td>
                      <td className="address-col">{d.address || '-'}</td>
                      <td>{d.dob ? new Date(d.dob).toLocaleDateString() : '-'}</td>
                      <td><span className="doc-status">{d.status || 'Pending'}</span></td>
                      <td>
                        {d.file_path || d.fileUrl ? (
                          <a href={d.file_path || d.fileUrl} target="_blank" rel="noreferrer" className="view-link">
                            View
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-docs">No documents submitted.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action buttons */}
        <div className="verify-footer">
          {success && <div className="success-message">{success}</div>}
          <div className="footer-actions">
            <button
              className="btn-outline"
              onClick={() => handleUpdate('APPROVED')}
              disabled={actionLoading}
            >
              {actionLoading ? 'Working…' : 'Approve'}
            </button>

            <button
              className="btn-danger"
              onClick={() => handleUpdate('REJECTED')}
              disabled={actionLoading}
            >
              {actionLoading ? 'Working…' : 'Reject'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { getUserDetails, updateUserStatus } from '../../api/users';
// import '../../VerifyUser.css';

// const VerifyUser = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     let mounted = true;
//     const load = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const res = await getUserDetails(userId);
//         if (mounted) setUser(res.data);
//       } catch (err) {
//         if (mounted) setError(err?.response?.data?.message || err.message || 'Failed to load user details');
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };
//     load();
//     return () => { mounted = false; };
//   }, [userId]);

//   const handleUpdate = async (newStatus) => {
//     const label = newStatus.toUpperCase();
//     if (!window.confirm(`Confirm ${label} this user?`)) return;
//     setActionLoading(true);
//     setError('');
//     setSuccess('');
//     try {
//       await updateUserStatus(userId, label); // sends APPROVED / REJECTED
//       setSuccess(`User ${label} successfully.`);
//       setUser((u) => (u ? { ...u, status: label } : u));
//       // go back to pending list after short delay
//       setTimeout(() => navigate('/admin/pending'), 900);
//     } catch (err) {
//       setError(err?.response?.data?.message || err.message || 'Action failed');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   if (loading) return <div className="verify-loading">Loading user…</div>;
//   if (error) return <div className="verify-error">{error}</div>;
//   if (!user) return null;

//   return (
//     <div className="verify-user">
//       <div className="verify-header">
//         <div>
//           <h1>Verify User</h1>
//           <p className="verify-sub">Review documents and approve or reject verification requests.</p>
//         </div>
//         <div className="verify-actions-top">
//           <Link to="/admin/pending" className="link-back">← Back to Pending</Link>
//         </div>
//       </div>

//       <div className="verify-card">
//         <div className="verify-profile">
//           <div className="avatar">
//             {user.avatar ? <img src={user.avatar} alt="avatar" /> : <span>👤</span>}
//           </div>
//           <div className="profile-meta">
//             <div className="meta-row">
//               <label>ID</label>
//               <div>{user.userid || user.user_id || user.id}</div>
//             </div>
//             <div className="meta-row">
//               <label>Name</label>
//               <div>{user.username || user.name || '-'}</div>
//             </div>
//             <div className="meta-row">
//               <label>Status</label>
//               <div className={`status-pill ${((user.status||'pending').toLowerCase())}`}>{user.status || 'Pending'}</div>
//             </div>
//             <div className="meta-row">
//               <label>DOB</label>
//               <div>{user.dob ? new Date(user.dob).toLocaleDateString() : '-'}</div>
//             </div>
//             <div className="meta-row">
//               <label>Address</label>
//               <div className="address">{user.address || '-'}</div>
//             </div>
//             <div className="meta-row">
//               <label>Email</label>
//               <div>{user.email || '-'}</div>
//             </div>
//           </div>
//         </div>

//         <div className="verify-docs">
//           <h3>Submitted Documents</h3>
//           <div className="table-wrap">
//             <table className="docs-table">
//               <thead>
//                 <tr>
//                   <th>Document ID</th>
//                   <th>Type</th>
//                   <th>Uploaded</th>
//                   <th>Status</th>
//                   <th>Preview</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Array.isArray(user.documents) && user.documents.length > 0 ? (
//                   user.documents.map((d) => (
//                     <tr key={d.documentid || d.id}>
//                       <td>{d.documentid || d.id}</td>
//                       <td>{d.documenttype || d.type || '-'}</td>
//                       <td>{d.uploadedAt ? new Date(d.uploadedAt).toLocaleDateString() : '-'}</td>
//                       <td><span className="doc-status">{d.status || 'Pending'}</span></td>
//                       <td>{d.fileUrl ? <a href={d.fileUrl} target="_blank" rel="noreferrer">View</a> : '-'}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr><td colSpan="5" className="no-docs">No documents submitted.</td></tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="verify-footer">
//           {success && <div className="success-message">{success}</div>}
//           <div className="footer-actions">
//             <button
//               className="btn-outline"
//               onClick={() => handleUpdate('APPROVED')}
//               disabled={actionLoading}
//             >
//               {actionLoading ? 'Working…' : 'Approve'}
//             </button>

//             <button
//               className="btn-danger"
//               onClick={() => handleUpdate('REJECTED')}
//               disabled={actionLoading}
//             >
//               {actionLoading ? 'Working…' : 'Reject'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyUser;


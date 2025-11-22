// src/pages/Admin/PendingUsers.jsx

// ...new file...
import React, { useEffect, useState } from 'react';
import { getPendingUsers, updateUserStatus } from '../../api/users';
import '../../AdminDashboard.css';

const PendingUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState('');

  const fetch = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await getPendingUsers();
      setUsers(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to load pending users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleApprove = async (userId) => {
    setActionLoading(userId);
    try {
      await updateUserStatus(userId, 'approved');
      await fetch();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || 'Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="admin-list-card card">
      <header className="admin-card-header">
        <h3>Pending Users</h3>
        <p className="muted">Users awaiting verification.</p>
      </header>

      {loading ? (
        <div className="loading">Loading pending users…</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Requested On</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.userid || u.id}>
                  <td>{u.userid || u.id}</td>
                  <td>{u.name || u.fullname || '-'}</td>
                  <td>{u.email || '-'}</td>
                  <td>{u.requestedAt ? new Date(u.requestedAt).toLocaleDateString() : '-'}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn-sm"
                      onClick={() => handleApprove(u.userid || u.id)}
                      disabled={actionLoading === (u.userid || u.id)}
                    >
                      {actionLoading === (u.userid || u.id) ? 'Working…' : 'Verify'}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '18px' }}>
                    No pending users.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingUsers;


// import { useEffect, useState } from 'react';
// import { getPendingUsers, updateUserStatus } from '../../api/users';

// const PendingUsers = () => {
//   const [rows, setRows] = useState([]);
//   const load = async () => setRows((await getPendingUsers()).data);
//   useEffect(()=>{ load(); }, []);
//   const setStatus = async (userId, status) => { await updateUserStatus(userId, status); load(); };

//   return (
//     <div>
//       <h2>Pending Users</h2>
//       <ul>
//         {rows.map(r=>(
//           <li key={r.userid}>
//             {r.username} — {r.email} — {r.status}
//             <button onClick={()=>setStatus(r.userid,'APPROVED')}>Approve</button>
//             <button onClick={()=>setStatus(r.userid,'REJECTED')}>Reject</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// export default PendingUsers;
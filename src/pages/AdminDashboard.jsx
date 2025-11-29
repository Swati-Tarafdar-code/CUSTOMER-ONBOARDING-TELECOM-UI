// src/pages/AdminDashboard.jsx

import React, { useEffect, useState } from 'react';
import { getUsers, updateUserStatus } from '../api/users';
import { useNavigate } from "react-router-dom";
import '../AdminDashboard.css'; // shared admin styles

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetch = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  // const handleVerify = async (userId) => {
  //   setActionLoading(userId);
  //   try {
  //     await updateUserStatus(userId, 'approved');
  //     await fetch();
  //   } catch (err) {
  //     console.error(err);
  //     setError(err?.response?.data?.message || err.message || 'Action failed');
  //   } finally {
  //     setActionLoading(null);
  //   }
  // };

    const handleVerify = (userId) => {
    if (!userId) {
      console.error("No userId provided");
      return;
    }
    navigate(`/admin/users/${userId}`);
  };

  return (
    <div className="admin-list-card card">
      <header className="admin-card-header">
        <h3>All Users</h3>
        <p className="muted">Manage and process customer verification requests.</p>
      </header>

      {loading ? (
        <div className="loading">Loading users…</div>
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
                <th>Role</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.userid || u.id}>
                  <td>{u.userid || u.user_id}</td>
                  <td>{u.name || u.username || '-'}</td>
                  <td>{u.email || '-'}</td>
                  <td>{u.role || '-'}</td>
                  <td>
                    <span className={`status-pill ${((u.status || '').toLowerCase()) || 'pending'}`}>
                      {u.status || 'Pending'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn-sm"
                      onClick={() => handleVerify(u.user_id || u.id)}
                      disabled={actionLoading === (u.user_id || u.id)}
                    >
                      {actionLoading === (u.user_id || u.id) ? 'Working…' : 'Verify'}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '18px' }}>
                    No users found.
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

export default UsersList;



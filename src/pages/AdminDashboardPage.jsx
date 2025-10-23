// src/pages/AdminDashboardPage.jsx (Refined)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import UserManagementTable from '../components/admin/UserManagementTable';

function AdminDashboardPage() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingUsers = async () => {
    try {
      // Endpoint: router.get('/pending', protect, adminOnly, getPendingUsers); 
      const res = await api.get('/users/pending'); 
      setPendingUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch pending users", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  if (loading) return <div className="text-center py-10">Loading Admin Dashboard...</div>;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold border-b pb-3">Admin Dashboard</h1>

      {/* Quick Stats/Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg bg-red-50 shadow-md">
          <h2 className="text-4xl font-extrabold text-red-600">{pendingUsers.length}</h2>
          <p className="text-gray-600">Users Pending Document Review</p>
          <a href="#pending-users" className="text-sm text-red-500 hover:underline mt-2 inline-block">Jump to Review List &rarr;</a>
        </div>
        <Link to="/admin/users" className="p-6 border rounded-lg bg-blue-50 shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-bold text-blue-600">User Management</h2>
          <p className="text-gray-600">View all users, update roles, delete accounts.</p>
        </Link>
        <Link to="/admin/audit" className="p-6 border rounded-lg bg-green-50 shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-bold text-green-600">Audit Logs</h2>
          <p className="text-gray-600">Track all system and admin actions.</p>
        </Link>
      </div>

      {/* Pending Reviews Table */}
      <h2 id="pending-users" className="text-2xl font-bold pt-4 border-t">Users Requiring Review</h2>
      <UserManagementTable users={pendingUsers} actions={['review']} />

    </div>
  );
}

export default AdminDashboardPage;
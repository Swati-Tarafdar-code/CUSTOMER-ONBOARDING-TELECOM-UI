// src/pages/AllUsersPage.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import UserManagementTable from '../components/admin/UserManagementTable';

function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      // Endpoint: router.get('/', protect, adminOnly, getUsers);
      const res = await api.get('/users'); 
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch all users", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Placeholder for role update logic (You would integrate this into a modal/dropdown)
  const handleRoleChange = async (userId, newRole) => {
    try {
      // Endpoint: router.put('/:userId/role', protect, adminOnly, updateUserRole);
      await api.put(`/users/${userId}/role`, { role: newRole });
      alert(`User ${userId} role updated to ${newRole}`);
      fetchUsers(); // Refresh list
    } catch (err) {
      alert('Failed to update user role.');
    }
  };


  if (loading) return <div className="text-center py-10">Loading All Users...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">All System Users</h1>
      {/* Passing both 'review' and 'manage' actions to UserManagementTable */}
      <UserManagementTable users={users} actions={['review', 'manage']} />
      
      {/* You would replace the 'manage' action link in the table with a function call 
          to a component that handles role and deletion via a modal. */}
      <p className="mt-4 text-sm text-gray-600">
        *Full role management and delete functionality needs a separate component to handle `handleRoleChange` and `DELETE /api/users/:userId/delete` endpoints.
      </p>
    </div>
  );
}

export default AllUsersPage;
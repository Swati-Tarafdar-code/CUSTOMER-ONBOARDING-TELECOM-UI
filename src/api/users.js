// src/api/users.js
import api from './axios';

export const getUsers = () => api.get('http://localhost:5000/api/users');
export const updateUserRole = (userId, role) => api.put(`http://localhost:5000/api/users/${userId}/role`, { role });
export const deleteUser = (userId) => api.delete(`http://localhost:5000/api/users/${userId}/delete`);
export const getPendingUsers = () => api.get('http://localhost:5000/api/users/pending');
export const getUserDetails = (userId) => api.get(`http://localhost:5000/api/users/${userId}/details`);
export const updateUserStatus = (userId, status) => api.put(`http://localhost:5000/api/users/${userId}/status`, { status });
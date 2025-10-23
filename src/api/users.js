// src/api/users.js
import api from './axios';

export const getUsers = () => api.get('/users');
export const updateUserRole = (userId, role) => api.put(`/users/${userId}/role`, { role });
export const deleteUser = (userId) => api.delete(`/users/${userId}/delete`);
export const getPendingUsers = () => api.get('/users/pending');
export const getUserDetails = (userId) => api.get(`/users/${userId}/details`);
export const updateUserStatus = (userId, status) => api.put(`/users/${userId}/status`, { status });
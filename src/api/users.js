// src/api/users.js
import api from './axios';

// export const getCustomerStatus = () => api.get('http://localhost:5000/api/users/me/status');
// export const getUsers = () => api.get('http://localhost:5000/api/users');
// export const updateUserRole = (userId, role) => api.put(`http://localhost:5000/api/users/${userId}/role`, { role });
// export const deleteUser = (userId) => api.delete(`http://localhost:5000/api/users/${userId}/delete`);
// export const getPendingUsers = () => api.get('http://localhost:5000/api/users/pending');
// export const getUserDetails = (userId) => api.get(`http://localhost:5000/api/users/${userId}/details`);
// export const updateUserStatus = (userId, status) => api.put(`http://localhost:5000/api/users/${userId}/status`, { status });

export const getCustomerStatus = () => api.get('https://customer-onboarding-telecom-api.onrender.com/api/users/me/status');
export const getUsers = () => api.get('https://customer-onboarding-telecom-api.onrender.com/api/users');
export const updateUserRole = (userId, role) => api.put(`https://customer-onboarding-telecom-api.onrender.com/api/users/${userId}/role`, { role });
export const deleteUser = (userId) => api.delete(`https://customer-onboarding-telecom-api.onrender.com/api/users/${userId}/delete`);
export const getPendingUsers = () => api.get('https://customer-onboarding-telecom-api.onrender.com/api/users/pending');
export const getUserDetails = (userId) => api.get(`https://customer-onboarding-telecom-api.onrender.com/api/users/${userId}/details`);
export const updateUserStatus = (userId, status, comment) => api.put(`https://customer-onboarding-telecom-api.onrender.com/api/users/${userId}/status`,{ 
    status, 
    comment, 
});
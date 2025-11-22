// src/api/auth.js
import api from './axios';

export const signup = (payload) => api.post('http://localhost:5000/api/auth/signup', payload);
export const login = (payload) => api.post('http://localhost:5000/api/auth/login', payload);
// export const login = (payload) => api.post('https://customer-onboarding-telecom-api.onrender.com/api/auth/login', payload);
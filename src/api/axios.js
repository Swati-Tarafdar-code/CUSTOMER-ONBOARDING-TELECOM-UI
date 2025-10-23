// src/api/axios.js
import axios from 'axios';
const base = process.env.REACT_APP_API_BASE || process.env.VITE_API_BASE || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: base,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // token from /login
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
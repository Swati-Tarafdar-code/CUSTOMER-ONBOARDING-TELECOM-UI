// src/services/api.js
import axios from 'axios';

// 1. Create a base Axios instance
const api = axios.create({
  // Use the local development URL for your Node.js server
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response interceptor for global error handling (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a 401, clear the token and redirect to login
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized request. Logging out.');
      localStorage.removeItem('token');
      // Note: A real app would redirect the user here using window.location.href or history.push
    }
    return Promise.reject(error);
  }
);

export default api;
// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const res = await api.post('/auth/signup', { username, email, password });
      
      const { token } = res.data;
      login(token); // Log in the user immediately
      setSuccess('Registration successful! Redirecting...');
      
      // Redirect new customer to their dashboard
      setTimeout(() => navigate('/'), 1000); 

    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed.';
      setError(message);
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Customer Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600 border border-red-200 p-2 rounded">{error}</p>}
        {success && <p className="text-green-600 border border-green-200 p-2 rounded">{success}</p>}
        
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200">
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
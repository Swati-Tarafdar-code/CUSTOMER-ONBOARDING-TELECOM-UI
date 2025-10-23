// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Endpoint: router.post('/login', loginUser);
      const res = await api.post('/auth/login', { email, password });
      
      const { token } = res.data;
      login(token); // Store token and update context
      
      // Navigate based on decoded role (handled by AuthProvider)
      navigate('/'); 

    } catch (err) {
      const message = err.response?.data?.message || 'Login failed.';
      setError(message);
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;
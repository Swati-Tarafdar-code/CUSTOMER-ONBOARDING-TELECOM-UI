// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; // You'd need a library to decode the JWT on the client

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores { id, role }
  const [loading, setLoading] = useState(true);

  // Function to initialize or refresh user state from local storage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token
        setUser({ user_id: decoded.id, role: decoded.role });
      } catch (error) {
        console.error('Invalid token, logging out:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser({ user_id: decoded.id, role: decoded.role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAdmin = user && user.role === 'admin';
  const isCustomer = user && user.role === 'customer';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isCustomer, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
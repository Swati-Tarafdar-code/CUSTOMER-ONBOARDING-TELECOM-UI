// src/components/common/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { user, logout, isAdmin, isCustomer } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to={user ? (isAdmin ? '/admin' : '/') : '/login'} className="text-2xl font-bold tracking-wider">
          OnboardFlow
        </Link>
        <nav className="space-x-4">
          {user ? (
            <>
              {isCustomer && (
                <Link to="/" className="hover:text-blue-300 transition">
                  My Dashboard
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin" className="hover:text-blue-300 transition">
                  Admin Panel
                </Link>
              )}
              <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout ({user.role})
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-300 transition">Login</Link>
              <Link to="/register" className="hover:text-blue-300 transition">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
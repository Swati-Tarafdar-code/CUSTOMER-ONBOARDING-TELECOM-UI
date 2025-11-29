// src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../Navbar.css';

const Navbar = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / Brand */}
        <div className="navbar-brand">
          AirConnect Customer Onboarding Portal
        </div>

        {/* Navigation Links */}
        {role === 'customer' && (
          <div className="navbar-links">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/customer/upload" 
              className={`nav-link ${isActive('/customer/upload') ? 'active' : ''}`}
            >
              Upload
            </Link>
            <Link 
              to="/customer/status" 
              className={`nav-link ${isActive('/customer/status') ? 'active' : ''}`}
            >
              Status
            </Link>
          </div>
        )}

        {role === 'admin' && (
          <div className="navbar-links">
            <Link 
              to="/admin" 
              className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/users" 
              className={`nav-link ${isActive('/admin/users') ? 'active' : ''}`}
            >
              Users
            </Link>
            <Link 
              to="/admin/pending" 
              className={`nav-link ${isActive('/admin/pending') ? 'active' : ''}`}
            >
              Pending Users
            </Link>
            <Link 
              to="/admin/audit" 
              className={`nav-link ${isActive('/admin/audit') ? 'active' : ''}`}
            >
              Audit
            </Link>
          </div>
        )}

        {/* Right Section - User Profile & Logout */}
        <div className="navbar-right">
          {role && (
            <>
              <div className="user-avatar">👤</div>
              <button className="btn-logout" onClick={handleLogout}>
                ↪ Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



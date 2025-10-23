// src/components/RoleRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ role: required }) => {
  const { role } = useAuth();
  return role === required ? <Outlet /> : <Navigate to="/" replace />;
};

export default RoleRoute;
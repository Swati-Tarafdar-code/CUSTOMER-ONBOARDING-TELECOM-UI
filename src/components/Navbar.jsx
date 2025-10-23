// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { role, logout } = useAuth();
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      {!role && <Link to="/login">Login</Link>}
      {role === 'admin' && <Link to="/admin">Admin</Link>}
      {role === 'customer' && <Link to="/customer">Customer</Link>}
      {role && <button onClick={logout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
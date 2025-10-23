// src/pages/Home.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const goto = (r) => navigate(r === 'admin' ? '/admin' : '/customer');

  return (
    <div className="home">
      <h1>Document Portal</h1>
      {!role && (
        <>
          <p>Select your role to continue</p>
          <div className="role-chooser">
            <Link to="/login?role=customer" className="btn">Customer Login</Link>
            <Link to="/login?role=admin" className="btn">Admin Login</Link>
          </div>
        </>
      )}
      {role && (
        <div className="role-chooser">
          <button onClick={() => goto(role)} className="btn">Go to Dashboard</button>
        </div>
      )}
    </div>
  );
};

export default Home;
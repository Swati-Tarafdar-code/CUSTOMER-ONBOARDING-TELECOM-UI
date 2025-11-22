// export default Login;

import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import '../Login.css';
import LoginImage from '../images/Login.png'; // adjust path to your colorful image

const Login = () => {
  const [params] = useSearchParams();
  const presetRole = params.get('role');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login: doLogin } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await login({ email, password });
      const { token, user } = data || {};
      doLogin({ token, role: user?.role || presetRole || 'customer', userId: user?.userid });
      navigate(user?.role === 'admin' || presetRole === 'admin' ? '/admin' : '/customer/upload');
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left - Image */}
        <div className="login-left">
          <img src={LoginImage} alt="Login illustration" />
        </div>

        {/* Right - Form */}
        <div className="login-right">
          <form className="login-form" onSubmit={submit}>
            <h2 className="login-title">Welcome Back to Your Secure Portal</h2>
            <p className="login-subtitle">Please enter your credentials to proceed.</p>

            {error && <div className="error-box">{error}</div>}

            <div className="form-group">
              <label>User ID</label>
              <input
                type="email"
                placeholder="Enter your User ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn-proceed" type="submit" disabled={loading}>
              {loading ? 'Logging in…' : 'Proceed'}
            </button>

            <div className="register-link">
              New User? <Link to="/signup">Register Here</Link>
            </div>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <a href="#product">Product</a>
            <a href="#resources">Resources</a>
            <a href="#company">Company</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
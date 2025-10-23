// src/pages/Login.jsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [params] = useSearchParams();
  const presetRole = params.get('role'); // admin/customer
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: doLogin } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await login({ email, password });
    // backend returns token; role is in JWT, but persist role from server response if present
    const { token, user } = data || {};
    // if login controller only sends token, decode role via a /me call; otherwise infer next path
    doLogin({ token, role: user?.role || presetRole || 'customer', userId: user?.userid });
    navigate(user?.role === 'admin' || presetRole === 'admin' ? '/admin' : '/customer');
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Login {presetRole ? `(${presetRole})` : ''}</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { createContext, useState, useEffect, useContext } from 'react';

// --- JWT DECODE UTILITY (Replaces external dependency) ---

/**
 * Decodes the payload part of a standard JWT token.
 * @param {string} token - The JWT string (e.g., 'header.payload.signature')
 * @returns {object|null} The decoded JSON object or null if decoding fails.
 */
const decodeJwt = (token) => {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // The second part is the base64url-encoded payload
    const payload = parts[1];
    
    // Convert base64url to base64, then decode
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to decode JWT:', e);
    return null;
  }
};


// --- CONTEXT: AuthContext ---

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores { user_id, role }
  const [loading, setLoading] = useState(true);

  // Decode token and set user state
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeJwt(token); 
      if (decoded) {
        // Ensure user ID and role are extracted correctly based on your backend token creation (id and role are expected)
        setUser({ user_id: decoded.id, role: decoded.role });
      } else {
        console.error('Invalid token found, removing.');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = decodeJwt(token);
    if (decoded) {
        setUser({ user_id: decoded.id, role: decoded.role });
    } else {
        console.error('Token could not be decoded after login.');
        localStorage.removeItem('token');
        setUser(null);
    }
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

// --- COMPONENTS ---

// 1. Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="text-center p-10 text-lg">Loading authentication state...</div>; 
  
  if (!user) {
    // If not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If logged in but unauthorized role
    return <div className="text-center p-10 text-xl text-red-600">403 Forbidden: You do not have access to this page.</div>;
  }

  return children;
};

// 2. Header Component
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
                <Link to="/" className="hover:text-blue-300 transition">My Dashboard</Link>
              )}
              {isAdmin && (
                <Link to="/admin" className="hover:text-blue-300 transition">Admin Panel</Link>
              )}
              <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
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

// --- PAGES (Stubbed) ---
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCustomerMode, setIsCustomerMode] = useState(true); // Toggle for mock login
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Mocking successful login and token generation
        // MOCK TOKENS: The payload is the middle part: '{"id":"123","role":"customer","iat":...}' or '{"id":"900","role":"admin","iat":...}'
        const customerToken = "header.eyJpZCI6IjEyMyIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3ODg5NzI0Nn0.signature"; 
        const adminToken = "header.eyJpZCI6IjkwMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODg5NzI0Nn0.signature";
        
        const mockToken = isCustomerMode ? customerToken : adminToken;
        
        login(mockToken);
        navigate(isCustomerMode ? '/' : '/admin'); 
    } catch (err) {
        console.error("Login Error:", err);
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-4 text-center">{isCustomerMode ? 'Customer Login' : 'Admin Login'}</h2>
        <div className="flex justify-center mb-6">
            <button 
                onClick={() => setIsCustomerMode(!isCustomerMode)} 
                className="text-sm text-blue-500 hover:text-blue-700 underline"
            >
                Switch to {isCustomerMode ? 'Admin' : 'Customer'} Mock Login
            </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" placeholder={`Email (Mock: ${isCustomerMode ? 'customer@a.com' : 'admin@a.com'})`} value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">Log In</button>
        </form>
        <p className="mt-6 text-center text-sm">New user? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link></p>
    </div>
  );
};

const RegisterPage = () => 
    <div className="max-w-md mx-auto p-6 mt-10 border rounded shadow-xl bg-green-50">
        <h2 className="text-2xl font-bold text-center text-green-800">Registration Page</h2>
        <p className="text-gray-600 mt-2 text-center">This is the frontend component for new user sign-up (utilizing `POST /api/auth/signup`).</p>
        <p className="text-center mt-4">
            <Link to="/login" className="text-blue-600 hover:underline">Go to Login</Link>
        </p>
    </div>;

const CustomerDashboardPage = () => {
    const { user } = useAuth();
    return (
        <div className="p-8 border rounded-lg shadow-xl mt-8 bg-white">
            <h1 className="text-4xl font-extrabold text-indigo-700 mb-6">Welcome Back, Customer!</h1>
            <p className="text-lg text-gray-700 mb-8">User ID: <span className="font-mono bg-gray-100 p-1 rounded text-sm">{user.user_id}</span> | Role: <span className="font-semibold text-indigo-500">{user.role}</span></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 border rounded-lg bg-green-50">
                    <h2 className="text-2xl font-semibold mb-3 text-green-800">Your Documents</h2>
                    <p>Document upload form and list components go here.</p>
                    <p className="text-sm text-gray-500 mt-2">Interacts with: `/api/documents/upload` and `/api/documents`</p>
                </div>
                <div className="p-6 border rounded-lg bg-yellow-50">
                    <h2 className="text-2xl font-semibold mb-3 text-yellow-800">Status Overview</h2>
                    <p>Current Onboarding Status: **PENDING** (Determined by document statuses)</p>
                    <p className="text-sm text-gray-500 mt-2">Goal: **All Documents Verified**</p>
                </div>
            </div>
        </div>
    );
};

const AdminDashboardPage = () => 
    <div className="p-8 mt-8 border rounded-lg shadow-xl bg-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mb-6 text-center">Manage pending user reviews and system actions.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/admin/review/123" className="p-4 bg-red-100 border-l-4 border-red-500 rounded shadow hover:bg-red-200 transition">
                <h3 className="font-semibold text-red-700">Pending Review (Mock)</h3>
                <p className="text-sm text-red-600">Review documents for mock User 123.</p>
            </Link>
            <Link to="/admin/users" className="p-4 bg-blue-100 border-l-4 border-blue-500 rounded shadow hover:bg-blue-200 transition">
                <h3 className="font-semibold text-blue-700">User Management</h3>
                <p className="text-sm text-blue-600">View and manage all system users.</p>
            </Link>
            <Link to="/admin/audit" className="p-4 bg-green-100 border-l-4 border-green-500 rounded shadow hover:bg-green-200 transition">
                <h3 className="font-semibold text-green-700">Audit Logs</h3>
                <p className="text-sm text-green-600">View all system actions (`GET /api/audit`).</p>
            </Link>
        </div>
    </div>;

const DocumentReviewPage = () => 
    <div className="text-center p-10 mt-10 border rounded shadow bg-yellow-50">
        <h2 className="text-2xl font-bold text-yellow-800">Document Review Page</h2>
        <p className="text-gray-600">Admin view for user documents (`GET /api/users/:userId/details`).</p>
        <Link to="/admin" className="text-blue-600 mt-2 block">Back to Admin Dashboard</Link>
    </div>;

const AllUsersPage = () => 
    <div className="text-center p-10 mt-10 border rounded shadow bg-blue-50">
        <h2 className="text-2xl font-bold text-blue-800">All Users Management</h2>
        <p className="text-gray-600">Admin view for all users (`GET /api/users`) and role management.</p>
        <Link to="/admin" className="text-blue-600 mt-2 block">Back to Admin Dashboard</Link>
    </div>;

const AuditLogPage = () => 
    <div className="text-center p-10 mt-10 border rounded shadow bg-green-50">
        <h2 className="text-2xl font-bold text-green-800">Audit Logs</h2>
        <p className="text-gray-600">Admin view for system logs (`GET /api/audit`).</p>
        <Link to="/admin" className="text-blue-600 mt-2 block">Back to Admin Dashboard</Link>
    </div>;


// --- MAIN APP ---

const App = () => (
  <Router>
    <AuthProvider>
      <Header />
      <main className="max-w-7xl mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Default/Root Route (Customer) */}
          <Route path="/" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboardPage />
            </ProtectedRoute>
          } />

          {/* Admin Routes (Protected with admin role check) */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/review/:userId" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DocumentReviewPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AllUsersPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/audit" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AuditLogPage />
            </ProtectedRoute>
          } />


          {/* Fallback Route */}
          <Route path="*" element={
            <div className="text-center p-10 mt-10 border rounded bg-red-50 text-red-800">
              <h1 className="text-4xl font-bold">404</h1>
              <p>Page Not Found</p>
            </div>
          } />
        </Routes>
      </main>
    </AuthProvider>
  </Router>
);

export default App;
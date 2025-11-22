// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import UsersList from './pages/admin/UsersList';
import PendingUsers from './pages/admin/PendingUsers';
import UserDetails from './pages/admin/UserDetails';
import AuditLogs from './pages/admin/AuditLogs';
import UploadDocument from './pages/customer/UploadDocument';
import MyDocuments from './pages/customer/MyDocuments';
import OcrRun from './pages/customer/OcrRun';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute role="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/pending" element={<PendingUsers />} />
            <Route path="/admin/users/:userId" element={<UserDetails />} />
            <Route path="/admin/audit" element={<AuditLogs />} />
          </Route>

          <Route element={<RoleRoute role="customer" />}>
            {/* <Route path="/customer" element={<CustomerDashboard />} /> */}
            <Route path="/customer/upload" element={<CustomerDashboard />} />
            <Route path="/customer/status" element={<MyDocuments />} />
            <Route path="/customer/ocr/:documentId" element={<OcrRun />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
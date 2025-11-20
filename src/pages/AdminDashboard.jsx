// src/pages/AdminDashboard.jsx
import { Link } from 'react-router-dom';

const AdminDashboard = () => (
  <div className="grid">
    <Link to="/admin/users" className="tile">All Users</Link>
    <Link to="/admin/pending" className="tile">Pending Users</Link>
    <Link to="/admin/audit" className="tile">Audit Logs</Link>
  </div>
);

export default AdminDashboard;
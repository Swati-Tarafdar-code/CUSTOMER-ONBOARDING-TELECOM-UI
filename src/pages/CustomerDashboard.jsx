// src/pages/CustomerDashboard.jsx
import { Link } from 'react-router-dom';

const CustomerDashboard = () => (
  <div className="grid">
    <Link to="/customer/upload" className="tile">Upload Document</Link>
    <Link to="/customer/documents" className="tile">My Documents</Link>
  </div>
);

export default CustomerDashboard;
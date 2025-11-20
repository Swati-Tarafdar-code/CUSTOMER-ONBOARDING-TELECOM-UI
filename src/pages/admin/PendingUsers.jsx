// src/pages/Admin/PendingUsers.jsx
import { useEffect, useState } from 'react';
import { getPendingUsers, updateUserStatus } from '../../api/users';

const PendingUsers = () => {
  const [rows, setRows] = useState([]);
  const load = async () => setRows((await getPendingUsers()).data);
  useEffect(()=>{ load(); }, []);
  const setStatus = async (userId, status) => { await updateUserStatus(userId, status); load(); };

  return (
    <div>
      <h2>Pending Users</h2>
      <ul>
        {rows.map(r=>(
          <li key={r.userid}>
            {r.username} — {r.email} — {r.status}
            <button onClick={()=>setStatus(r.userid,'APPROVED')}>Approve</button>
            <button onClick={()=>setStatus(r.userid,'REJECTED')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PendingUsers;
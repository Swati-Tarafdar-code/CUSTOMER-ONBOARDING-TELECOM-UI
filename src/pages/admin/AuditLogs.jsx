// src/pages/Admin/AuditLogs.jsx
import { useEffect, useState } from 'react';
import { getAuditLogs } from '../../api/audit';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  useEffect(()=>{ (async ()=> setLogs((await getAuditLogs()).data || []))(); }, []);
  return (
    <div>
      <h2>Audit Logs</h2>
      <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(logs, null, 2)}</pre>
    </div>
  );
};
export default AuditLogs;
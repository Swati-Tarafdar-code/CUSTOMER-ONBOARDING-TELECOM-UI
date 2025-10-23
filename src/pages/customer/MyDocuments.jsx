// src/pages/Customer/MyDocuments.jsx
import { useEffect, useState } from 'react';
import { getUserDetails } from '../../api/users';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const MyDocuments = () => {
  const { userId } = useAuth();
  const [info, setInfo] = useState(null);

  useEffect(()=>{
    if (!userId) return;
    (async ()=> setInfo((await getUserDetails(userId)).data))();
  },[userId]);

  if (!info) return <p>Loading...</p>;
  return (
    <div>
      <h2>My Documents</h2>
      <ul>
        {info.documents?.map(d=>(
          <li key={d.documentid}>
            {d.documenttype} — {d.status}
            <Link to={`/customer/ocr/${d.documentid}`} style={{marginLeft:8}}>Run OCR</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MyDocuments;
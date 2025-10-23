// src/pages/Admin/UserDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../api/users';

const UserDetails = () => {
  const { userId } = useParams();
  const [info, setInfo] = useState(null);
  useEffect(()=>{
    (async ()=> setInfo((await getUserDetails(userId)).data))();
  },[userId]);

  if (!info) return <p>Loading...</p>;
  return (
    <div>
      <h2>User #{info.userid}</h2>
      <p>{info.username} — {info.email} — {info.role}</p>
      <h3>Documents</h3>
      <ul>
        {info.documents?.map(d=>(
          <li key={d.documentid}>
            {d.documenttype} — {d.status}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserDetails;
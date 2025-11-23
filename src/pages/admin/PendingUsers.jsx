// src/pages/Admin/PendingUsers.jsx


import React, { useEffect, useState } from "react";
import { getPendingUsers } from "../../api/users";
import { useNavigate } from "react-router-dom";
import "../../AdminDashboard.css";

const PendingUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetch = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getPendingUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err?.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const openVerifyPage = (userId) => {
    if (!userId) {
      console.error("No userId provided");
      return;
    }
    navigate(`/admin/users/${userId}`);
  };

  return (
    <div className="admin-list-card card">
      <header className="admin-card-header">
        <h3>Pending Users</h3>
        <p className="muted">Users awaiting verification.</p>
      </header>

      {loading ? (
        <div className="loading">Loading pending users…</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created On</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => {
                // Fix: Use correct key from API response
                const userId = u.user_id || u.userid || u.userId || u.id;
                const userName = u.username || u.name || u.fullname || '-';
                const userEmail = u.email || '-';
                const createdAt = u.created_at || u.createdAt;
                const status = u.status || 'Pending';

                return (
                  <tr key={userId}>
                    <td>{userId}</td>
                    <td>{userName}</td>
                    <td>{userEmail}</td>
                    <td>
                      {createdAt
                        ? new Date(createdAt).toLocaleString()
                        : "-"}
                    </td>
                    <td>{status}</td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="btn-sm"
                        onClick={() => openVerifyPage(userId)}
                      >
                        Verify
                      </button>
                    </td>
                  </tr>
                );
              })}

              {users.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "18px" }}>
                    No pending users.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingUsers;

// import React, { useEffect, useState } from "react";
// import { getPendingUsers } from "../../api/users";
// import { useNavigate } from "react-router-dom";
// import "../../AdminDashboard.css";

// const PendingUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const fetch = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await getPendingUsers();
//       setUsers(res.data || []);
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetch();
//   }, []);

//   const openVerifyPage = (userId) => {
//     navigate(`/admin/users/${userId}`);
//   };

//   return (
//     <div className="admin-list-card card">
//       <header className="admin-card-header">
//         <h3>Pending Users</h3>
//         <p className="muted">Users awaiting verification.</p>
//       </header>

//       {loading ? (
//         <div className="loading">Loading pending users…</div>
//       ) : error ? (
//         <div className="error">{error}</div>
//       ) : (
//         <div className="table-wrap">
//           <table className="admin-table">
//             <thead>
//               <tr>
//                 <th>User ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Created On</th>
//                 <th>Status</th>
//                 <th style={{ textAlign: "right" }}>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {users.map((u) => (
//                 <tr key={u.user_id}>
//                   <td>{u.user_id}</td>
//                   <td>{u.username}</td>
//                   <td>{u.email}</td>
//                   <td>
//                     {u.created_at
//                       ? new Date(u.created_at).toLocaleString()
//                       : "-"}
//                   </td>
//                   <td>{u.status}</td>
//                   <td style={{ textAlign: "right" }}>
//                     <button
//                       className="btn-sm"
//                       onClick={() => openVerifyPage(u.user_id)}
//                     >
//                       Verify
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {users.length === 0 && (
//                 <tr>
//                   <td colSpan="6" style={{ textAlign: "center", padding: 18 }}>
//                     No pending users.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PendingUsers;



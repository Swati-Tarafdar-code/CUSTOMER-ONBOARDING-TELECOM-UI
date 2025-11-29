// // src/pages/Admin/UsersList.jsx

// ...existing code...
import { useEffect, useState } from 'react';
import { deleteUser, getUsers, updateUserRole } from '../../api/users';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const load = async () => setUsers((await getUsers()).data);
  useEffect(() => { load(); }, []);

  // ...existing code...
  const changeRole = async (u, role) => {
    // confirmation popup before changing role
    const who = u.username || u.user_id || u.userId || 'this user';
    const ok = window.confirm(`Change role of ${who} to "${role}"? Confirm to proceed.`);
    if (!ok) return;
    try {
      await updateUserRole(u.user_id, role);
      await load();
    } catch (err) {
      console.error('Role change failed:', err);
      alert(err?.response?.data?.message || 'Failed to change role');
    }
  };

  const remove = async (id) => {
    // stronger confirmation for delete
    const ok = window.confirm(`Delete user ${id}? This action cannot be undone. Confirm to delete.`);
    if (!ok) return;
    try {
      await deleteUser(id);
      await load();
    } catch (err) {
      console.error('Delete failed:', err);
      alert(err?.response?.data?.message || 'Failed to delete user');
    }
  };
  // ...existing code...

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map(u=>(
            <tr key={u.user_id}>
              <td>{u.user_id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={()=>changeRole(u,'admin')}>Make Admin</button>
                <button onClick={()=>changeRole(u,'customer')}>Make Customer</button>
                <button onClick={()=>remove(u.user_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UsersList;
// ...existing code...


// import { useEffect, useState } from 'react';
// import { deleteUser, getUsers, updateUserRole } from '../../api/users';

// const UsersList = () => {
//   const [users, setUsers] = useState([]);
//   const load = async () => setUsers((await getUsers()).data);
//   useEffect(() => { load(); }, []);
//   const changeRole = async (u, role) => { await updateUserRole(u.user_id, role); load(); };
//   const remove = async (id) => { await deleteUser(id); load(); };

//   return (
//     <div>
//       <h2>Users</h2>
//       <table>
//         <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
//         <tbody>
//           {users.map(u=>(
//             <tr key={u.user_id}>
//               <td>{u.user_id}</td>
//               <td>{u.username}</td>
//               <td>{u.email}</td>
//               <td>{u.role}</td>
//               <td>
//                 <button onClick={()=>changeRole(u,'admin')}>Make Admin</button>
//                 <button onClick={()=>changeRole(u,'customer')}>Make Customer</button>
//                 <button onClick={()=>remove(u.user_id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default UsersList;
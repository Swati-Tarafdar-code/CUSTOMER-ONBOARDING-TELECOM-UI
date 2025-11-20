// src/pages/Admin/UsersList.jsx
import { useEffect, useState } from 'react';
import { deleteUser, getUsers, updateUserRole } from '../../api/users';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const load = async () => setUsers((await getUsers()).data);
  useEffect(() => { load(); }, []);
  const changeRole = async (u, role) => { await updateUserRole(u.userid, role); load(); };
  const remove = async (id) => { await deleteUser(id); load(); };

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map(u=>(
            <tr key={u.userid}>
              <td>{u.userid}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={()=>changeRole(u,'admin')}>Make Admin</button>
                <button onClick={()=>changeRole(u,'customer')}>Make Customer</button>
                <button onClick={()=>remove(u.userid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UsersList;
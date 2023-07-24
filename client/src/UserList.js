import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('http://localhost:5000/api/users');
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setUsers(users.filter((user) => user._id !== id));
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Vardas ir pavardė</th>
          <th>El. paštas</th>
          <th>Amžius</th>
          <th>Veiksmai</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>
              <button onClick={() => handleDelete(user._id)}>Ištrinti</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;

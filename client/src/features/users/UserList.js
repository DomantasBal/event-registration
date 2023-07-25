import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import './UserList.css';

const UserList = ({ setUser, setIsEditing }) => {
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

  const handleEdit = (user) => {
    setUser(user);
    setIsEditing(true);
  };

  return (
    <Card>
      <h3>Registruoti Asmenys</h3>
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
              <td className="form-controls">
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Ištrinti</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default UserList;

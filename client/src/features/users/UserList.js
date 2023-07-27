import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import './UserList.css';

const UserList = ({ setUser, setIsEditing }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users');
        const data = await res.json();

        const usersWithDates = data.map((user) => ({
          ...user,
          birthDate: new Date(user.birthDate),
        }));

        setUsers(usersWithDates);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age -= 1;
    }
    return age;
  };

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
              <td>{calculateAge(user.birthDate)} Metai</td>
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

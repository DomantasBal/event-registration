import React, { useState, useEffect } from 'react';
import '../../components/Button/Button.css';
import './UserList.css';

const UserList = ({ setUser, setIsEditing }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/guests');
        const data = await res.json();

        const usersWithDates = data.map((user) => ({
          ...user,
          birthDate: new Date(user.birthDate),
        }));

        setUsers(usersWithDates);
      } catch (error) {
        console.error('Error fetching guests:', error);
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

  const calculateBirthYear = (birthDate) => {
    if (!birthDate) return 'N/A';
    return new Date(birthDate).getFullYear();
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/api/guests/${id}`, {
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
    <section className="userList">
      <h3>Registruoti Asmenys</h3>
      {users.length === 0 ? (
        <p>Svečių sąrašas tuščias. Prašome užpildyti šalia esančią lentelę.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Vardas ir pavardė</th>
              <th>El. paštas</th>
              <th>Gimimo data</th>
              <th>Amžius</th>
              <th>Gimimo metai</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.birthDate.toISOString().substr(0, 10)}</td>
                <td>
                  {calculateAge(user.birthDate) !== 'N/A'
                    ? `${calculateAge(user.birthDate)} years`
                    : 'N/A'}
                </td>
                <td>{calculateBirthYear(user.birthDate)}</td>
                <td className="form-controls">
                  <button className="btn" onClick={() => handleEdit(user)}>
                    Keisti
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleDelete(user._id)}
                  >
                    Ištrinti
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default UserList;

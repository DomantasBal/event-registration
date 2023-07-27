import React, { useState, useEffect } from 'react';
import './RegistrationForm.css';
import Card from '../../components/Card/Card';

const RegistrationForm = ({ initialUser = null }) => {
  const [user, setUser] = useState(
    initialUser || { name: '', email: '', birthDate: '' }
  );
  const [isEditing, setIsEditing] = useState(!!initialUser);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
      setIsEditing(true);
    }
  }, [initialUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userToSubmit = {
      ...user,
      birthDate: user.birthDate,
    };
    const response = await fetch(
      `http://localhost:5000/api/users${
        isEditing ? `/${initialUser._id}` : ''
      }`,
      {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userToSubmit),
      }
    );
    if (response.ok) {
      setUser({ name: '', email: '', birthDate: '' });
      setIsEditing(false);
    }
  };

  return (
    <Card>
      <h3>Registracijos Forma</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Vardas ir pavardė"
          required
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="El. paštas"
          required
        />
        <input
          type="date"
          name="birthDate"
          value={user.birthDate}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? 'Update' : 'Registruotis'}</button>
      </form>
    </Card>
  );
};

export default RegistrationForm;
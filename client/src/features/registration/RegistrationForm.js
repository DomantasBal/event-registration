import React, { useState, useEffect } from 'react';
import './RegistrationForm.css';
import Card from '../../components/Card/Card';

const RegistrationForm = ({ initialUser = null }) => {
  const [user, setUser] = useState(
    initialUser || {
      name: '',
      email: '',
      birthDate: '',
      age: '',
      selectedOption: 'date',
    }
  );
  const [isEditing, setIsEditing] = useState(!!initialUser);

  useEffect(() => {
    if (initialUser) {
      setUser({ ...initialUser, selectedOption: 'date' });
      setIsEditing(true);
    }
  }, [initialUser]);

  const handleChange = (e) => {
    if (e.target.name === 'selectedOption') {
      setUser({ ...user, selectedOption: e.target.value });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let birthDateToSubmit = null;
    if (user.selectedOption === 'date') {
      birthDateToSubmit = user.birthDate;
    } else if (user.selectedOption === 'age') {
      const today = new Date();
      birthDateToSubmit = new Date(
        today.getFullYear() - user.age,
        today.getMonth(),
        today.getDate()
      );
    }

    const userToSubmit = {
      ...user,
      birthDate: birthDateToSubmit,
      age: undefined,
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
      setUser({
        name: '',
        email: '',
        birthDate: '',
        age: '',
        selectedOption: 'date',
      });
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
        <div>
          <input
            type="radio"
            name="selectedOption"
            value="date"
            checked={user.selectedOption === 'date'}
            onChange={handleChange}
          />
          <label>Gimimo data</label>
        </div>
        <div>
          <input
            type="radio"
            name="selectedOption"
            value="age"
            checked={user.selectedOption === 'age'}
            onChange={handleChange}
          />
          <label>Amžius</label>
        </div>
        {user.selectedOption === 'date' && (
          <input
            type="date"
            name="birthDate"
            value={user.birthDate}
            onChange={handleChange}
            required
          />
        )}
        {user.selectedOption === 'age' && (
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            placeholder="Amžius"
            required
          />
        )}
        <button type="submit">{isEditing ? 'Keisti' : 'Registruotis'}</button>
      </form>
    </Card>
  );
};

export default RegistrationForm;

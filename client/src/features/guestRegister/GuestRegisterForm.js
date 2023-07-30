import React, { useState, useEffect } from 'react';
import './GuestRegisterForm.css';
import Card from '../../components/Card/Card';
import '../../components/Button/Button.css';

const GuestRegisterForm = ({ initialUser = null, setIsEditing }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    birthDate: '',
    age: '',
    selectedOption: 'date',
  });

  useEffect(() => {
    if (initialUser) {
      const { name, email, birthDate } = initialUser;
      setUser({ ...initialUser });
      if (birthDate) {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        const age = today.getFullYear() - birthDateObj.getFullYear();
        setUser((prevUser) => ({ ...prevUser, age }));
      }
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
      name: user.name,
      email: user.email,
      birthDate: birthDateToSubmit,
    };

    try {
      if (initialUser) {
        const response = await fetch(
          `http://localhost:5000/api/guests/${initialUser._id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userToSubmit),
          }
        );

        if (response.ok) {
          setIsEditing(false);
        } else {
          console.error('Failed to update guest:', response);
        }
      } else {
        const response = await fetch('http://localhost:5000/api/guests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userToSubmit),
        });

        if (response.ok) {
          setIsEditing(false);
        } else {
          console.error('Failed to create guest:', response);
        }
      }
    } catch (error) {
      console.error('Error creating/updating guest:', error);
    }
  };

  return (
    <Card>
      <h3>{initialUser ? 'Redaguoti Asmenį' : 'Registracijos Forma'}</h3>
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
        <button className="btn" type="submit">
          {initialUser ? 'Keisti' : 'Registruotis'}
        </button>
      </form>
    </Card>
  );
};

export default GuestRegisterForm;

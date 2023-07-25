import React, { useState } from 'react';

const RegistrationForm = () => {
  const [user, setUser] = useState({ name: '', email: '', age: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userToSubmit = {
      ...user,
      age: Number(user.age), // Convert age to a Number
    };
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userToSubmit),
    });
    if (response.ok) {
      setUser({ name: '', email: '', age: '' });
    }
  };

  return (
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
        type="number"
        name="age"
        value={user.age}
        onChange={handleChange}
        placeholder="Amžius"
        required
      />
      <button type="submit">Registruotis</button>
    </form>
  );
};

export default RegistrationForm;

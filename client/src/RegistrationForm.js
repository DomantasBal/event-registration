import React, { useState } from 'react';

const RegistrationForm = () => {
  const [user, setUser] = useState({ name: '', email: '', age: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setUser({ name: '', email: '', age: '' });
    } catch (error) {
      console.error('A fetch error occurred:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Vardas ir pavardė"
        required
      />
      <input
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="El. paštas"
        required
      />
      <input
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

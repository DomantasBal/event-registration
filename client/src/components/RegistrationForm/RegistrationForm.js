import React, { useState } from 'react';
import Card from '../Card/Card';
import './RegistrationForm.css';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed due to server error. Please try again later.');
    }
  };

  return (
    <div className="register">
      <div>
        <Card>
          <h2 className="formTitle">Registruotis</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Vartotojo Vardas"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="El. Paštas"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Slaptažodis"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button className={'xl'} text="Registruotis" type="submit" />
          </form>
          <p>
            Turite paskyrą? <Link to="/login">Prisijungti</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationForm;

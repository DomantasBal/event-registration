import React, { useState } from 'react';
import Card from '../Card/Card';
import Button from '../Button/Button';
import './LoginForm.css';

import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (response.ok) {
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        alert('Login failed. Invalid credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed due to server error. Please try again later.');
    }
  };

  return (
    <section className="login">
      <div>
        <Card>
          <h2 className="formTitle">Prisijungti</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Vartotojo Vardas"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <Button className={'xl'} text="Prisijungti" type="submit" />
          </form>
          <p>
            Neturite paskyros? <Link to="/register">Registruotis</Link>
          </p>
        </Card>
      </div>
    </section>
  );
};

export default LoginForm;

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import './HomePage.css';

const HomePage = () => {
  return (
    <section className="home">
      <div className="homeForm">
        <h2>Welcome to Event Registration</h2>
        <p>Please select an option:</p>
        <div className="homeForm-controls">
          <Link to="/login">
            <Button className={'xl'} text="Login" />
          </Link>
          <Link to="/register">
            <Button className={'xl'} text="Register" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

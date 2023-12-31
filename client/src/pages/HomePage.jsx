import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import './HomePage.css';

const HomePage = () => {
  return (
    <section className="home">
      <div className="homeForm">
        <h2>Renginio Svečių Registracija</h2>
        <p>Pasirinkite:</p>
        <div className="homeForm-controls">
          <Link to="/login">
            <Button className={'xl'} text="Prisijungti" />
          </Link>
          <Link to="/register">
            <Button className={'xl'} text="Registruotis" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

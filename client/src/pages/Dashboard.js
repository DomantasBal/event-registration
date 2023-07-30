// Dashboard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GuestRegisterForm from '../features/guestRegister/GuestRegisterForm';
import UserList from '../features/users/UserList';
import Button from '../components/Button/Button';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="dashboard">
      <GuestRegisterForm
        initialUser={isEditing ? user : null}
        setIsEditing={setIsEditing}
      />

      <UserList setUser={setUser} setIsEditing={setIsEditing} />

      <div>
        <Link to="/home">
          <Button
            text="Back to Home"
            onClick={handleBackToHome}
            width="200px"
          />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

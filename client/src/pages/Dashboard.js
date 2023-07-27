import React, { useState } from 'react';
import GuestRegisterForm from '../features/guestRegister/GuestRegisterForm';
import UserList from '../features/users/UserList';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <GuestRegisterForm />
      <UserList setUser={setUser} setIsEditing={setIsEditing} />
    </div>
  );
};

export default Dashboard;

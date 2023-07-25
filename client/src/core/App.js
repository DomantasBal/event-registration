import React, { useState } from 'react';
import RegistrationForm from '../features/registration/RegistrationForm';
import UserList from '../features/users/UserList';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section className="dashboard">
      <RegistrationForm
        initialUser={user}
        setUser={setUser}
        setIsEditing={setIsEditing}
      />
      <UserList setUser={setUser} setIsEditing={setIsEditing} />
    </section>
  );
};

export default App;

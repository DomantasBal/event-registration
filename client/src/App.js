import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import UserList from './components/UserList/UserList';

const App = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section className="register-container">
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

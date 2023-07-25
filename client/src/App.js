import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import UserList from './UserList';

const App = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <RegistrationForm
        initialUser={user}
        setUser={setUser}
        setIsEditing={setIsEditing}
      />
      <UserList setUser={setUser} setIsEditing={setIsEditing} />
    </div>
  );
};

export default App;

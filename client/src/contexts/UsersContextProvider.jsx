import UsersContext from './UsersContext';
import { useState } from 'react';

const UsersContextProvider = ({ children }) => {

  const [userAuth, setUserAuth] = useState(null); // Store the logged-in user's data

  const handleLogin = (user) => {
      setUserAuth(user);  // Store user info when they log in
  };
  
  const handleLogout = () => {
      setUserAuth(null);  // Clear user info on logout
  };

  return (
    <UsersContext.Provider value={{ userAuth, handleLogin, handleLogout }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;
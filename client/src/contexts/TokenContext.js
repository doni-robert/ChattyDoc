import React, { createContext, useState, useEffect } from 'react';

// Create context
export const TokenContext = createContext();

// Create provider component
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Load token from sessionStorage when app starts
  useEffect(() => {
    const storedToken = sessionStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Save token to sessionStorage
  const saveToken = (newToken) => {
    setToken(newToken);
    sessionStorage.setItem('authToken', newToken);
  };

  // Clear token from sessionStorage
  const clearToken = () => {
    setToken(null);
    sessionStorage.removeItem('authToken');
  };

  return (
    <TokenContext.Provider value={{ token, saveToken, clearToken }}>
      {children}
    </TokenContext.Provider>
  );
};

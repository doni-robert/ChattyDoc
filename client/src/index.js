import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UsersContextProvider from './contexts/UsersContextProvider';
import { TokenProvider } from './contexts/TokenContext';
import { UserInfoProvider } from './contexts/UserInfoContext';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TokenProvider>
    <UsersContextProvider>
      <UserInfoProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserInfoProvider>
    </UsersContextProvider>
  </TokenProvider>
);
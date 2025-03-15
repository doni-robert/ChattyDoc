import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import io from "socket.io-client";
import API_URL from './config';

const socket = io(`${API_URL}`);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App socket={socket}/>
  </React.StrictMode>
);

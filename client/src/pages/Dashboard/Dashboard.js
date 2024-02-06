import React from 'react'
import Bar from '../../components/ui/Sidebar'
import WelcomeMessage from '../../components/ui/WelcomeMessage'
import { Outlet } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import ChatTest from '../../components/ui/ChatTest';
import { useState } from 'react';
import Notifications from '../../components/ui/Notifications'
import Contacts from '../../components/ui/Contacts'



const Dashboard = () => {

  const [selectedComponent, setSelectedComponent] = useState('chat');
  return (
    <div style={{ display: 'flex' }}>
      <Bar setSelectedComponent={setSelectedComponent}/>
      {selectedComponent === 'chat' && <ChatTest />}
      {selectedComponent === 'contacts' && <Contacts />}
      {selectedComponent === 'notifications' && <Notifications />}
      {selectedComponent === 'welcomeMessage' && <WelcomeMessage />}  
     
    </div>
  )
}

export default Dashboard
import React from 'react'
import SideBar from '../../components/ui/Sidebar'
import WelcomeMessage from '../../components/ui/WelcomeMessage'
import ChatTest from '../../components/ui/ChatTest';
import { useState } from 'react';
import Notifications from '../../components/ui/Notifications'
import Contacts from '../../components/ui/Contacts'


const Dashboard = () => {
  //State for selecting component to display beside the SideBar
  // Default set to 'dashboardHome'
  const [selectedComponent, setSelectedComponent] = useState('welcomeMessage');

  return (
    <div style={{ display: 'flex' }}>

      <SideBar setSelectedComponent={setSelectedComponent}/>

      {/* Conditional rendering to render the selectedComponent.
          Currently renders dummy components */}
      {selectedComponent === 'chat' && <ChatTest />}
      {selectedComponent === 'contacts' && <Contacts />}
      {selectedComponent === 'notifications' && <Notifications />}
      {selectedComponent === 'welcomeMessage' && <WelcomeMessage />}  
     
    </div>
  )
}

export default Dashboard
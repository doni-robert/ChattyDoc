import React from 'react'
import SideBar from '../../components/ui/Sidebar'
import HomeDashboard from '../../components/ui/HomeDashboard'
import Chat from '../../components/ui/Chat';
import { useState } from 'react';
import Notifications from '../../components/ui/Notifications'
import Contacts from '../../components/ui/Contacts'
import "../../assets/styles/dashboard.css";


const Dashboard = () => {
  //State for selecting component to display beside the SideBar
  // Default set to 'dashboardHome'
  const [selectedComponent, setSelectedComponent] = useState('homeDashboard');

  return (
    <div className='dashboard-container'>

      <SideBar setSelectedComponent={setSelectedComponent}
              />

      {/* Conditional rendering to render the selectedComponent.
          Currently renders dummy components */}
      {selectedComponent === 'chat' && <Chat />}
      {selectedComponent === 'contacts' && <Contacts />}
      {selectedComponent === 'notifications' && <Notifications />}
      {selectedComponent === 'homeDashboard' && <HomeDashboard />}  
     
    </div>
  )
}

export default Dashboard
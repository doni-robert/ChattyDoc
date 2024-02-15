import React, { useState, useEffect } from 'react'
import SideBar from '../../components/ui/Sidebar'
import Chat from '../../components/ui/Chat';
import Notifications from '../../components/ui/Notifications'
import Contacts from '../../components/ui/Contacts'
import "../../assets/styles/dashboard.css";
import HomeDashboard from './HomeDashboard';


const Dashboard = () => {
  //State for selecting component to display beside the SideBar
  // Default set to 'dashboardHome'
  const [selectedComponent, setSelectedComponent] = useState('homeDashboard');

  // State for the username
  const [username, setUsername] =  useState('')

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        // Get JWT token from localStorage
        const token = localStorage.getItem('jwtToken');

        if (!token) {
          throw new Error('JWT token not found');
        }
        console.log(token)

        // Fetch username with JWT token
        const response = await fetch('http://localhost:5000/user/get_name', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch username');
        }

        const data = await response.json();
        setUsername(data.username.charAt(0).toUpperCase() + data.username.slice(1));
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className='dashboard-container'>

      <SideBar
        setSelectedComponent={setSelectedComponent}
        username={username}
      />

      {/* Conditional rendering to render the selectedComponent.
          Currently renders dummy components */}
      {selectedComponent === 'chat' && <Chat />}
      {selectedComponent === 'contacts' && <Contacts />}
      {selectedComponent === 'notifications' && <Notifications />}
      {selectedComponent === 'homeDashboard' && <HomeDashboard username={username} />}  
     
    </div>
  )
}

export default Dashboard
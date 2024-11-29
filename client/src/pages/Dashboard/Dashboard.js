import React, { useState, useContext } from 'react';
import { UserInfoContext } from '../../contexts/UserInfoContext'; // Import the context
import SideBar from '../../components/ui/Sidebar';
import Chat from '../../components/ui/Chat';
import Notifications from '../../components/ui/Notifications';
import Contacts from '../../components/ui/Contacts';
import "../../assets/styles/dashboard.css";
import HomeDashboard from './HomeDashboard';
import Profile from '../../components/ui/Profile';

const Dashboard = () => {
  // State for selecting component to display beside the SideBar
  const [selectedComponent, setSelectedComponent] = useState('homeDashboard');

  // Use the context to get userInfo and userImage
  const { userInfo, userImage } = useContext(UserInfoContext); // Directly access userInfo and userImage from context

  const { firstName } = userInfo; // Destructure relevant fields from userInfo

  return (
    <div className='dashboard-container'>
      <SideBar
        setSelectedComponent={setSelectedComponent}
        userImage={userImage} // Pass userImage directly from context
      />

      {/* Conditional rendering to render the selectedComponent */}
      {selectedComponent === 'profile' && <Profile />}
      {selectedComponent === 'chat' && <Chat />}
      {selectedComponent === 'contacts' && <Contacts />}
      {selectedComponent === 'notifications' && <Notifications />}
      {selectedComponent === 'homeDashboard' && <HomeDashboard firstName={firstName} />}
    </div>
  );
};

export default Dashboard;

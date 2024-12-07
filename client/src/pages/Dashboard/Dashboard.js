import React, { useState, useContext } from 'react';
import { UserInfoContext } from '../../contexts/UserInfoContext';
import SideBar from '../../components/ui/Sidebar';
import Chat from '../../components/ui/Chat';
import Notifications from '../../components/ui/Notifications';
import Contacts from '../../components/ui/Contacts';
import "../../assets/styles/dashboard.css";
import HomeDashboard from './HomeDashboard';
import Profile from '../../components/ui/Profile';

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('homeDashboard');
  const { userInfo, userImage } = useContext(UserInfoContext);
  const { firstName } = userInfo;

  return (
    <div className='dashboard-container'>
      <SideBar setSelectedComponent={setSelectedComponent} userImage={userImage} />
      {selectedComponent === 'profile' && <Profile />}
      {selectedComponent === 'chat' && <Chat />}
      {selectedComponent === 'contacts' && <Contacts />}
      {selectedComponent === 'notifications' && <Notifications />}
      {selectedComponent === 'homeDashboard' && <HomeDashboard firstName={firstName} />}
    </div>
  );
};

export default Dashboard;

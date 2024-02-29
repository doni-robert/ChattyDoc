import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import "../../assets/styles/sidebar.css";


const SideBar = ({ setSelectedComponent }) => {
    // State for tracing the selected menu
    const [selectedMenuItem, setSelectedMenuItem] = useState('');

    const handleMenuItemClick = (component) => {
      setSelectedMenuItem(component);
      setSelectedComponent(component);
    };

    return (
      <div className="sidebar-container">
       <Sidebar className="sidebar">
          <Menu>
              <MenuItem className="user-profile">
                <h2> Hi User </h2>
              </MenuItem>
              <MenuItem 
                onClick={() => handleMenuItemClick('homeDashboard')} 
                icon={<HomeOutlinedIcon />}
                className={selectedMenuItem === 'homeDashboard' ? 'selected' : ''}
              >
                Home 
              </MenuItem>
              <MenuItem 
                onClick={() => handleMenuItemClick('chat')} 
                icon={<ChatBubbleOutlineOutlinedIcon />}
                className={selectedMenuItem === 'chat' ? 'selected' : ''}
              > 
                Chats
              </MenuItem>
              <MenuItem 
                onClick={() => handleMenuItemClick('contacts')} 
                icon={<PersonOutlinedIcon />}
                className={selectedMenuItem === 'contacts' ? 'selected' : ''}
              >
                Contacts
              </MenuItem>
              <MenuItem 
                onClick={() => handleMenuItemClick('notifications')}
                icon={<NotificationsNoneOutlinedIcon />}
                className={selectedMenuItem === 'notification' ? 'selected' : ''}
              >
                Notifications
              </MenuItem>
              <MenuItem icon={<CalendarMonthOutlinedIcon />}> Calendar </MenuItem>
              <MenuItem icon={<SettingsOutlinedIcon />}> Settings </MenuItem>
              {/* Lazy coding. Couldn't come up with a better way to push LOGOUT to the bottom */}
             
              <MenuItem></MenuItem>
              <MenuItem></MenuItem>
              <MenuItem></MenuItem>
              <MenuItem icon={<PowerSettingsNewOutlinedIcon />}> Logout </MenuItem>
            </Menu>
        </Sidebar>
      </div> 
    );
  };
  export default SideBar;
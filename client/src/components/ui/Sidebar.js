import React, { useState, useEffect } from 'react'
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import "../../assets/styles/sidebar.css";

const SideBar = ({ setSelectedComponent, username }) => {
    // State for tracking the selected menu
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
                <h2> Hi {username} </h2>
              </MenuItem>
              <MenuItem 
                onClick={() => handleMenuItemClick('homeDashboard')} 
                icon={<GridViewOutlinedIcon />}
                className={selectedMenuItem === 'homeDashboard' ? 'selected' : ''}
              >
                HOME 
              </MenuItem>
              <MenuItem 
                onClick={() => handleMenuItemClick('chat')} 
                icon={<ChatBubbleOutlineOutlinedIcon />}
                className={selectedMenuItem === 'chat' ? 'selected' : ''}
              > 
                CHAT 
              </MenuItem>
              <MenuItem 
                onClick={() => handleMenuItemClick('contacts')} 
                icon={<PersonOutlinedIcon />}
                className={selectedMenuItem === 'contacts' ? 'selected' : ''}
              >
                CONTACT 
              </MenuItem>
              <MenuItem 
                onClick={() => handleMenuItemClick('notifications')}
                icon={<NotificationsNoneOutlinedIcon />}
                className={selectedMenuItem === 'notification' ? 'selected' : ''}
              >
                NOTIFICATION 
              </MenuItem>
              <MenuItem icon={<CalendarMonthOutlinedIcon />}> CALENDAR </MenuItem>
              <MenuItem icon={<SettingsOutlinedIcon />}> SETTINGS </MenuItem>
              {/* Lazy coding. Couldn't come up with a better way to push LOGOUT to the bottom */}
             
              <MenuItem></MenuItem>
              <MenuItem></MenuItem>
              <MenuItem></MenuItem>
              <MenuItem icon={<PowerSettingsNewOutlinedIcon />}> LOGOUT </MenuItem>
            </Menu>
        </Sidebar>
      </div> 
    );
  };
  export default SideBar;
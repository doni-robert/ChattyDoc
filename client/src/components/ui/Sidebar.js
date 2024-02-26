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
import onlineDoctor from "../../assets/images/user_icon_001.jpg";
import UserImage from './UserImage';

const SideBar = ({ setSelectedComponent, userImage }) => {
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
              <div
                onClick={() => handleMenuItemClick('profile')}
                className="user-profile"
              >
                <img
                  src={userImage}
                  alt="online-doctor"
                  className='online-doctor'
                />
                
              </div>
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
                onClick={() => handleMenuItemClick('profile')} 
                icon={<PersonOutlinedIcon />}
                className={selectedMenuItem === 'profile' ? 'selected' : ''}
              >
                PROFILE 
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
              <MenuItem icon={<PowerSettingsNewOutlinedIcon />}> LOGOUT </MenuItem>
            </Menu>
        </Sidebar>
      </div> 
    );
  };
  export default SideBar;
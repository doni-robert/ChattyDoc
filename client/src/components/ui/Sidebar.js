import React from 'react'
import { Link } from "react-router-dom";
import { useState } from 'react';


import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import WelcomeMessage from './WelcomeMessage';

import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import ChatTest from './ChatTest';




const Bar = ({ setSelectedComponent }) => {

    return (
      <div>
       <Sidebar style={{ display: "flex", height: "100vh" }} className="app">
          <Menu>
            <MenuItem className="menu1">
              <h2>Hi User</h2>
            </MenuItem>
            <MenuItem onClick={() => setSelectedComponent('welcomeMessage')} icon={<ChatBubbleOutlineOutlinedIcon />}>  HOME  </MenuItem>
            <MenuItem onClick={() => setSelectedComponent('chat')} icon={<ChatBubbleOutlineOutlinedIcon />} > CHAT </MenuItem>
            <MenuItem onClick={() => setSelectedComponent('contacts')} icon={<PersonOutlinedIcon />}> CONTACT </MenuItem>
            <MenuItem onClick={() => setSelectedComponent('notifications')} icon={<NotificationsNoneOutlinedIcon />}> NOTIFICATION </MenuItem>
            <MenuItem icon={<CalendarMonthOutlinedIcon />}> CALENDAR </MenuItem>
            <MenuItem icon={<SettingsOutlinedIcon />}> SETTINGS </MenuItem>
            <MenuItem icon={<PowerSettingsNewOutlinedIcon />}> LOGOUT </MenuItem>
          </Menu>
        </Sidebar>
        <div>
          <Routes >
            
            <Route path="chattest" element={<ChatTest />} />

          </Routes>
          
        </div>
      

      </div>
      
 
      
    );
  };
  export default Bar;
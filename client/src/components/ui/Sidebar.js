import React from 'react'
import { Link } from "react-router-dom";


import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';

import "../../assets/styles/sidebar.css";

const Bar = () => {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar className="app">
          <Menu>
            <MenuItem className="menu1">
              <h2>Hi User</h2>
            </MenuItem>
            <MenuItem icon={<GridViewOutlinedIcon />}> HOME </MenuItem>
            <MenuItem icon={<ChatBubbleOutlineOutlinedIcon />}> CHAT </MenuItem>
            <MenuItem icon={<PersonOutlinedIcon />}> CONTACT </MenuItem>
            <MenuItem icon={<NotificationsNoneOutlinedIcon />}> NOTIFICATION </MenuItem>
            <MenuItem icon={<CalendarMonthOutlinedIcon />}> CALENDAR </MenuItem>
            <MenuItem icon={<SettingsOutlinedIcon />}> SETTINGS </MenuItem>
            <MenuItem icon={<PowerSettingsNewOutlinedIcon />}> LOGOUT </MenuItem>
          </Menu>
        </Sidebar>
        <h1>More Content Coming</h1>
      </div>
    );
  };
  export default Bar;
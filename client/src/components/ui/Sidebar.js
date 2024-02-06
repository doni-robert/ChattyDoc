import React from 'react'
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';


const SideBar = ({ setSelectedComponent }) => {

    return (
      <div>
       <Sidebar style={{ display: "flex", height: "100vh" }} className="app">
          <Menu>
            <MenuItem className="menu1"><h2> Hi User </h2></MenuItem>
            <MenuItem onClick={() => setSelectedComponent('welcomeMessage')} icon={<GridViewOutlinedIcon />}>  HOME  </MenuItem>
            <MenuItem onClick={() => setSelectedComponent('chat')} icon={<ChatBubbleOutlineOutlinedIcon />} > CHAT </MenuItem>
            <MenuItem onClick={() => setSelectedComponent('contacts')} icon={<PersonOutlinedIcon />}> CONTACT </MenuItem>
            <MenuItem onClick={() => setSelectedComponent('notifications')} icon={<NotificationsNoneOutlinedIcon />}> NOTIFICATION </MenuItem>
            <MenuItem icon={<CalendarMonthOutlinedIcon />}> CALENDAR </MenuItem>
            <MenuItem icon={<SettingsOutlinedIcon />}> SETTINGS </MenuItem>
            <MenuItem icon={<PowerSettingsNewOutlinedIcon />}> LOGOUT </MenuItem>
          </Menu>
        </Sidebar>
      </div> 
    );
  };
  export default SideBar;
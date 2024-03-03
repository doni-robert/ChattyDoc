import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import "../../assets/styles/sidebar.css";

const SideBar = ({ setSelectedComponent, userImage }) => {
  // State for tracing the selected menu
  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  const handleMenuItemClick = (component) => {
    setSelectedMenuItem(component);
    setSelectedComponent(component);
  };

  const handleLogout = () => {
    // clear token from local storage
    localStorage.removeItem("jwtToken");

    // reload page to navigate to login
    window.location.reload();
  };

  return (
    <div className="sidebar-container">
      <Sidebar className="sidebar">
        <Menu>
          <div
            onClick={() => handleMenuItemClick("profile")}
            className="user-profile"
          >
            <img src={userImage} alt="profile pic" className="profile-pic" />
          </div>
          <MenuItem
            onClick={() => handleMenuItemClick("homeDashboard")}
            icon={<HomeOutlinedIcon />}
            className={selectedMenuItem === "homeDashboard" ? "selected" : ""}
          >
            Home
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuItemClick("chat")}
            icon={<ChatBubbleOutlineOutlinedIcon />}
            className={selectedMenuItem === "chat" ? "selected" : ""}
          >
            Chats
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuItemClick("groups")}
            icon={<GroupOutlinedIcon />}
            className={selectedMenuItem === "groups" ? "selected" : ""}
          >
            Groups
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuItemClick("contacts")}
            icon={<PersonOutlinedIcon />}
            className={selectedMenuItem === "contacts" ? "selected" : ""}
          >
            Contacts
          </MenuItem>
          <MenuItem
            icon={<PowerSettingsNewOutlinedIcon />}
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};
export default SideBar;

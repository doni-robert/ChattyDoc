import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
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
          {/* to landing page */}
          <MenuItem
            onClick={() => handleMenuItemClick("homeDashboard")}
            icon={<HomeOutlinedIcon />}
            className={selectedMenuItem === "homeDashboard" ? "selected" : ""}
          >
            Home
          </MenuItem>

          {/* to chats page */}
          <MenuItem
            onClick={() => handleMenuItemClick("chat")}
            icon={<ChatBubbleOutlineOutlinedIcon />}
            className={selectedMenuItem === "chat" ? "selected" : ""}
          >
            Chats
          </MenuItem>

          {/* Logout */}
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

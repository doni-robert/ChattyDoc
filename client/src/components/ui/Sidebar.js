import React from 'react'
import { Link } from "react-router-dom";


import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "../../assets/styles/sidebar.css";

const Bar = () => {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar className="app">
          <Menu>
            <MenuItem className="menu1">
              <h2>Hi User</h2>
            </MenuItem>
            <MenuItem> HOME </MenuItem>
            <MenuItem> CHAT </MenuItem>
            <MenuItem> CONTACT </MenuItem>
            <MenuItem> NOTIFICATION </MenuItem>
            <MenuItem> CALENDAR </MenuItem>
            <MenuItem> SETTINGS </MenuItem>
            <MenuItem> LOGOUT </MenuItem>
          </Menu>
        </Sidebar>
        <h1>More Content Coming</h1>
      </div>
    );
  };
  export default Bar;
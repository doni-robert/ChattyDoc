import React from "react";
import { useState } from "react";
import SideBar from "../../components/ui/Sidebar";
import Notifications from "../../components/ui/Notifications";
import HomeDashboard from "./HomeDashboard";
import Chats from "./Chats";
import Contacts from "./Contacts";
import "../../assets/styles/dashboard.css";

const Dashboard = () => {
  //State for selecting component to display beside the SideBar
  // Default set to 'dashboardHome'
  const [selectedComponent, setSelectedComponent] = useState("homeDashboard");

  return (
    <div className="dashboard-container">
      <SideBar setSelectedComponent={setSelectedComponent} />

      {/* Conditional rendering to render the selectedComponent */}
      {selectedComponent === "chat" && <Chats />}
      {selectedComponent === "contacts" && <Contacts />}
      {selectedComponent === "notifications" && <Notifications />}
      {selectedComponent === "homeDashboard" && <HomeDashboard />}
    </div>
  );
};

export default Dashboard;

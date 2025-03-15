import React, { useState, useEffect } from "react";
import SideBar from "../../components/ui/Sidebar";
import HomeDashboard from "./HomeDashboard";
import Chats from "./Chats";
import Profile from "../../components/ui/Profile";
import "../../assets/styles/dashboard.css";
import onlineDoctor from "../../assets/images/user_icon_001.jpg";
import API_URL from "../../config";

const Dashboard = () => {
  //State for selecting component to display beside the SideBar
  // Default set to 'homeDashboard'
  const [selectedComponent, setSelectedComponent] = useState("homeDashboard");

  // State for the user info
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
  });

  const { firstName } = userInfo;

  const [userImage, setUserImage] = useState(onlineDoctor);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Get JWT token from localStorage
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          throw new Error("JWT token not found");
        }

        // Fetch user info with JWT token
        const response = await fetch(
          `${API_URL}/user/get_user_info`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await response.json();
        console.log(data);

        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Get JWT token from localStorage
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          throw new Error("JWT token not found");
        }
        console.log(token);

        // Fetch image with JWT token
        const response = await fetch(`${API_URL}/user/get_image`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        const imageBlop = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlop);
        setUserImage(imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="dashboard-container">
      <SideBar
        setSelectedComponent={setSelectedComponent}
        userImage={userImage}
      />
      {/* Conditional rendering to render the selectedComponent.*/}
      {selectedComponent === "profile" && (
        <Profile
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          userImage={userImage}
          setUserImage={setUserImage}
        />
      )}
      {selectedComponent === "chat" && <Chats />}
      {selectedComponent === "homeDashboard" && (
        <HomeDashboard firstName={firstName} />
      )}
    </div>
  );
};

export default Dashboard;

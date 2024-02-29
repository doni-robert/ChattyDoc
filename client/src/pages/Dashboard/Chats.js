import React from "react";
import { Link } from "react-router-dom";
import { Divider, Avatar, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { faker } from "@faker-js/faker";
import Conversation from "../../components/ui/Conversation";
import { ChatList } from "../../data/fake_data";
import "../../assets/styles/chats.css";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatElement = ({ id, img, name, msg, time, unread, online }) => {
  return (
    <div className="chat-element">
      <div className="contact-details">
        <div className="contact-image">
          <div className="avatar-badge">
            {online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar src={faker.image.avatar()} alt="Contact Avatar" />
              </StyledBadge>
            ) : (
              <Avatar src={faker.image.avatar()} alt="Contact Avatar" />
            )}
          </div>
        </div>
        <div className="contact-info">
          <h5>{name}</h5>
          <p>{msg}</p>
        </div>
      </div>
      <div className="time-info">
        <div>
          <Badge badgeContent={unread} color="#242657" />
        </div>
        <span>{time}</span>
      </div>
    </div>
  );
};

const Chats = () => {
  return (
    <div className="general-app">
      <div className="chat-container">
        {/* Message list header */}
        <div className="chat-title">
          <h3>Chats</h3>
          <Link to="/contacts">
            <button>New Chat</button>
          </Link>
        </div>

        {/* Search bar */}
        <div className="search-bar">
          <div className="search-container">
            <div className="search-icon">
              <SearchIcon />
            </div>
            <div className="search-input">
              <input type="text" placeholder="Search..." aria-label="Search" />
            </div>
          </div>
        </div>

        {/* Divide chat-container into 2 */}
        <Divider />

        {/* Chats section */}
        <div className="chat-list">
          <div className="pinned-chats">
            <p>Pinned</p>
            {ChatList.filter((el) => el.pinned).map((el) => {
              return <ChatElement {...el} />;
            })}
          </div>
          <div className="all-chats">
            <p>All Chats</p>
            {ChatList.filter((el) => !el.pinned).map((el) => {
              return <ChatElement {...el} />;
            })}
          </div>
        </div>
      </div>

      {/* Conversation Section */}
      <div className="conversations">
        <Conversation />
      </div>
    </div>
  );
};

export default Chats;

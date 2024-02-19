import React from "react";
import { Divider, Avatar, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { faker } from "@faker-js/faker";
import "../../assets/styles/chats.css";
import { ChatList } from "../../data/fake_data";

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
        <Badge badgeContent={unread} color="primary" />
        <p>{time}</p>
      </div>
    </div>
  );
};

const Chats = () => {
  return (
    <div className="chat-container">
      <div className="chat-title">
        <h3>Chats</h3>
        <button>New Chat</button>
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
      <Divider />

      {/* Chats section */}
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
  );
};

export default Chats;

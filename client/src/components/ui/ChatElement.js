import React from "react";
import { faker } from "@faker-js/faker";
import { styled } from "@mui/material/styles";
import { Avatar, Badge } from "@mui/material";
import "../../assets/styles/chatElement.css";

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
          <Badge badgeContent={unread} color="primary" />
        </div>
        <span>{time}</span>
      </div>
    </div>
  );
};

export default ChatElement;

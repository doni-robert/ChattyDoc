import React from "react";
import {
  Avatar,
  Badge,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhoneIcon from "@mui/icons-material/Phone";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import { styled } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import "../../assets/styles/conversation.css";

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

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

const Conversation = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        height: "100vh",
        width: "calc(100vw - 590px)",
      }}
    >
      <div className="conversation-section">
        {/* Chat header */}
        <div className="chat-header">
          <div className="header-details">
            <div className="avatar">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt={faker.person.fullName()}
                  src={faker.image.avatar()}
                />
              </StyledBadge>
            </div>
            <div className="contact-info">
              <h5>{faker.person.fullName()}</h5>
              <p>Online</p>
            </div>
          </div>
          <div className="icon-side">
            <IconButton>
              <VideocamIcon />
            </IconButton>
            <IconButton>
              <PhoneIcon />
            </IconButton>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
        </div>

        {/* Messages */}
        <div className="messages"></div>
        {/* Chat footer */}
        <div className="chat-footer">
          <div className="footer-details">
            <StyledInput
              fullWidth
              placeholder="Write a message..."
              variant="filled"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <AttachFileIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <MoodOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="send-button">
            <div className="send-icon">
              <IconButton>
                <ArrowUpwardOutlinedIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;

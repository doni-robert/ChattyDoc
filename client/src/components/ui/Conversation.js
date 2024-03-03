import { React, useState } from "react";
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
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import { faker } from "@faker-js/faker";

import "../../assets/styles/conversation.css";
import { Chat_History } from "../../data/fake_data";
import {
  DocMessage,
  LinkMessage,
  MediaMessage,
  ReplyMessage,
  TextMessage,
  Timeline,
} from "./Messages";

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
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

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
        <div className="messages-container">
          <div className="message-list-container">
            {Chat_History.map((el) => {
              switch (el.type) {
                case "divider":
                  // timeline
                  return <Timeline el={el} />;
                case "msg":
                  switch (el.subtype) {
                    case "doc":
                      // doc message
                      return <DocMessage el={el} />;
                    case "img":
                      // image message
                      return <MediaMessage el={el} />;
                    case "link":
                      // link message
                      return <LinkMessage el={el} />;
                    case "reply":
                      // reply message
                      return <ReplyMessage el={el} />;
                    default:
                      // text message
                      return <TextMessage el={el} />;
                  }

                default:
                  return <></>;
              }
            })}
          </div>
        </div>

        {/* Chat footer */}
        <div className="chat-footer">
          <div className="footer-details">
            <StyledInput
              fullWidth
              placeholder="Type a message here..."
              variant="filled"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
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
                    <IconButton onClick={() => setEmojiPicker(!emojiPicker)}>
                      <MoodOutlinedIcon />
                    </IconButton>
                    {emojiPicker ? <div className="emoji-picker"><EmojiPicker onEmojiClick={onEmojiClick} /></div> : null}
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="send-icon">
            <IconButton>
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;

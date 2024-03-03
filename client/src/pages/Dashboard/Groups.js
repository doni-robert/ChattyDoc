import { React, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Link, Divider } from "@mui/material";
import { ChatList } from "../../data/fake_data";
import ChatElement from "../../components/ui/ChatElement";
import "../../assets/styles/groups.css";
import CreateGroup from "../../components/forms/createGroup";

const Groups = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="group-section">
      <div className="group-container">
        {/* Groups list header */}
        <div className="group-header">
          <h2>Groups</h2>
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

        {/* Create group prompt */}
        <div className="create-group" component={Link}>
          <p>Create new group</p>
          <IconButton
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            <AddIcon style={{ color: "#000" }} />
          </IconButton>
        </div>

        {/* divide the sections */}
        <Divider />

        {/* Group List section */}
        <div className="group-list">
          <div className="pinned-chats">
            <p>Pinned</p>
            {ChatList.filter((el) => el.pinned).map((el) => {
              return <ChatElement {...el} />;
            })}
          </div>
          <div className="all-chats">
            <p>All Groups</p>
            {ChatList.filter((el) => !el.pinned).map((el) => {
              return <ChatElement {...el} />;
            })}
          </div>
        </div>
      </div>
      {openDialog && (
        <CreateGroup open={openDialog} handleClose={handleCloseDialog} />
      )}
    </div>
  );
};

export default Groups;

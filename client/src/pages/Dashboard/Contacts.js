import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Divider, IconButton, Avatar } from "@mui/material";
import { Contact_List } from "../../data/fake_data";
import { faker } from "@faker-js/faker";
import WelcomePage from "../../components/ui/WelcomePage";
import "../../assets/styles/contacts.css";

const ContactListElement = ({ id, img, name, about }) => {
  return (
    <div className="contact-element">
      <div className="contact-details">
        <div className="contact-image">
          <div className="avatar-badge">
            <Avatar src={faker.image.avatar()} alt="Contact Avatar" />
          </div>
        </div>
        <div className="contact-info">
          <h5>{name}</h5>
          <p>{about}</p>
        </div>
      </div>
    </div>
  );
};

const Contacts = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        height: "100vh",
        width: "calc(100vw - 250px)",
      }}
    >
      <div className="contacts-section">
        <div className="contacts-container">
          {/* create new group */}
          <div className="new-group">
            <div className="icon">
              <IconButton>
                <GroupIcon />
              </IconButton>
            </div>
            <div className="create-group">
              <p>Create New Group</p>
            </div>
          </div>

          {/* create new contact */}
          <div className="new-contact">
            <div className="icon">
              <IconButton>
                <PersonAddIcon />
              </IconButton>
            </div>
            <div className="add-contact">
              <p>Add New Contact</p>
            </div>
          </div>

          <Divider />

          {/* Contact list */}
          <div className="contact-list">
            <p>Available Contacts</p>
            {Contact_List.map((el) => {
              return <ContactListElement {...el} />;
            })}
          </div>
        </div>

        {/* welcome page section */}
        <div className="welcome">
          <WelcomePage />
        </div>
      </div>
    </div>
  );
};

export default Contacts;

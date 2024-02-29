import {React, useState} from "react";
import "../../assets/styles/welcomePage.css";

const WelcomePage = () => {
  const [page, setPage] = useState('chats');

  const getMessage = () => {
    if (page === 'chats') {
      return 'Select a chat to start messaging';
    } else if (page === 'contacts') {
      return 'Select a contact to start messaging';
    }
  };

  return (
    <div className="welcome-page">
      <div className="background-image">
        <img src="../../assets/images/welcome.jpg" alt="Doctor chatting with a patient" />
      </div>
      <div className="welcome-message">
        <p>{getMessage()}</p>
      </div>
    </div>
  );
};

export default WelcomePage;

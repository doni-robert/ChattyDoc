import React from 'react';

// Function component using arrow function syntax
const Message = ({ message }) => {
  return (
    <div className="message">
      {/* Display the sender's avatar (initial of the sender's name) */}
      <span className="message-avatar">{message.sender[0]}</span>
      <div className="message-content">
        {/* Display the sender's name */}
        <span className="message-sender">{message.sender}</span>
        {/* Display the message text */}
        <span className="message-text">{message.text}</span>
        {/* Display the message timestamp */}
        <span className="message-timestamp">{message.timestamp}</span>
      </div>
    </div>
  );
}

export default Message; 
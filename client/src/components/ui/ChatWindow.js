import React from 'react';
import Message from './Message';

// Function component using arrow function syntax
const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {/* Render each message in the chat */}
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}

export default ChatWindow;
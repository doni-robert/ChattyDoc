import React from 'react';
import Message from './Message';

const ChatWindow = ({ messages }) => {
  // Check if messages or messages.messages is undefined or empty
  const messagesArray = messages?.messages || [];

  // Log the messagesArray to debug

  return (
    <div className="chat-window">
      {/* If there are no messages, show a friendly message */}
      {messagesArray.length === 0 ? (
        <p>No messages to display</p>
      ) : (
        // Render each message in the chat
        messagesArray.map((message, index) => (
          <Message key={index} message={message} />
        ))
      )}
    </div>
  );
}

export default ChatWindow;
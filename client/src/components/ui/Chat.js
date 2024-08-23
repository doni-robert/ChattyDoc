import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import UserList from './UserList';
import '../../assets/styles/Chat.css';

// Function component using arrow function syntax
const Chat = () => {
  // State to store chat messages, organized by user
  const [messages, setMessages] = useState({});
  // State to store the list of online users
  const [onlineUsers, setOnlineUsers] = useState([]);
  // State to track the currently selected user for chat
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Simulate fetching initial data for messages and online users
    const initialMessages = {
      'Alice': [
        { id: 1, text: "Hello Alice!", sender: "You", timestamp: "10:00 AM" },
        { id: 2, text: "Hi there!", sender: "Alice", timestamp: "10:01 AM" }
      ],
      'Bob': [
        { id: 1, text: "Hello Bob!", sender: "You", timestamp: "10:05 AM" },
        { id: 2, text: "Hi!", sender: "Bob", timestamp: "10:06 AM" }
      ]
    };
    setMessages(initialMessages);

    const initialOnlineUsers = ["Alice", "Bob"];
    setOnlineUsers(initialOnlineUsers);
  }, []); // Empty dependency array means this runs once on component mount

  // Function to handle sending a new message
  const sendMessage = (text) => {
    if (selectedUser) {
      const newMessage = {
        id: (messages[selectedUser] ? messages[selectedUser].length : 0) + 1,
        text,
        sender: "You",
        timestamp: new Date().toLocaleTimeString()
      };
      // Update messages state with the new message for the selected user
      setMessages({
        ...messages,
        [selectedUser]: [...(messages[selectedUser] || []), newMessage]
      });
    }
  };

  return (
    <div className="chat-container">
      <div className="user-list">
        {/* Render the UserList component and handle user selection */}
        <UserList users={onlineUsers} onSelectUser={setSelectedUser} />
      </div>
      <div className="chat-area">
        {/* Render ChatWindow and MessageInput only if a user is selected */}
        {selectedUser ? (
          <>
            <ChatWindow messages={messages[selectedUser] || []} />
            <MessageInput sendMessage={sendMessage} />
          </>
        ) : (
          <div>Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
}

export default Chat;

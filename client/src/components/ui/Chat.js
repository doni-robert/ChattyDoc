import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import UserList from './UserList';
import '../../assets/styles/Chat.css';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Initialize Socket.IO client, adjust URL to your backend

const Chat = ({ userInfo }) => {
  // State to hold messages, where the key is the username and the value is an array of messages
  const [messages, setMessages] = useState({});
  // State to hold the currently selected user
  const [selectedUser, setSelectedUser] = useState(null);

  // Effect to handle fetching messages when the selected user changes
  useEffect(() => {
    if (selectedUser) {
      // Fetch messages for the selected user
      fetch(`/api/messages/${selectedUser}`)
        .then(response => response.json()) // Parse the JSON from the response
        .then(data => {
          // Update state with the fetched messages
          setMessages(prevMessages => ({
            ...prevMessages,
            [selectedUser]: data
          }));
        })
        .catch(error => console.error('Error fetching messages:', error)); // Handle any errors
    }


  }, [selectedUser]);

  // Function to send a message
  const sendMessage = (text) => {
    if (selectedUser) {
      const newMessage = {
        text,
        sender: {firstname: userInfo.firstName, lastname: userInfo.lastName},
        recipient: selectedUser
      };

      // Update state with the new message immediately
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser]: [...(prevMessages[selectedUser] || []), newMessage],
      }));

      // Emit the new message to the server
      socket.emit('send_message', newMessage);
    }
  };

  return (
    <div className="chat-container">
      <div className="user-list">
        <UserList onSelectUser={setSelectedUser} /> {/* Pass function to update selected user */}
      </div>
      <div className="chat-area">
        {selectedUser ? (
          <>
            <ChatWindow messages={messages[selectedUser] || []} /> {/* Display messages for selected user */}
            <MessageInput sendMessage={sendMessage} /> {/* Input component for sending messages */}
          </>
        ) : (
          <div>Select a user to start chatting</div> 
        )}
      </div>
    </div>
  );
}

export default Chat;
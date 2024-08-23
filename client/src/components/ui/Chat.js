import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import UserList from './UserList';
import '../../assets/styles/Chat.css';


const Chat = () => {
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
        sender: "You",
        user: selectedUser
      };

      // Post the new message to the server
      fetch(`/api/messages/${selectedUser}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage) // Convert the message object to JSON
      })
        .then(response => response.json()) // Parse the JSON from the response
        .then(data => {
          // Update state with the sent message
          setMessages(prevMessages => ({
            ...prevMessages,
            [selectedUser]: [...(prevMessages[selectedUser] || []), data]
          }));
        })
        .catch(error => console.error('Error sending message:', error)); // Handle any errors
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
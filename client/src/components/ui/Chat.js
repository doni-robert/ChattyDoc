import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import UserList from './UserList';
import '../../assets/styles/Chat.css';
import io from 'socket.io-client';

const Chat = ({ userInfo }) => {
  const [messages, setMessages] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);

  // Effect to initialize the socket connection
  useEffect(() => {
    if (userInfo) {
      const newSocket = io('http://localhost:5000', {
        query: {
          user_id: userInfo.email,  // Pass the user ID as a query parameter
        },
        transports: ['websocket'], // Ensure WebSocket transport is used
      });

      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      setSocket(newSocket);

      // Clean up the socket connection when the component unmounts or userInfo changes
      return () => {
        newSocket.disconnect();
      };
    }
  }, [userInfo]);

  // Effect to handle fetching messages when the selected user changes
  useEffect(() => {
    if (selectedUser) {
      fetch(`/api/messages/${selectedUser}`)
        .then(response => response.json()) // Parse the JSON from the response
        .then(data => {
          setMessages(prevMessages => ({
            ...prevMessages,
            [selectedUser]: data
          }));
        })
        .catch(error => console.error('Error fetching messages:', error)); // Handle any errors
    }
  }, [selectedUser]);

  // Effect to handle incoming messages
  useEffect(() => {
    if (socket) {
      socket.on('message_received', (newMessage) => {
        if (!newMessage || !newMessage.text || !newMessage.sender) {
          console.error('Received message is invalid:', newMessage);
          return;
        }
  
        const { sender } = newMessage;
        console.log('Received message:', sender);
  
        setMessages(prevMessages => ({
          ...prevMessages,
          [sender]: [...(prevMessages[sender] || []), newMessage],
        }));
      });
  
      // Clean up the event listener when the component unmounts or socket changes
      return () => {
        socket.off('message_received');
      };
    }
  }, [socket]);
  

  // Function to send a message
  const sendMessage = (text) => {
    if (selectedUser) {
      const newMessage = {
        text,
        sender: `${userInfo.firstName} ${userInfo.lastName}`,
        recipient: selectedUser
      };
      console.log(newMessage)

      // Update state with the new message immediately
      setMessages(prevMessages => ({
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
import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import ChatWindow from './ChatWindow'; // Component displaying the chat messages
import MessageInput from './MessageInput'; // Component to input a new message
import UserList from './UserList'; // Component listing users to chat with
import '../../assets/styles/Chat.css'; // Chat styles
import io from 'socket.io-client'; // Importing socket.io for real-time communication

// Creating a context for Socket to be accessible in the component tree
const SocketContext = createContext();

// Hook to manage socket connection, based on user information
const useSocket = (userInfo) => {
  // Local state to hold the socket connection instance
  const [socket, setSocket] = useState(null);

  // Effect to initialize and manage socket connection when `userInfo` changes
  useEffect(() => {
    if (userInfo) {
      // Creating a new socket instance and passing user email as a query parameter
      const newSocket = io('http://localhost:5000', {
        query: { user_id: userInfo.email }, // Pass the user's email in the query for identification
        transports: ['websocket'], // Use WebSocket transport
      });

      // Log the socket connection when established
      newSocket.on('connect', () => console.log('Socket connected:', newSocket.id));
      // Log any connection errors
      newSocket.on('connect_error', (error) => console.error('Socket connection error:', error));
      // Log when the socket disconnects
      newSocket.on('disconnect', () => console.log('Socket disconnected'));

      // Save the socket instance to state
      setSocket(newSocket);

      // Clean up the socket connection when the component unmounts or `userInfo` changes
      return () => newSocket.disconnect();
    }
  }, [userInfo]);

  return socket; // Return the socket instance
};

// Hook to manage fetching and updating chat messages
const useMessages = (selectedUser, socket) => {
  const [messages, setMessages] = useState([]); // State to store all messages, organized by users

  // Fetch messages from the backend when a user is selected
  const fetchMessages = useCallback(async () => {
    if (!selectedUser) return; // If no user is selected, exit early
    try {
      const token = sessionStorage.getItem('authToken'); // Get the JWT token from session storage
      if (!token) throw new Error('JWT token not found'); // Error if no token found

      // Fetching messages from the backend for the selected user
      const response = await fetch(`http://localhost:5000/message/get_messages/${selectedUser.firstname}_${selectedUser.lastname}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }, // Pass the token for authorization
      });

      if (!response.ok) throw new Error('Failed to fetch messages'); // Error if the response is not OK

      const data = await response.json(); // Convert response to JSON
      setMessages((prevMessages) => ({
        ...prevMessages,
        [`${selectedUser.firstname}_${selectedUser.lastname}`]: data, // Store messages keyed by the selected user's name
      }));

    } catch (error) {
      console.error('Error fetching messages:', error); // Log errors if any
    }
  }, [selectedUser, messages]);

  // Fetch messages whenever `selectedUser` changes
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Handle incoming messages from the socket
  useEffect(() => {
    if (socket) {
      socket.on('message_received', (newMessage) => {
        if (!newMessage || !newMessage.text || !newMessage.sender) {
          console.error('Received message is invalid:', newMessage);
          return; // Exit early if the message is invalid
        }

        // Construct the key for the sender based on their name
        const senderKey = `${newMessage.sender.firstname}_${newMessage.sender.lastname}`;

        // Update the messages state with the new message
        setMessages((prevMessages) => {
          const previousMessages = Array.isArray(prevMessages[senderKey]) ? prevMessages[senderKey] : [];
          
          return {
            ...prevMessages,
            [senderKey]: [...previousMessages, newMessage], // Add the new message to the existing ones
          };
        });
      });

      // Cleanup the event listener when the component unmounts or the socket changes
      return () => socket.off('message_received');
    }
  }, [socket, setMessages]);

  return { messages, setMessages }; // Return the messages and the function to update them
};

// Main Chat component that combines user selection, chat display, and sending messages
const Chat = ({ userInfo }) => {
  const socket = useSocket(userInfo); // Initialize the socket using the `useSocket` hook
  const [selectedUser, setSelectedUser] = useState(null); // State to hold the currently selected user
  const { messages, setMessages } = useMessages(selectedUser, socket); // Get messages and updater from `useMessages`

  // Function to send a new message
  const sendMessage = useCallback((text) => {
    if (selectedUser) { // Only send if a user is selected
      const newMessage = {
        text, // The message text
        sender: { firstname: userInfo.firstName, lastname: userInfo.lastName }, // The sender's info
        recipient: { firstname: selectedUser.firstname, lastname: selectedUser.lastname }, // The recipient's info
      };

      // Key for the recipient based on their name
      const recipientKey = `${newMessage.recipient.firstname}_${newMessage.recipient.lastname}`;
      
      // Add the new message to the chat for the selected recipient
      setMessages((prevMessages) => {
        const previousMessages = Array.isArray(prevMessages[recipientKey]) ? prevMessages[recipientKey] : [];
        
        return {
          ...prevMessages,
          [recipientKey]: [...previousMessages, newMessage], // Append the new message to existing messages
        };
      });

      // Emit the new message to the server via the socket
      socket.emit('send_message', newMessage);
    }
  }, [selectedUser, userInfo, socket, setMessages]); // Dependencies ensure this function is updated if these values change

  return (
    <SocketContext.Provider value={socket}> {/* Provide socket context to child components */}
      <div className="chat-container">
        <div className="user-list">
          <UserList onSelectUser={setSelectedUser} /> {/* Render the user list for selection */}
        </div>
        <div className="chat-area">
          {selectedUser ? ( // Show the chat if a user is selected
            <>
              <ChatWindow messages={messages[`${selectedUser.firstname}_${selectedUser.lastname}`] || []} /> {/* Display messages for selected user */}
              <MessageInput sendMessage={sendMessage} /> {/* Input for sending messages */}
            </>
          ) : (
            <div>Select a user to start chatting</div> // Message when no user is selected
          )}
        </div>
      </div>
    </SocketContext.Provider>
  );
};

export default Chat; // Export the main Chat component

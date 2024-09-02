import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import UserList from './UserList';
import '../../assets/styles/Chat.css';
import io from 'socket.io-client';

// Context for Socket
const SocketContext = createContext();

const useSocket = (userInfo) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (userInfo) {
      const newSocket = io('http://localhost:5000', {
        query: { user_id: userInfo.email },
        transports: ['websocket'],
      });

      newSocket.on('connect', () => console.log('Socket connected:', newSocket.id));
      newSocket.on('connect_error', (error) => console.error('Socket connection error:', error));
      newSocket.on('disconnect', () => console.log('Socket disconnected'));

      setSocket(newSocket);

      return () => newSocket.disconnect();
    }
  }, [userInfo]);

  return socket;
};

const useMessages = (selectedUser, socket) => {
  const [messages, setMessages] = useState({});

  const fetchMessages = useCallback(async () => {
    if (!selectedUser) return;
    try {
      console.log(selectedUser);
      const token = sessionStorage.getItem('authToken');
      if (!token) throw new Error('JWT token not found');

      const response = await fetch(`http://localhost:5000/message/get_messages/${selectedUser.firstname}_${selectedUser.lastname}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch messages');

      const data = await response.json();
      setMessages((prevMessages) => ({
        ...prevMessages,
        [`${selectedUser.firstname}_${selectedUser.lastname}`]: data,
      }));
      
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [selectedUser]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (socket) {
      socket.on('message_received', (newMessage) => {
        if (!newMessage || !newMessage.text || !newMessage.sender) {
          console.error('Received message is invalid:', newMessage);
          return;
        }

        const senderKey = `${newMessage.sender.firstname}_${newMessage.sender.lastname}`;
        console.log(senderKey);

        setMessages((prevMessages) => ({
          ...prevMessages,
          [senderKey]: [
            ...(Array.isArray(prevMessages[senderKey]) ? prevMessages[senderKey] : []),
            newMessage,
          ],
        }));
      });

      return () => socket.off('message_received');
    }
  }, [socket]);

  return { messages, setMessages };
};


const Chat = ({ userInfo }) => {
  const socket = useSocket(userInfo);
  const [selectedUser, setSelectedUser] = useState(null);
  const { messages, setMessages } = useMessages(selectedUser, socket);

  const sendMessage = useCallback((text) => {
    if (selectedUser) {
      const newMessage = {
        text,
        sender: { firstname: userInfo.firstName, lastname: userInfo.lastName },
        recipient: { firstname: selectedUser.firstname, lastname: selectedUser.lastname },
      };

      const recipientKey = `${newMessage.recipient.firstname}_${newMessage.recipient.lastname}`;
      console.log(recipientKey)
      
      setMessages((prevMessages) => ({
        ...prevMessages,
        [recipientKey]: [...(prevMessages[recipientKey] || []), newMessage],
      }));

      socket.emit('send_message', newMessage);
    }
  }, [selectedUser, userInfo, socket, setMessages]);

  return (
    <SocketContext.Provider value={socket}>
      <div className="chat-container">
        <div className="user-list">
          <UserList onSelectUser={setSelectedUser} />
        </div>
        <div className="chat-area">
          {selectedUser ? (
            <>
              <ChatWindow messages={messages[`${selectedUser.firstname}_${selectedUser.lastname}`] || []} />
              <MessageInput sendMessage={sendMessage} />
            </>
          ) : (
            <div>Select a user to start chatting</div>
          )}
        </div>
      </div>
    </SocketContext.Provider>
  );
};

export default Chat;
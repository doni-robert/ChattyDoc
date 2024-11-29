import React, { createContext, useState, useEffect } from 'react';

// Create a Context for User Info
export const UserInfoContext = createContext();

// Create a Provider component
export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: ''
  });
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Get JWT token from sessionStorage or localStorage
        const token = sessionStorage.getItem('authToken');

        if (!token) {
          throw new Error('JWT token not found');
        }

        // Fetch user info with JWT token
        const response = await fetch('http://localhost:5000/user/get_user_info', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const data = await response.json();
        setUserInfo(data);

      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const fetchImage = async () => {
      try {
        // Get JWT token from localStorage
        const token = localStorage.getItem('jwtToken');

        if (!token) {
          throw new Error('JWT token not found');
        }

        // Fetch image with JWT token
        const response = await fetch('http://localhost:5000/user/get_image', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }

        const imageBlop = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlop);
        setUserImage(imageUrl);

      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchUserInfo();
    fetchImage();
  }, []);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo, userImage, setUserImage }}>
      {children}
    </UserInfoContext.Provider>
  );
};

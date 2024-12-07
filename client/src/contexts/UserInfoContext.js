import React, { createContext, useState, useEffect, useContext } from 'react';
import { TokenContext } from './TokenContext';

// Create a Context for User Info
export const UserInfoContext = createContext();

const DEFAULT_IMAGE_URL = '/assets/images/user_icon_001.jpg';

// Create a Provider component
export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: ''
  });
  const [userImage, setUserImage] = useState(DEFAULT_IMAGE_URL);

  const { token } = useContext(TokenContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          console.warn('JWT token not found');
          return;
        }

        // Fetch user info and image in parallel
        const [userInfoResponse, imageResponse] = await Promise.all([
          fetch('http://localhost:5000/user/get_user_info', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:5000/user/get_image', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!userInfoResponse.ok) {
          throw new Error('Failed to fetch user info');
        }
        const userInfoData = await userInfoResponse.json();
        setUserInfo(userInfoData);

        if (!imageResponse.ok) {
          throw new Error('Failed to fetch image');
        }
        const imageBlob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setUserImage(imageUrl);

        // Clean up the object URL to avoid memory leaks
        return () => URL.revokeObjectURL(imageUrl);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo, userImage, setUserImage }}>
      {children}
    </UserInfoContext.Provider>
  );
};

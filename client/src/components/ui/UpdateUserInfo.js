import React, { useState, useEffect, useContext } from 'react';
import { UserInfoContext } from '../../contexts/UserInfoContext'; // Import the context
import { TokenContext } from '../../contexts/TokenContext';

const UpdateUserInfo = () => {
  const { userInfo, setUserInfo, userImage, setUserImage } = useContext(UserInfoContext); 

  const [firstName, setFirstName] = useState(userInfo.firstName || '');
  const [lastName, setLastName] = useState(userInfo.lastName || '');
  const [bio, setBio] = useState(userInfo.bio || '');

  const { token } = useContext(TokenContext);
  
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUserInfo = { firstName, lastName, bio };
    setUserInfo(updatedUserInfo);  // Trigger context update
    setIsUpdating(true);  // Trigger update operation
  };

  const [isUpdating, setIsUpdating] = useState(false);


  useEffect(() => {
    // Function to update user data
    const updateUserInfo = async () => {
      if (isUpdating) {
      // Logic to update user data...
        try {     

          if (!token) {
            throw new Error('JWT token not found');
          }
          

          const userInfoJSON = JSON.stringify(userInfo);
          // console.log(userInfoJSON)
          

          // Fetch user info with JWT token
          const response = await fetch('http://localhost:5000/user/update_user_info', {
            method: 'POST',
            body: userInfoJSON,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (!response.ok) {
            throw new Error('Failed to update user info');
          }

          alert('Profile updated successfully!');
          } catch (error) {
            // Handle errors
            console.error('Error updating user info:', error);
          } finally {
            setIsUpdating(false);
          }
        }
      };

    // Call updateUserData when userData changes
    updateUserInfo();
  }, [isUpdating, userInfo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file from the input element
    const reader = new FileReader(); // Create a new instance of FileReader
  
    // Define an onload event handler for when the file is successfully loaded
    reader.onload = () => {
      // Set the image data to the result of FileReader's read operation
      setUserImage(reader.result);
    };
  
    // Define an onerror event handler for handling errors during file reading
    reader.onerror = () => {
      // Log an error message if there's an error reading the file
      console.error("Error occurred while reading the file.");
    };
  
    // Check if the file exists (is not null or undefined)
    if (file) {
      // Start reading the content of the specified file as a data URL
      reader.readAsDataURL(file);
    }
  };


  const handleImageUpload = async () => {
    if (!userImage) {
      alert('No image selected!');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', userImage);
  
    if (!token) {
      throw new Error('JWT token not found');
    }
  
    try {
      const response = await fetch('http://localhost:5000/user/upload_image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        alert('Profile picture updated successfully');
      } else {
        alert('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };
  

 


  return (
    <div className='user-container'>
      <div className='header-container'>
            <h2>Update Profile</h2>
      </div>
      <div>
        <h3>Change profile picture</h3>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleImageUpload}>Upload</button>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Change details</h3>
        <label htmlFor="firstName">First Name:</label>
        <input
          className='text-input' 
          type="text" 
          id="firstName" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
        /><br/><br/>

        <label htmlFor="lastName">Last Name:</label>
        <input 
          className='text-input'
          type="text" 
          id="lastName" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
        /><br/><br/>

        <div className='bio-input-container'>
          <label htmlFor="bio">About You:</label>
          <textarea
            
            className='bio-input'
            type="text" 
            id="bio" 
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
          /><br/><br/>
        </div>
        

        <button type="submit">Save Changes</button>
      </form>
      <br/><br/>

   

    </div>
  );
}

export default UpdateUserInfo;
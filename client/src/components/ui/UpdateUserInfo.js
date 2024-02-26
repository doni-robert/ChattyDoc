import React, { useState, useEffect } from 'react';

const UpdateUserInfo = ({ userInfo, setUserInfo, userImage, setUserImage }) => {
  // State variables to store the form data
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [email, setEmail] = useState(userInfo.email);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Package the form data
    const forData = {
      firstName: firstName,
      lastName: lastName,
      email: email
    };
    // Call onSave prop to save the changes
    setUserInfo(forData);

    
  };

  useEffect(() => {
    // Function to update user data
    const updateUserInfo = async () => {
      // Logic to update user data...
      try {
        // Get JWT token from localStorage
        const token = localStorage.getItem('jwtToken');

        if (!token) {
          throw new Error('JWT token not found');
        }
        console.log('Shouldnt run')
        

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
        console.log(response)
        
        if (!response.ok) {
          throw new Error('Failed to update user info');
        }
        } catch (error) {
          // Handle errors
          console.error('Error updating user info:', error);
        }
      };

    // Call updateUserData when userData changes
    updateUserInfo();
  }, [userInfo]);

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

  // useEffect(() => {
  //   // Function to update user image
  //   const updateUserImage = async () => {
  //     try {
  //       // Get JWT token from localStorage
  //       const token = localStorage.getItem('jwtToken');

  //       if (!token) {
  //         throw new Error('JWT token not found');
  //       }

  //       // Create form data
  //       // const formData = new FormData();
  //       // formData.append('image', userImage);
  //       // console.log('Is this woking?')

  //       // Fetch user image with JWT token
  //       const response = await fetch('http://localhost:5000/user/upload_image', {
  //         method: 'POST',
  //         body: userImage, // Send the image data as form data
  //         headers: {
  //           "Content-Type": "image/jpeg",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       console.log(userImage)

  //       if (!response.ok) {
  //         throw new Error('Failed to upload user image');
  //       }
  //     } catch (error) {
  //       // Handle errors
  //       console.error('Error uploading user image:', error);
  //     }
  //   };

  //   // Call updateUserImage when userImage changes
  //   // if (userImage) {
  //   //   updateUserImage();
  //   // }
  //   updateUserImage();
  // }, [userImage]);

  const handleImageUpload = async () => {
    
    const formData = new FormData();
    formData.append('image', userImage);


    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('JWT token not found');
    }

    try {
      const response = await fetch('http://localhost:5000/user/upload_image', {
        method: 'POST',
        
        headers: {
          Authorization: `Bearer ${token}`,
          enctype: "multipart/form-data"
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

  // useEffect(() => {
  //   const updateUserImage = async () => {
  //     try {
  //       const formData = new FormData();
  //       formData.append('image', userImage);

  //       const token = localStorage.getItem('jwtToken');
  //       if (!token) {
  //         throw new Error('JWT token not found');
  //       }
  //       console.log(formData)

  //       const response = await fetch('http://localhost:5000/user/upload_image', {
  //         method: 'POST',
  //         body: formData,
  //         headers: {
  //           enctype:"multipart/form-data",
  //           'Content-Type': 'multipart/form-data',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       console.log('response body', response.body)
        

  //       if (!response.ok) {
  //         throw new Error('Failed to upload user image');
  //       }
        
  //     } catch (error) {
  //       console.error('Error uploading user image:', error);
  //     }
  //   };

    
  //   updateUserImage();
    
  // }, [userImage]);



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input 
          type="text" 
          id="firstName" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
        /><br/><br/>

        <label htmlFor="lastName">Last Name:</label>
        <input 
          type="text" 
          id="lastName" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
        /><br/><br/>

        <label htmlFor="email">Profile Picture URL:</label>
        <input 
          type="text" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        /><br/><br/>

        <label htmlFor="image">Profile Picture:</label>
        {/* <form enctype="multipart/form-data" method='post'>
        <input
          name="image" 
          type="file" 
          enctype="multipart/form-data" 
          accept="image/*" 
          onChange={handleFileChange}
        /><br/><br/>
        <button onClick={handleImageUpload}>Upload</button>

          

        </form> */}
        

        <button type="submit">Save Changes</button>
      </form>

    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleImageUpload}>Upload</button>
    </div>

    </div>
  );
}

export default UpdateUserInfo;
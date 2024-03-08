import React, { useState, useEffect } from "react";
import onlineDoctor from "../../assets/images/user_icon_001.jpg";

const UserImage = () => {
  const [userImage, setUserImage] = useState(onlineDoctor);

  // const handleUpload = async() => {
  //   if (userImage === onlineDoctor) {
  //     alert('Please select an image');
  //     return;
  //   }

  //   try {
  //     const token = localStorage.getItem('jwtToken');

  //       if (!token) {
  //         throw new Error('JWT token not found');
  //       }
  //       console.log(token)

  //     const formData = new FormData();
  //     formData.append('image', userImage);

  //     const response = await fetch('http://localhost:5000/user/upload_image', {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: formData
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to upload image');
  //     }

  //     console.log('Image upload successful:', response.data);
  //     // Update user's image displayed in the component if needed
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     // Handle error
  //   }
  // };

  // const handleImageChange = (event) => {
  //   setUserImage(event.target.files[0]);
  // };

  return (
    <div>
      <label htmlFor="fileInput">
        <img src={userImage} alt="online-doctor" className="online-doctor" />
        {/* <input
          id="fileInput"
          type="file"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          onClick={handleUpload}
        /> */}
      </label>
      {/* <button onClick={handleUpload}>Upload</button> */}
    </div>
  );
};

export default UserImage;

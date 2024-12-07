import React, { useContext, useState } from 'react'
import "../../assets/styles/profile.css";
import UserInfo from './UserInfo';
import UpdateUserInfo from './UpdateUserInfo';

const Profile = () => {
  return (
    <div className='profile-container'>
      <div className='user-info-container'>
        <UserInfo />
      </div>
      <div className='update-info-container'>
        <UpdateUserInfo
        />
      </div>
    </div>
  )
}

export default Profile
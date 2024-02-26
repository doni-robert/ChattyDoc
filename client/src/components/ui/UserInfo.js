import React from 'react'
import UserImage from './UserImage';

const UserInfo = ({userInfo, userImage}) => {
  return (
    <div>
        <h2>Profile</h2>
        <div>
        <img
            src={userImage}
            alt="online-doctor"
            className='online-doctor'
        />

        </div>
        <div className='user-details-container'>
            <div className='user-details'>
                <h4>Email</h4>
                <h4>{userInfo.email}</h4>

            </div>
            <div className='user-details'>
                <h4>First Name</h4>
                <h4>{ userInfo.firstName }</h4>

            </div>
            <div className='user-details'>
                <h4>Last Name</h4>
                <h4>{ userInfo.lastName }</h4>

            </div>
            <button className='edit-info-button'>Edit your information</button>
        </div>
    </div>
  )
}

export default UserInfo
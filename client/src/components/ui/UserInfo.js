import React from 'react'
import UserImage from './UserImage';

const UserInfo = ({userInfo, userImage}) => {
  return (
    <div>
        <div className='header-container'>
            <h2>Profile</h2>
        </div>
        
        <div className='image-container'>
        <img
            src={userImage}
            alt="profile pic"
            className='profile-pic'
        />

        </div>
        <div className='user-details-container'>
            <div className='user-details'>
                <h4 className='info-key'>Email</h4>
                <h4 className='info-value'>{userInfo.email}</h4>

            </div>
            <div className='user-details'>
                <h4 className='info-key'>First Name</h4>
                <h4 className='info-value'>{ userInfo.firstName }</h4>

            </div>
            <div className='user-details'>
                <h4 className='info-key'>Last Name</h4>
                <h4 className='info-value'>{ userInfo.lastName }</h4>

            </div>
        </div>
    </div>
  )
}

export default UserInfo
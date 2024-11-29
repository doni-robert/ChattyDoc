import React, { useState, useEffect, useContext } from 'react';
import { UserInfoContext } from '../../contexts/UserInfoContext'; // Import the context

const UserList = ({ onSelectUser }) => {
  const { userInfo } = useContext(UserInfoContext); // Get userInfo from context
  const [users, setUsers] = useState([]);

  // Fetch users from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/user/get_users')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          return response.json(); // Parse the JSON response
        } else {
          throw new Error('Expected JSON response');
        }
      })
      .then(data => {
        if (Array.isArray(data.users)) {
          setUsers(data.users); // Set the users state with the fetched data
        } else {
          throw new Error('Invalid data format: users is not an array');
        }
      })
      .catch(error => console.error('Error fetching users:', error)); // Handle errors
  }, []);

  // Filter users based on the role
  const filteredUsers = userInfo.role === 'user'
    ? users.filter(user => user.role === 'doctor') // Show only doctors for regular users
    : users; // Show all users for other roles

  return (
    <div className="user-list">
      <h2>Users</h2>
      <ul>
        {filteredUsers.map(user => (
          <li
            key={`${user.firstname}-${user.lastname}`}
            onClick={() => onSelectUser(user)} // Pass the selected user to the parent
          >
            {user.firstname} {user.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

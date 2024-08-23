import React from 'react';

// Function component using arrow function syntax
const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="user-list">
      <h2>Users</h2>
      <ul>
        {/* Map over the list of users and render each user as a list item */}
        {users.map((user) => (
          <li key={user} onClick={() => onSelectUser(user)}>
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
import React, { useState, useEffect } from 'react';

const SearchDoctor = () => {
  // State for the term being searched
  const [searchTerm, setSearchTerm] = useState('');
  // State for the list of found doctors
  const [foundDoctors, setFoundDoctors] = useState([]);
  // State to handle loading state or errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Triggers search by pressing 'Enter'
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Fetch users from the backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/user/get_users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      return data.users; // Assuming the users are in the `users` array
    } catch (err) {
      setError('Error fetching users: ' + err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Perform the search based on the specialty
  const handleSearch = async () => {
    const users = await fetchUsers();
    
    // Filter only doctors and match the specialty with the search term
    const filteredResults = users.filter(
      (user) =>
        user.role === 'doctor' && 
        user.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFoundDoctors(filteredResults);
  };

  return (
    <div className="search-container">
      <div className="search-form">
        <div className="search-prompt">Which sort of doctor are you looking for?</div>
        <input
          type="text"
          className="search-prompt"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter specialty here"
        />
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <div className="scrollable-list">
        <ul className="search-results">
          {foundDoctors.map((doctor, index) => (
            <li key={index}>
              Dr. {doctor.firstname} {doctor.lastname} - {doctor.specialty}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchDoctor;

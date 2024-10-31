// GymList.js
import React, { useEffect, useState } from 'react';

const GymList = () => {
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch members from API
  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/member');
      const data = await response.json();
      if (response.ok) {
        setMembers(data.data); // Set the members state
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  // Call fetchMembers on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div>
      <h2>Gym Members List</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.nickname} - {member.fullname} - {member.email} (Start: {member.start_date}, End: {member.end_date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GymList;

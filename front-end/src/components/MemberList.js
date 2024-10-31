// GymList.js
import React, { useEffect, useState } from 'react';

const GymList = ({ setMemberToEdit }) => {
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

  // Delete member
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/member/${id}`, {
          method: 'DELETE',
        });

        const data = await response.json();
        if (response.ok) {
          setMessage(data.message); // Set success message
          fetchMembers(); // Refresh the member list
        } else {
          setMessage(data.message); // Set error message
        }
      } catch (error) {
        console.error('Error deleting member:', error);
        setMessage('Failed to delete member.');
      }
    }
  };

  return (
    <div>
      <h2>Gym Members List</h2>
      {message && <div style={{ color: 'blue' }}>{message}</div>}
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.nickname} - {member.fullname} - {member.email} (Start: {member.start_date}, End: {member.end_date})
            <button onClick={() => setMemberToEdit(member)}>Edit</button>
            <button onClick={() => handleDelete(member.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GymList;

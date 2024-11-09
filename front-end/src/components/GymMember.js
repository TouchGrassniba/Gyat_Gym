import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddGym from './AddMember';
import Cookies from 'js-cookie';

const GymMember = () => {
  const [members, setMembers] = useState([]);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const navigate = useNavigate();

  // Fetch all members with Authorization header
  const fetchMembers = async () => {
    try {
      const token = Cookies.get('token');  // Get the token from cookies

      const response = await fetch('http://localhost:8000/api/member', {
        headers: {
          'Authorization': `Bearer ${token}`,  // Add the token to the Authorization header
        },
      });

      const data = await response.json();
      if (response.ok) {
        setMembers(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div 
      style={{
        backgroundColor: '#021526',
        padding: '20px',
        minHeight: '100vh',  // Full viewport height
        display: 'flex',     // Use flexbox to ensure it stretches vertically
        flexDirection: 'column', // Align items vertically
        justifyContent: 'flex-start',  // Align content at the top of the container
        position: 'relative', // Required for absolute positioning of the Home button
        overflow:'hidden'
      }}
    >
      {console.log(members)}
      <AddGym fetchMembers={fetchMembers} memberToEdit={memberToEdit} setMemberToEdit={setMemberToEdit} />
    </div>
  );
};

export default GymMember;

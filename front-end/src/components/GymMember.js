import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import AddGym from './AddMember';

const GymMember = () => {
  const [members, setMembers] = useState([]);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const navigate = useNavigate();

  // Fetch all members
  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/member');
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
        position: 'relative' // Required for absolute positioning of the Home button
      }}
    >
      {/* Home Button in Top-Right */}
      <Link to="/" style={{ position: 'absolute', top: '20px', right: '60px' }}>
        <Button variant="light" className="mr-2">
          Home
        </Button>
      </Link>
  
    
      {console.log(members)}
      <AddGym fetchMembers={fetchMembers} memberToEdit={memberToEdit} setMemberToEdit={setMemberToEdit} />
      
      <Button style={{ width: '15%' }} variant="primary" className="mt-3" onClick={() => navigate('/memberlist')}>
        View Member List
      </Button>
    </div>
  );
};

export default GymMember;

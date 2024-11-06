import React, { useEffect, useState } from 'react';
import { Button, Container, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddGym from './AddMember';

const GymMember = () => {
  const [members, setMembers] = useState([]);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const navigate = useNavigate();

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
    <Container className="mt-5">
   {console.log(members)}
      <AddGym fetchMembers={fetchMembers} memberToEdit={memberToEdit} setMemberToEdit={setMemberToEdit} />
      <Button variant="primary" className="mt-3" onClick={() => navigate('/memberlist')}>
        View Member List
      </Button>
      
      
    </Container>
  );
};

export default GymMember;

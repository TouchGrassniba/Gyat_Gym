import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import AddGym from './AddMember';
import GymList from './MemberList';

const GymMember = () => {
  const [members, setMembers] = useState([]);
  const [memberToEdit, setMemberToEdit] = useState(null);

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
      <AddGym fetchMembers={fetchMembers} memberToEdit={memberToEdit} setMemberToEdit={setMemberToEdit} />
      <GymList members={members} fetchMembers={fetchMembers} setMemberToEdit={setMemberToEdit} />
    </Container>
  );
};

export default GymMember;

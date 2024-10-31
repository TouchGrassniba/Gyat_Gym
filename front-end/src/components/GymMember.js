// GymMember.js
import React, { useState } from 'react';
import AddGym from './AddGym';
import GymList from './GymList';

const GymMember = () => {
  const [memberToEdit, setMemberToEdit] = useState(null);

  const fetchMembers = () => {
    // This function can be used to trigger a refetch if needed
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <AddGym fetchMembers={fetchMembers} memberToEdit={memberToEdit} setMemberToEdit={setMemberToEdit} />
      <GymList setMemberToEdit={setMemberToEdit} />
    </div>
  );
};

export default GymMember;

// GymMember.js
import React from 'react';
import AddGym from './AddGym';
import GymList from './GymList';

const GymMember = () => {
  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <AddGym fetchMembers={() => {}} /> {/* Pass a placeholder function for now */}
      <GymList />
    </div>
  );
};

export default GymMember;

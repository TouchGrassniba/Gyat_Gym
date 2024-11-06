import React from 'react';

const DeleteMember = ({ id, fetchMembers }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/member/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) fetchMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <button variant="danger" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteMember;

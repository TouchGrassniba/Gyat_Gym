import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

const GymList = ({ members, fetchMembers, setMemberToEdit }) => {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/member/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        fetchMembers();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="text-center">Gym Members List</h2>
        <ListGroup>
          {members.map((member) => (
            <ListGroup.Item key={member.id}>
              <div>
                <strong>{member.nickname}</strong> - {member.fullname} - {member.email} (Start: {member.start_date}, End: {member.end_date})
                <Button variant="warning" onClick={() => setMemberToEdit(member)} className="ml-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(member.id)} className="ml-2">
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default GymList;

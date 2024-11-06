import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Modal, Form } from 'react-bootstrap';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const [editForm, setEditForm] = useState({
    nickname: '',
    fullname: '',
    email: '',
    start_date: '',
    end_date: ''
  });

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/member/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        fetchMembers();
        alert(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleEditClick = (member) => {
    setMemberToEdit(member);
    setEditForm(member);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/member/${memberToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      });
      const data = await response.json();
      if (response.ok) {
        fetchMembers();
        alert(data.message);
        setShowEditModal(false);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="text-center">Gym Members List</h2>
        <ListGroup>
          {members.length > 0 ? (
            members.map((member) => (
              <ListGroup.Item key={member.id}>
                <div>
                  <strong>{member.nickname}</strong> - {member.fullname} - {member.email}
                  <Button
                    variant="warning"
                    className="ml-2"
                    onClick={() => handleEditClick(member)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => handleDelete(member.id)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <p className="text-center">No members found.</p>
          )}
        </ListGroup>
      </div>

      {/* Modal for Edit Form */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNickname">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                name="nickname"
                value={editForm.nickname}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formFullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={editForm.fullname}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={editForm.start_date}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={editForm.end_date}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemberList;

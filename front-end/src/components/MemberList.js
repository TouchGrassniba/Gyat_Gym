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
    <div className="container-fluid" style={styles.container}>
      

      <h2 className="text-center mb-4" style={styles.title}>Gym Members List</h2>
      <ListGroup>
        {members.length > 0 ? (
          members.map((member) => (
            <ListGroup.Item key={member.id} style={styles.listGroupItem}>
              <div>
                <strong style={styles.memberName}>{member.nickname}</strong> - {member.fullname} - {member.email}
                <div style={{ marginTop: '10px' }}> {/* Added gap between the text and buttons */}
                  <Button
                    variant="warning"
                    className="ml-2"
                    onClick={() => handleEditClick(member)}
                    style={styles.button}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => handleDelete(member.id)}
                    style={{ ...styles.button, marginLeft: '10px' }}  // Added gap between Edit and Delete buttons
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <p className="text-center" style={styles.noMembers}>No members found.</p>
        )}
      </ListGroup>

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
                style={styles.formControl}
              />
            </Form.Group>
            <Form.Group controlId="formFullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={editForm.fullname}
                onChange={handleEditChange}
                style={styles.formControl}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                style={styles.formControl}
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={editForm.start_date}
                onChange={handleEditChange}
                style={styles.formControl}
              />
            </Form.Group>
            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={editForm.end_date}
                onChange={handleEditChange}
                style={styles.formControl}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)} style={styles.button}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit} style={styles.button}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#1c1c28', // Dark background matching the card color
    color: 'white',
    minHeight: '100vh',  // Full screen
    fontFamily: 'Roboto, sans-serif',
    paddingBottom: '30px', // Prevents content from being cut off at the bottom
    paddingTop: '20px', // Adds top padding for spacing
  },
  title: {
    color: '#3498db',
    textShadow: '0 0 5px rgba(52, 152, 219, 0.6)',
  },
  listGroupItem: {
    backgroundColor: '#2c3e50',
    border: 'none',
    color: '#95a5a6',
    boxShadow: '0 0 10px rgba(52, 152, 219, 0.4)',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  memberName: {
    color: '#e74c3c',
  },
  button: {
    backgroundColor: '#e74c3c',
    borderColor: '#e74c3c',
    boxShadow: '0 0 10px rgba(231, 76, 60, 0.8)',
    transition: 'all 0.3s ease',
    marginTop: '10px',
  },
  formControl: {
    backgroundColor: '#2c3e50',
    border: 'none',
    color: '#fff',
  },
  noMembers: {
    color: '#95a5a6',
    textAlign: 'center',
  }
};

export default MemberList;

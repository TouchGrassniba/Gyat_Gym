import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Modal, Form, Toast } from 'react-bootstrap';
import Cookies from 'js-cookie';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [editForm, setEditForm] = useState({
    nickname: '',
    fullname: '',
    email: '',
    paket: '',
  });
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const token = Cookies.get('token');  // Retrieve the token from cookies

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/member', {
        headers: {
          'Authorization': `Bearer ${token}`,
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

  const handleDelete = async () => {
    if (!memberToDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/api/member/${memberToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        fetchMembers();
        setToastMessage(data.message);
        setShowToast(true);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  const handleEditClick = (member) => {
    setMemberToEdit(member);
    setEditForm({
      nickname: member.nickname,
      fullname: member.fullname,
      email: member.email,
      paket: member.paket,
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const calculateEndDate = (paketChoice) => {
    const currentDate = new Date();
    if (paketChoice === '2 Months Package') {
      currentDate.setMonth(currentDate.getMonth() + 2);
    } else if (paketChoice === '1 Month Package') {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return currentDate.toISOString().split('T')[0];
  };

  const handleEditSubmit = async () => {
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = calculateEndDate(editForm.paket);

    try {
      const response = await fetch(`http://localhost:8000/api/member/${memberToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editForm,
          start_date: startDate,
          end_date: endDate,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        fetchMembers();
        setToastMessage(data.message);
        setShowToast(true);
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
                <strong style={styles.memberName}>{member.nickname}</strong> - {member.fullname} - {member.start_date} - {member.end_date} - {member.email}
                <div style={{ marginTop: '10px' }}>
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(member)}
                    style={styles.button}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(member)}
                    style={{ ...styles.button, marginLeft: '10px' }}
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
                style={
                  styles.formControl}
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
            <Form.Group controlId="formPaket">
              <Form.Label>Paket</Form.Label>
              <Form.Control
                as="select"
                name="paket"
                value={editForm.paket}
                onChange={handleEditChange}
                style={styles.formControl}
              >
                <option value="">Select a package</option>
                <option value="2 Months Package">2 Months Package</option>
                <option value="1 Month Package">1 Month Package</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleEditSubmit} style={styles.button}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={() => setShowEditModal(false)} style={styles.button}>
            Cancel
          </Button>
         
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this member?
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={handleDelete} style={styles.button}>
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)} style={styles.button}>
            Cancel
          </Button>
          
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={styles.toast}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#1c1c28',
    color: 'white',
    minHeight: '100vh',
    fontFamily: 'Roboto, sans-serif',
    paddingBottom: '30px',
    paddingTop: '20px',
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
  },
  toast: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#2c3e50',
    color: 'white',
    boxShadow: '0px 0px 10px rgba(52, 152, 219, 0.8)',
  },
};

export default MemberList;

import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const AddGym = ({ fetchMembers, memberToEdit, setMemberToEdit }) => {
  const [nickname, setNickname] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();  // Use useNavigate hook

  // Set form fields when member is selected for editing
  useEffect(() => {
    if (memberToEdit) {
      setNickname(memberToEdit.nickname);
      setFullname(memberToEdit.fullname);
      setEmail(memberToEdit.email);
      setStartDate(memberToEdit.start_date);
      setEndDate(memberToEdit.end_date);
    } else {
      setNickname('');
      setFullname('');
      setEmail('');
      setStartDate('');
      setEndDate('');
    }
  }, [memberToEdit]);

  // Submit the form (add or update member)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMember = { nickname, fullname, email, start_date: startDate, end_date: endDate };

    try {
      const method = memberToEdit ? 'PUT' : 'POST';
      const url = memberToEdit ? `http://localhost:8000/api/member/${memberToEdit.id}` : 'http://localhost:8000/api/member';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        fetchMembers();
        setMemberToEdit(null); // Clear member to edit
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error adding/updating member:', error);
      setMessage('Failed to add/update member.');
    }
  };

  return (
    <div className="card mt-2" style={styles.card}>
      <div className="card-body" style={styles.cardBody}>
        <h2 className="text-center" style={styles.title}>
          {memberToEdit ? 'Edit Gym Member' : 'Add Gym Member'}
        </h2>
        {message && <Alert variant="info">{message}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="formNickname" style={styles.label}>Nickname</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="formFullname" style={styles.label}>Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="formEmail" style={styles.label}>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="formStartDate" style={styles.label}>Start Date</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="formEndDate" style={styles.label}>End Date</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div style={styles.buttonContainer}> {/* Flexbox layout for buttons */}
            <Button variant="danger" type="submit" className="btn-sm mt-2 p-2 fs-6">
              {memberToEdit ? 'Update' : 'Submit'}
            </Button>

            <Button
              variant="primary"
              className="btn-sm p-2 fs-6"  // Added fs-5 to make the font slightly bigger
              onClick={() => navigate('/memberlist')}
            >
              View Member List
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#1c1c28',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(52, 152, 219, 0.4)',
    padding: '20px',
    marginTop: '10px',
    marginBottom: '20px',
    overflow: 'hidden',  // Prevent scrolling here
  },
  cardBody: {
    overflow: 'hidden',  // Ensure no scroll in card body
  },
  title: {
    color: '#3498db',
    textShadow: '0 0 5px rgba(52, 152, 219, 0.6)',
  },
  label: {
    color: '#95a5a6',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
  },
  body: {
    overflow: 'hidden',  // Ensures the whole page doesn't scroll
    height: '100vh',  // Ensures that the body takes up the full viewport height
  },
};

export default AddGym;

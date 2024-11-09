import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddGym = ({ fetchMembers, memberToEdit, setMemberToEdit }) => {
  const [nickname, setNickname] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [paket, setPaket] = useState('');  // New paket state
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const token = Cookies.get('token');  // Retrieve the token from cookies

  // Initialize startDate and endDate
  const calculateDates = (paket) => {
    const today = new Date();
    let endDate;

    if (paket === '2 Months Package') {
      endDate = new Date(today);
      endDate.setMonth(today.getMonth() + 2); // Add 2 months
    } else if (paket === '1 Month Package') {
      endDate = new Date(today);
      endDate.setMonth(today.getMonth() + 1); // Add 1 month
    }

    return { startDate: today.toISOString().split('T')[0], endDate: endDate.toISOString().split('T')[0] };
  };

  // Set form fields when member is selected for editing
  useEffect(() => {
    if (memberToEdit) {
      setNickname(memberToEdit.nickname);
      setFullname(memberToEdit.fullname);
      setEmail(memberToEdit.email);
      setPaket(memberToEdit.paket);
    } else {
      setNickname('');
      setFullname('');
      setEmail('');
      setPaket('');
    }
  }, [memberToEdit]);

  // Handle form submission (add or update member)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { startDate, endDate } = calculateDates(paket);  // Automatically set start and end dates
    const newMember = { nickname, fullname, email, paket, start_date: startDate, end_date: endDate };

    try {
      const method = memberToEdit ? 'PUT' : 'POST';
      const url = memberToEdit ? `http://localhost:8000/api/member/${memberToEdit.id}` : 'http://localhost:8000/api/member';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Add the token to the request
        },
        body: JSON.stringify(newMember),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        fetchMembers();
        setMemberToEdit(null);
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
            <label htmlFor="formPaket" style={styles.label}>Package</label>
            <select
              className="form-control"
              value={paket}
              onChange={(e) => setPaket(e.target.value)}
              required
            >
              <option value="">Select Package</option>
              <option value="2 Months Package">2 Months Package</option>
              <option value="1 Month Package">1 Months Package</option>
            </select>
          </div>

          <div style={styles.buttonContainer}>
            <Button variant="danger" type="submit" className="btn-sm mt-2 p-2 fs-6">
              {memberToEdit ? 'Update' : 'Submit'}
            </Button>

            <Button
              variant="primary"
              className="btn-sm p-2 fs-6"
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
    overflow: 'hidden',
  },
  cardBody: {
    overflow: 'hidden',
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
    overflow: 'hidden',
    height: '100vh',
  },
};

export default AddGym;

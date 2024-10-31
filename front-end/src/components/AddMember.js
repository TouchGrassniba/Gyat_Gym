import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';

const AddGym = ({ fetchMembers, memberToEdit, setMemberToEdit }) => {
  const [nickname, setNickname] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

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
    <div className="card">
      <div className="card-body">
        <h2 className="text-center">{memberToEdit ? 'Edit Gym Member' : 'Add Gym Member'}</h2>
        {message && <Alert variant="info">{message}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="formNickname">Nickname</label>
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
            <label htmlFor="formFullname">Full Name</label>
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
            <label htmlFor="formEmail">Email</label>
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
            <label htmlFor="formStartDate">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="formEndDate">End Date</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <Button variant="primary" type="submit">
            {memberToEdit ? 'Update' : 'Submit'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddGym;

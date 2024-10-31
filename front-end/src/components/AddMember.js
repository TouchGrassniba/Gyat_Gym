// AddGym.js
import React, { useState, useEffect } from 'react';

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
      // Reset fields if no member is being edited
      setNickname('');
      setFullname('');
      setEmail('');
      setStartDate('');
      setEndDate('');
    }
  }, [memberToEdit]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMember = { nickname, fullname, email, start_date: startDate, end_date: endDate };

    try {
      const method = memberToEdit ? 'PUT' : 'POST';
      const url = memberToEdit ? `http://localhost:8000/api/member/${memberToEdit.id}` : 'http://localhost:8000/api/member';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message); // Set success message
        fetchMembers(); // Refresh the member list
        // Reset form fields
        setMemberToEdit(null); // Clear the edit member state
      } else {
        setMessage(data.message); // Set error message
      }
    } catch (error) {
      console.error('Error adding/updating member:', error);
      setMessage('Failed to add/update member.');
    }
  };

  return (
    <div>
      <h1>{memberToEdit ? 'Edit Gym Member' : 'Add Gym Member'}</h1>
      {message && <div style={{ color: 'blue' }}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nickname:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">{memberToEdit ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default AddGym;

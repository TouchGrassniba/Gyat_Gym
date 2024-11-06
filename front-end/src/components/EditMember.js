import React, { useEffect, useState } from 'react';
const EditMember = ({ memberToEdit, setMemberToEdit, fetchMembers }) => {
  const [nickname, setNickname] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (memberToEdit) {
      setNickname(memberToEdit.nickname);
      setFullname(memberToEdit.fullname);
      setEmail(memberToEdit.email);
      setStartDate(memberToEdit.start_date);
      setEndDate(memberToEdit.end_date);
    }
  }, [memberToEdit]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/member/${memberToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname,
          fullname,
          email,
          start_date: startDate,
          end_date: endDate,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        fetchMembers(); // Refresh the member list
        setMemberToEdit(null); // Clear the form after submission
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  return (
    
    <form onSubmit={handleEditSubmit}>
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
      <button type="submit">Update Member</button>
    </form>
  );
};

export default EditMember;

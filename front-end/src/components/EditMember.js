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
    <div className="card" style={{ ...styles.card, backgroundColor: '#1c1c28' }}>
      <div className="card-body">
        <h2 className="text-center" style={styles.title}>Edit Member</h2>
        <form onSubmit={handleEditSubmit}>
          <div className="form-group">
            <label htmlFor="formNickname" style={styles.label}>Nickname</label>
            <input
              type="text"
              className="form-control"
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
          <button type="submit" className="btn btn-danger" style={styles.button}>
            Update Member
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  card: {
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  title: {
    color: '#fff',
  },
  label: {
    color: '#ccc',
  },
  button: {
    backgroundColor: '#f44336',
    color: '#fff',
  },
};

export default EditMember;

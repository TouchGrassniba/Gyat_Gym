import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Alert, Container, ListGroup } from 'react-bootstrap';

const GymMember = () => {
  const [nickname, setNickname] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch members from API
  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/member');
      const data = await response.json();
      if (response.ok) {
        setMembers(data.data); // Set the members state
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  // Call fetchMembers on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMember = { nickname, fullname, email, start_date: startDate, end_date: endDate };

    try {
      const response = await fetch('http://localhost:8000/api/members', {
        method: 'POST',
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
        setNickname('');
        setFullname('');
        setEmail('');
        setStartDate('');
        setEndDate('');
      } else {
        setMessage(data.message); // Set error message
      }
    } catch (error) {
      console.error('Error adding member:', error);
      setMessage('Failed to add member.');
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <h2 className="text-center">Add Gym Member</h2>
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNickname">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formFullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Body>
          <h2 className="text-center">Gym Members List</h2>
          <ListGroup>
            {members.map((member) => (
              <ListGroup.Item key={member.id}>
                {member.nickname} - {member.fullname} - {member.email} (Start: {member.start_date}, End: {member.end_date})
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GymMember;

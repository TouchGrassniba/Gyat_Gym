import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register', { name, email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('User registered successfully:', response.data);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#0d0d1f' }}>
      <Card style={{ width: '400px', backgroundColor: '#1c1c28', color: 'white', boxShadow: '0 0 10px rgba(52, 152, 219, 0.4)' }}>
        <Card.Body>
          <h3 className="text-center mb-4" style={{ color: '#3498db' }}>Register</h3>
          <Form onSubmit={handleRegister}>
            {error && <p style={{ color: '#e74c3c' }}>{error}</p>}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button type="submit" style={{ width: '100%', backgroundColor: '#3498db', borderColor: '#3498db' }}>Register</Button>
          </Form>
          <p className="text-center mt-3">
            Already have an account? <a href="/login" style={{ color: '#3498db' }}>Login</a>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;

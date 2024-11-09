import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      console.log('Logged in successfully:', response.data);
      navigate('/'); // Redirect to the home page after successful login
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#0d0d1f' }}>
      <Card style={{ width: '400px', backgroundColor: '#1c1c28', color: 'white', boxShadow: '0 0 10px rgba(52, 152, 219, 0.4)' }}>
        <Card.Body>
          <h3 className="text-center mb-4" style={{ color: '#3498db' }}>Login</h3>
          <Form onSubmit={handleLogin}>
            {error && <p style={{ color: '#e74c3c' }}>{error}</p>}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button type="submit" style={{ width: '100%', backgroundColor: '#3498db', borderColor: '#3498db' }}>Login</Button>
          </Form>
          <p className="text-center mt-3">
            Don't have an account? <a href="/register" style={{ color: '#3498db' }}>Register</a>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;

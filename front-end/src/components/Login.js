import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Alert, Card } from 'react-bootstrap';
import Cookies from 'js-cookie';  // Import js-cookie

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = { email, password };

    try {
      const response = await axios.post('http://localhost:8000/api/login', data);
      console.log('Login Successful:', response.data);

      // Save token in cookie
      Cookies.set('token', response.data.token, { expires: 7 }); // expires in 7 days

      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div style={styles.container}>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Card style={styles.card}>
          <Card.Body>
            <h2 className="text-center mb-4" style={styles.title}>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label style={styles.cardText}>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label style={styles.cardText}>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  placeholder="Enter password"
                  required
                />
              </Form.Group>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button variant="primary" type="submit" style={styles.button} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0d0d1f',
    color: 'white',
    minHeight: '100vh',
    fontFamily: 'Roboto, sans-serif',
    paddingBottom: '30px',
  },
  card: {
    backgroundColor: '#1c1c28',
    borderRadius: '10px',
    border: 'none',
    boxShadow: '0 0 10px rgba(52, 152, 219, 0.4)',
  },
  title: {
    color: '#3498db',
    textShadow: '0 0 5px rgba(52, 152, 219, 0.6)',
  },
  input: {
    backgroundColor: '#2d2d3b',
    border: 'none',
    color: '#fff',
    borderRadius: '5px',
  },
  button: {
    backgroundColor: '#e74c3c',
    borderColor: '#e74c3c',
    boxShadow: '0 0 10px rgba(231, 76, 60, 0.8)',
    transition: 'all 0.3s ease',
    marginTop: '10px',
    padding: '10px 20px',
    width: '100%',
  },
  cardText: {
    color: '#95a5a6',
  },
};

export default Login;

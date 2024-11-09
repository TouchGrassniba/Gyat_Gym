import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Alert, Card } from 'react-bootstrap';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      console.log('Registration successful:', response.data);
      alert('Registration successful!');
    } catch (err) {
      setLoading(false);
      if (err.response) {
        if (err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError('An unknown error occurred during registration.');
        }
      } else {
        setError('There was an issue with the request. Please try again.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Card style={styles.card}>
          <Card.Body>
            <h2 className="text-center mb-4" style={styles.title}>Register</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label style={styles.cardText}>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>
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
              <Form.Group controlId="passwordConfirmation" className="mb-3">
                <Form.Label style={styles.cardText}>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  style={styles.input}
                  placeholder="Confirm password"
                  required
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}
              <Button variant="primary" type="submit" style={styles.button} disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
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

export default Register;

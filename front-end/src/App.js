import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import GymMember from './components/GymMember';
import MemberList from './components/MemberList';
import AiChat from './components/ChatWithAI';
import Home from './components/Home';
import Exercise from './components/Exercise';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';  // Import PrivateRoute
import Cookies from 'js-cookie';  // Import js-cookie for cookie management

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isCreateMemberRoute = location.pathname === '/createmember';
  const isAuthenticated = Cookies.get('token');  // Check if the user is authenticated using the token from cookies
  const navigate = useNavigate();  // Hook to navigate to another page
  const [showModal, setShowModal] = useState(false);  // State for controlling the modal visibility

  // Logout function
  const handleLogout = () => {
    setShowModal(true);  // Show the confirmation modal
  };

  const confirmLogout = () => {
    Cookies.remove('token');  // Remove the token from cookies
    setShowModal(false);  // Close the modal
    navigate('/login');  // Redirect the user to the login page after logout
  };

  const cancelLogout = () => {
    setShowModal(false);  // Close the modal if the user cancels
  };

  return (
    <div className={`App ${isCreateMemberRoute ? 'no-scroll' : ''}`}>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/gyatgym.jpg"
              alt="GymApp Logo"
              style={styles.logo}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-0">
              <Nav.Link as={Link} to="/" style={styles.navLink}>Home</Nav.Link>
              {isAuthenticated && (
                <>
                  <Nav.Link as={Link} to="/aichat" style={styles.navLink}>Chat With Jimmy AI</Nav.Link>
                  <Nav.Link as={Link} to="/createmember" style={styles.navLink}>Create Member</Nav.Link>
                  <Nav.Link as={Link} to="/memberlist" style={styles.navLink}>Member List</Nav.Link>
                </>
              )}
              {isAuthenticated ? (
                <Nav.Link as="button" onClick={handleLogout} style={styles.navLink}>Logout</Nav.Link>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" style={styles.navLink}>Login</Nav.Link>
                  <Nav.Link as={Link} to="/register" style={styles.navLink}>Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createmember" element={<PrivateRoute><GymMember /></PrivateRoute>} />
        <Route path="/memberlist" element={<PrivateRoute><MemberList /></PrivateRoute>} />
        <Route path="/aichat" element={<PrivateRoute><AiChat /></PrivateRoute>} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* Logout Confirmation Modal */}
      <Modal show={showModal} onHide={cancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={confirmLogout}>
            Log Out
          </Button>
          <Button variant="secondary" onClick={cancelLogout}>
            Cancel
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
}

const styles = {
  navbar: {
    padding: '10px 20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    height: '35px',
    borderRadius: '8px',
  },
  navLink: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '15px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginRight: '15px',
    transition: 'color 0.3s ease',
  },
};

export default App;

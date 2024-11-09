import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import GymMember from './components/GymMember';
import MemberList from './components/MemberList';
import AiChat from './components/ChatWithAI';
import Home from './components/Home';
import Exercise from './components/Exercise';
import Login from './Auth/Login';
import Register from './Auth/Register';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();  // Use useLocation inside this inner component
  const navigate = useNavigate();
  const isCreateMemberRoute = location.pathname === '/createmember';

  // Check if user is logged in by checking the token in localStorage
  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className={`App ${isCreateMemberRoute ? 'no-scroll' : ''}`}>
      {/* Navbar Component */}
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
              <Nav.Link as={Link} to="/aichat" style={styles.navLink}>Chat With Jimmy AI</Nav.Link>
              <Nav.Link as={Link} to="/createmember" style={styles.navLink}>Create Member</Nav.Link>
              <Nav.Link as={Link} to="/memberlist" style={styles.navLink}>Member List</Nav.Link>

              {/* Conditionally show login or logout */}
              {!isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/login" style={styles.navLink}>Login</Nav.Link>
                  <Nav.Link as={Link} to="/register" style={styles.navLink}>Register</Nav.Link>
                </>
              ) : (
                <Button onClick={handleLogout} variant="outline-light" style={styles.navLink}>Logout</Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createmember" element={<GymMember />} />
        <Route path="/memberlist" element={<MemberList />} />
        <Route path="/aichat" element={<AiChat />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
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

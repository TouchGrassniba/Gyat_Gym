import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import GymMember from './components/GymMember';
import MemberList from './components/MemberList';
import AiChat from './components/ChatWithAI';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();  // Use useLocation inside this inner component

  const isCreateMemberRoute = location.pathname === '/createmember';

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
      </Routes>
    </div>
  );
}

const styles = {
  navbar: {
    padding: '10px 20px',  // Reduced padding for smaller navbar
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    height: '35px',  // Reduced logo size
    borderRadius: '8px',  // Slightly smaller border-radius
  },
  navLink: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '15px',  // Reduced font size for smaller navbar
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginRight: '15px',  // Reduced margin between links
    transition: 'color 0.3s ease',
  },
};

export default App;

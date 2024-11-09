import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaDiscord, FaWhatsapp, FaInstagram, FaTwitter } from 'react-icons/fa';  // Importing icons

const Home = () => {
  return (
    <div style={styles.home}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 style={styles.heroTitle}>Welcome to Gyat Gym</h1>
              <p style={styles.heroText}>
                Get fit, stay healthy, and achieve your fitness goals with our expert programs and packages.
              </p>
              <Button variant="primary" size="lg" as={Link} to="/createmember" style={styles.heroButton}>
                Join Now
              </Button>
            </Col>
            <Col md={6}>
              <img src="/gyatgym.jpg" alt="Gym" style={styles.heroImage} />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <Container>
          <Row className="text-center">
            <Col md={4}>
              <div style={styles.featureCard}>
                <h3 style={styles.featureTitle}>Personalized Packages</h3>
                <p style={styles.featureText}>
                  Choose from a variety of packages designed to suit your personal fitness needs.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div style={styles.featureCard}>
                <h3 style={styles.featureTitle}>Expert Coaches</h3>
                <p style={styles.featureText}>
                  Our certified fitness coaches are here to guide you every step of the way.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div style={styles.featureCard}>
                <h3 style={styles.featureTitle}>State-of-the-art Equipment</h3>
                <p style={styles.featureText}>
                  Train with the best equipment to help you reach your fitness goals.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action Section with Social Media */}
      <section style={styles.ctaSection}>
        <Container className="text-center">
          <h2 style={styles.ctaTitle}>Follow Us on Social Media</h2>
          <div style={styles.socialIcons}>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
              <FaDiscord size={40} style={styles.icon} />
            </a>
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
              <FaWhatsapp size={40} style={styles.icon} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
              <FaInstagram size={40} style={styles.icon} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
              <FaTwitter size={40} style={styles.icon} />
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
};

const styles = {
  home: {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  heroSection: {
    backgroundColor: '#1c1c28',
    color: '#fff',
    padding: '80px 0',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#3498db',
    textShadow: '0 0 5px rgba(52, 152, 219, 0.6)',
  },
  heroText: {
    fontSize: '20px',
    color: '#fff',
    marginBottom: '30px',
  },
  heroButton: {
    backgroundColor: '#3498db',
    border: 'none',
    padding: '12px 40px',
    fontSize: '18px',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
  },
  heroImage: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  featuresSection: {
    backgroundColor: '#fff',
    padding: '60px 0',
  },
  featureCard: {
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(52, 152, 219, 0.1)',
    marginBottom: '30px',
  },
  featureTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3498db',
  },
  featureText: {
    fontSize: '16px',
    color: '#7f8c8d',
    marginTop: '10px',
  },
  ctaSection: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '60px 0',
  },
  ctaTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',  // Added gap between icons
    marginTop: '20px',
  },
  socialIcon: {
    color: '#fff',
    textDecoration: 'none',
  },
  icon: {
    transition: 'color 0.3s ease',
  },
  socialIconHover: {
    color: '#f39c12', // Change to a hover color like gold or any other
  },
};

export default Home;

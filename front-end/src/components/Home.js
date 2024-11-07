import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // To handle routing
import exercises from '../data/exercises'; // Default import

function Home() {
    return (
        <div className="container-fluid" style={styles.container}>
            <div className="d-flex justify-content-end mb-4">
                <Link to="/createmember">
                    <Button variant="primary" style={styles.button}>Create Member</Button>
                </Link>
                <Link to="/aichat">
                    <Button variant="primary" className="mx-3" style={styles.button}>Chat With AI Coach</Button>
                </Link>
            </div>

            <h2 className="text-center mb-4" style={styles.title}>Exercise List</h2>
            <Row>
                {exercises.map((exercise, index) => (
                    <Col sm={12} md={6} lg={3} key={index}>
                        <Card className="mb-4" style={styles.card}>
                            <Card.Img
                                variant="top"
                                src={exercise.image}
                                style={styles.cardImage}
                            />
                            <Card.Body>
                                <Card.Title style={styles.cardTitle}>{exercise.name}</Card.Title>
                                <Card.Text style={styles.cardText}>
                                    <strong>Function:</strong> {exercise.function}
                                </Card.Text>
                                <Card.Text style={styles.cardText}>
                                    <strong>Rating:</strong> {exercise.rating} <span>⭐</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#0d0d1f', // Dark background to match TRON
        color: 'white',
        minHeight: '100vh',  // Ensures it spans the full height of the viewport
        fontFamily: 'Roboto, sans-serif',
        paddingBottom: '30px', // Prevents content from being cut off on the bottom
    },
    button: {
        backgroundColor: '#e74c3c', // Red color for buttons
        borderColor: '#e74c3c',
        boxShadow: '0 0 10px rgba(231, 76, 60, 0.8)', // Red shadow
        transition: 'all 0.3s ease', // Smooth transition for hover
        marginTop: '10px', // Add top margin for spacing
    },
    title: {
        color: '#3498db', // Neon blue title
        textShadow: '0 0 5px rgba(52, 152, 219, 0.6)',
    },
    card: {
        backgroundColor: '#1c1c28', // Dark background for cards
        border: 'none',
        borderRadius: '10px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 0 10px rgba(52, 152, 219, 0.4)',
    },
    cardImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        transition: 'transform 0.3s ease', // Zoom-in effect on hover
    },
    cardTitle: {
        color: '#3498db', // Blue text for card title
    },
    cardText: {
        color: '#95a5a6', // Lighter color for text
    },
};

export default Home;

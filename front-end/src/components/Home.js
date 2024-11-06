import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // To handle routing
import exercises from '../data/exercises'; // Default import

function Home() {
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-end mb-4">
                <Link to="/createmember">
                    <Button variant="primary">Create Member</Button>
                </Link>
                <Link to="/aichat">
                    <Button variant="primary" className="mx-3">Chat With AI Coach</Button>
                </Link>
            </div>

            <h2 className="text-center mb-4">Exercise List</h2>
            <Row>
                {exercises.map((exercise, index) => (
                    <Col sm={12} md={6} lg={3} key={index}>
                        <Card className="mb-4">
                            <Card.Img
                                variant="top"
                                src={exercise.image}
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover', // Ensures the image covers the area without distortion
                                }}
                            />
                            <Card.Body>
                                <Card.Title>{exercise.name}</Card.Title>
                                <Card.Text>
                                    <strong>Function:</strong> {exercise.function}
                                </Card.Text>
                                <Card.Text>
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

export default Home;

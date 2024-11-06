import React, { useState } from 'react';
import { Button, Form, Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AiChat = () => {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);

    // Handle sending message to the backend
    const handleSendMessage = async () => {
        if (message.trim() === '') return; // Prevent empty messages

        // Add user message to the chat
        setResponses((prevResponses) => [
            ...prevResponses,
            { role: 'user', content: message },
        ]);

        try {
            const res = await axios.post('http://localhost:8000/api/aichat', { message });

            const aiReply = res.data.reply || "I'm sorry, I didn't get that.";
            
            setResponses((prevResponses) => [
                ...prevResponses,
                { role: 'ai', content: aiReply },
            ]);
            setMessage('');
        } catch (error) {
            console.error('Error communicating with AI:', error);
            setResponses((prevResponses) => [
                ...prevResponses,
                { role: 'ai', content: "There was an error processing your request." },
            ]);
        }
    };

    // Allow Enter key to send message
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>AI Gym Coach</h2>
                <Link to="/">
                    <Button variant="secondary">Back to Home</Button>
                </Link>
            </div>
            <div className="chat-window">
                <ListGroup>
                    {responses.map((response, index) => (
                        <ListGroup.Item key={index} className={response.role === 'user' ? 'text-end' : 'text-start'}>
                            <strong>{response.role === 'user' ? 'You: ' : 'AI Coach: '}</strong>
                            {response.content}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
            <Form className="d-flex mt-3">
                <Form.Control
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask your fitness question..."
                />
                <Button variant="primary" onClick={handleSendMessage}>Send</Button>
            </Form>
        </Container>
    );
};

export default AiChat;

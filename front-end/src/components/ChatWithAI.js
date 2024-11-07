import React, { useState } from 'react';
import { Button, Form, Container, ListGroup, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AiChat = () => {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const typeEffect = (text, callback) => {
        let index = 0;
        let newText = '';
        const intervalId = setInterval(() => {
            if (index < text.length) {
                newText += text[index];
                callback(newText);
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, 20);
    };

    const handleSendMessage = async () => {
        if (message.trim() === '') return;

        setResponses((prevResponses) => [
            ...prevResponses,
            { role: 'user', content: message },
        ]);
        setMessage('');
        setIsTyping(true);

        try {
            const res = await axios.post('http://localhost:8000/api/aichat', { message });
            const aiReply = res.data.reply || "I'm sorry, I didn't get that.";

            typeEffect(aiReply, (newText) => {
                setResponses((prevResponses) => [
                    ...prevResponses.slice(0, prevResponses.length - 1),
                    { role: 'ai', content: newText },
                ]);
            });
        } catch (error) {
            console.error('Error communicating with AI:', error);
            setResponses((prevResponses) => [
                ...prevResponses,
                { role: 'ai', content: "There was an error processing your request." },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Container fluid style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>AI Gym Coach</h2>
                <Link to="/">
                    <Button variant="outline-light" style={styles.backButton}>Back to Home</Button>
                </Link>
            </div>
            <div style={styles.chatWindow}>
                <ListGroup>
                    {responses.map((response, index) => (
                        <ListGroup.Item key={index} style={response.role === 'user' ? styles.userMessage : styles.aiMessage}>
                            <strong>{response.role === 'user' ? 'You: ' : 'AI Coach: '}</strong>
                            {response.content}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                {isTyping && (
                    <div style={styles.typingContainer}>
                        <Spinner animation="grow" variant="light" size="sm" style={styles.spinner} />
                        <span style={styles.typingText}>AI Coach is typing...</span>
                    </div>
                )}
            </div>
            <Form style={styles.form} className="d-flex mt-3">
                <Form.Control
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask your fitness question..."
                    style={styles.input}
                />
                <Button variant="primary" onClick={handleSendMessage} style={styles.sendButton}>Send</Button>
            </Form>
        </Container>
    );
};

const styles = {
    container: {
        backgroundColor: '#0d0d1f', 
        color: 'white',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        width: '100%',
        position: 'absolute', 
        top: 0,
        left: 0,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    title: {
        color: '#9b4d96',
        textShadow: '0 0 5px #9b4d96, 0 0 10px #9b4d96',
    },
    backButton: {
        borderColor: '#9b4d96',
        color: '#9b4d96',
        textShadow: '0 0 5px #9b4d96, 0 0 10px #9b4d96',
    },
    chatWindow: {
        backgroundColor: '#2c3e50',
        borderRadius: '10px',
        padding: '20px',
        maxHeight: '400px',
        overflowY: 'auto',
        marginBottom: '20px',
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.6)',
        width: '100%',
    },
    userMessage: {
        backgroundColor: '#3498db',
        color: 'white',
        textAlign: 'right',
        borderRadius: '10px',
        marginBottom: '10px',
        boxShadow: '0 0 10px rgba(52, 152, 219, 0.8)',
    },
    aiMessage: {
        backgroundColor: '#8e44ad',
        color: 'white',
        textAlign: 'left',
        borderRadius: '10px',
        marginBottom: '10px',
        boxShadow: '0 0 10px rgba(142, 68, 173, 0.8)',
    },
    typingContainer: {
        display: 'flex',
        alignItems: 'center',
        color: '#9b4d96',
    },
    spinner: {
        marginRight: '10px',
    },
    typingText: {
        color: '#9b4d96',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginRight: '10px',
        backgroundColor: '#34495e',
        color: 'white',
        borderColor: '#9b4d96',
        boxShadow: '0 0 5px rgba(155, 77, 150, 0.8)',
        width: '100%',
    },
    sendButton: {
        backgroundColor: '#9b4d96',
        borderColor: '#9b4d96',
        boxShadow: '0 0 10px rgba(155, 77, 150, 0.8)',
    },
};

export default AiChat;

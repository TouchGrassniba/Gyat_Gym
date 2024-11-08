import React, { useState } from 'react';
import { Button, Form, Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AiChat = () => {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [typingMessage, setTypingMessage] = useState(''); // Temporary typing message
    const [typingInterval, setTypingInterval] = useState(null); // To store the typing interval ID

    // Function to clean up and format the AI response
    const cleanResponse = (response) => {
        return response
            .replace(/#\s*/g, '')         // Remove headers starting with #
            .replace(/\*\*\s*/g, '')      // Remove bold symbols **
            .replace(/\*\s*/g, '')        // Remove single * symbols
            .replace(/\s*:\s*/g, ': ')    // Clean up spacing around colons
            .replace(/###\s*/g, '')       // Remove ### for sections
            .replace(/-/g, '•');          // Replace "-" with bullet points if desired
    };

    const typeEffect = (text) => {
        let index = 0;
        setTypingMessage(''); // Ensure typingMessage is cleared at the start

        const intervalId = setInterval(() => {
            setTypingMessage((prev) => prev + text[index]);
            index++;
            if (index >= text.length) {
                clearInterval(intervalId);
                setResponses((prevResponses) => [
                    ...prevResponses,
                    { role: 'ai', content: text }
                ]);
                setTypingMessage('');
                setIsTyping(false);
            }
        }, 5);

        setTypingInterval(intervalId); // Save the interval ID for later stopping
    };

    const handleSendMessage = async () => {
        if (message.trim() === '') return;

        setResponses((prevResponses) => [
            ...prevResponses,
            { role: 'user', content: message },
        ]);
        setMessage('');
        setIsTyping(true);
        setTypingMessage('');

        try {
            const res = await axios.post('http://localhost:8000/api/aichat', { message });
            const aiReply = res.data.reply || "I'm sorry, I didn't get that.";
            const cleanedReply = cleanResponse(aiReply); // Clean the AI response
            typeEffect(cleanedReply);
        } catch (error) {
            console.error('Error communicating with AI:', error);
            setResponses((prevResponses) => [
                ...prevResponses,
                { role: 'ai', content: "There was an error processing your request." },
            ]);
            setIsTyping(false);
        }
    };

    const stopTyping = () => {
        clearInterval(typingInterval); // Stop the typing effect
        setIsTyping(false); // Set typing to false to remove the "Jimmy is typing..." message
        setTypingMessage(''); // Clear any remaining typing message
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Container  fluid style={styles.container}>
            <div className='mt-5' style={styles.header}>
                <h2 style={styles.title}>Coach Jimmy</h2>
              
            </div>
            <div style={styles.chatWindow}>
                <ListGroup>
                    {responses.map((response, index) => (
                        <ListGroup.Item key={index} style={response.role === 'user' ? styles.userMessage : styles.aiMessage}>
                            <strong>{response.role === 'user' ? 'You: ' : 'Jimmy: '}</strong>
                            {response.content}
                        </ListGroup.Item>
                    ))}
                    {isTyping && (
                        <ListGroup.Item style={styles.aiMessage}>
                            <strong>Jimmy: </strong>
                            {typingMessage || 'Jimmy is thinking...'}
                        </ListGroup.Item>
                    )}
                </ListGroup>
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
                <Button 
                    variant="primary" 
                    onClick={isTyping ? stopTyping : handleSendMessage} 
                    style={styles.sendButton}
                >
                    {isTyping ? 'Stop' : 'Send'}
                </Button>
            </Form>
        </Container>
    );
};

// Styles
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

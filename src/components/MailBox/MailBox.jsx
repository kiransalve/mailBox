import React, { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userSlice';
import { useNavigate } from "react-router-dom"

const ComposeEmail = ({ onEmailSent }) => {
    const [emailContent, setEmailContent] = useState('');
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const userEmail = useSelector((state) => state.user.email).replace(/[@.]/g, "")
    const senderEmail = useSelector((state) => state.user.email)
    console.log(userEmail)

    const dispatch = useDispatch()

    const handleSendEmail = async () => {
        console.log(emailContent, recipient, subject)
        try {
            const response = await axios.post(`https://mailbox-7702e-default-rtdb.firebaseio.com/${userEmail}.json`, {
                recipient,
                subject,
                content: emailContent,
                senderEmail,
            });

            if (response.status >= 200 && response.status < 300) {
                console.log('Email sent successfully.', response);
                // Reset form fields
                setEmailContent('');
                setRecipient('');
                setSubject('');
                setError('');
                // Invoke the callback function to notify the parent component
                onEmailSent();
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (error) {
            setError('An error occurred while sending the email.');
        }
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mt-5">
                <h2>Compose Email</h2>
                <Button varient="primary" onClick={() => {
                    dispatch(logout())
                    navigate("/")
                }}>Logout</Button>
            </div>
            <Row>
                <Col >
                    <Row>
                        <Col>
                            <Form.Group controlId="recipient">
                                <Form.Label>To : </Form.Label>
                                <Form.Control
                                    type="email"
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="subject">
                                <Form.Label>Subject:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="emailContent" className="mb-3">
                                <Form.Label>Content:</Form.Label>
                                <ReactQuill
                                    value={emailContent}
                                    onChange={setEmailContent}
                                    placeholder="Compose your email..."
                                    style={{ height: '200px' }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {error && (
                        <Row>
                            <Col>
                                <Alert variant="danger">{error}</Alert>
                            </Col>
                        </Row>
                    )}

                    <Row>
                        <Col>
                            <Button variant="primary" onClick={handleSendEmail} className="mt-5">
                                Send Email
                            </Button>
                        </Col>
                    </Row>

                </Col>

            </Row>
        </Container>
    );
};

export default ComposeEmail;

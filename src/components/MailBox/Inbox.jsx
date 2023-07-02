import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ComposeEmail from "./MailBox"

const Inbox = () => {
    const [mails, setMails] = useState([]);
    const userEmail = useSelector((state) => state.user.email).replace(/[@.]/g, "")

    const fetchMails = async () => {
        try {
            const response = await axios.get(
                `https://mailbox-7702e-default-rtdb.firebaseio.com/${userEmail}.json`
            );

            if (response.status >= 200 && response.status < 300) {
                const fetchedMails = Object.values(response.data);
                setMails(fetchedMails);
            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
        }
    };
    useEffect(() => {

        fetchMails();
    }, [userEmail]);
    const [showCompose, setShowCompose] = useState(false);

    const handleCompose = () => {
        setShowCompose(true);
    };

    const handleCloseCompose = () => {
        setShowCompose(false);
    };
    const handleEmailSent = () => {
        handleCloseCompose();
        fetchMails()
    };

    return (
        <Container>
            
            <h2 className="m-2">Inbox</h2>
            <Button variant="primary" onClick={handleCompose}>Compose Email</Button>

            <Modal show={showCompose} onHide={handleCloseCompose}>
                <Modal.Header closeButton>
                    <Modal.Title>Compose Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ComposeEmail onEmailSent={handleEmailSent} />
                </Modal.Body>
            </Modal>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Recipient</th>
                        <th>Subject</th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {mails.map((mail) => (
                        <tr key={mail.id}>
                            <td>{mail.recipient}</td>
                            <td>{mail.subject}</td>
                            <td>{mail.content}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Inbox;

import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserEmail } from '../store/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIaoGyq0v_PlZOTieOA_W5CiqU_JBUO_8`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        returnSecureToken: true,
                    }),
                }
            );

            if (response.ok) {
                console.log('User has successfully signed in.', email);
                dispatch(setUserEmail(email))
                setEmail("")
                setPassword("")
                navigate("/")
            } else {
                const data = await response.json();
                setError(data.error.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };


    const handleGuestLogin = async () => {
        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIaoGyq0v_PlZOTieOA_W5CiqU_JBUO_8`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: 'salvekiran2011@gmail.com',
                        password: '123456',
                        returnSecureToken: true,
                    }),
                }
                );
                
                if (response.ok) {
                    const data = await response.json()
                    console.log('Guest has successfully logged in.', data.email);
                    
                setEmail('')
                setPassword('')
                navigate("/")
                dispatch(setUserEmail(data.email))
            } else {
                const data = await response.json();
                setError(data.error.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Container className='d-flex justify-content-center align-item-center'>
            <div className="border rounded p-5 mt-5">
                <h2 className='mb-3 text-center'>Login</h2>
                <Form onSubmit={handleSignup}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>

                    <Button variant="primary" className="ms-2" onClick={handleGuestLogin}>
                        Guest Login
                    </Button>
                    <div className='mt-3'>Don't have account, <Link to="/signup">Signup</Link></div>
                </Form>
            </div>
        </Container>
    )
}

export default Login;
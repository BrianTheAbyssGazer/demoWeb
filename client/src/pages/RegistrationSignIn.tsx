// src/components/Registration.tsx
import React, { useState } from 'react';
import AxiosPort from '../api/AxiosPort';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';


const RegistrationSignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessageRegister, setErrorMessageRegister] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const [errorMessageSignIn, setErrorMessageSignIn] = useState('');
    const handleSignIn = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            const response = await AxiosPort.post('/login', { email, password })
            if (response.status === 200) {
                console.log(response.data.message);
                login({
                    userName: response.data.message,
                    email: email,
                    loggedIn: true,
                });
                navigate(-1);
            }
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setErrorMessageSignIn(error.response.data.message);
            }
            else console.log(error);
        }
    };

    const handleRegister = async (e: React.MouseEvent) => {
        e.preventDefault();
        const response = await AxiosPort.post('/register', { email, password, username })
        try {
            if (response.status === 201) {
                login({
                    userName: username,
                    email: email,
                    loggedIn: true,
                });
                navigate(-1);
            }
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                setErrorMessageRegister(response.data.message);
            }
            console.error(error);
        }
    };

    return (
        <Row>
            <Col>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Example@email.com" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I acknowlegde and agree with the terms" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleRegister}>
                        Register
                    </Button>
                    <Form.Text className="text-danger">{errorMessageRegister}</Form.Text>
                </Form>
            </Col>
            <Col>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Example@email.com" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember my account" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSignIn}>
                        Sign In
                    </Button>
                    <Form.Text className="text-danger">{errorMessageSignIn}</Form.Text>
                </Form>
            </Col>
        </Row>

    );
};

export default RegistrationSignIn;
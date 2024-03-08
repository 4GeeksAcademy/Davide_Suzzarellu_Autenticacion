import React from "react";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import CloseButton from 'react-bootstrap/CloseButton';
import { useContext } from "react";
import { Context } from "../store/appContext";


export const LoginModal = ({ show, onHide }) => {
    const [validated, setValidated] = useState(false);
    const { store, actions } = useContext(Context)
    const { user } = store
    const { setLogged, setUser, getUser } = actions
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        isactive: true
    })

    const handleChange = (e) => {
        e.persist();
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const logUser = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: inputs.email,
                password: inputs.password,
                isactive: true
            }),
        };
        const response = await fetch("https://studious-space-zebra-wr76g657jj4rf5xp9-3001.app.github.dev/api/login", options)
        if (!response.ok) return false
        const data = await response.json()
        localStorage.setItem("accessToken", data.access);
        return true
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(false);
            setLogged(false)
            event.preventDefault();
            event.stopPropagation();
        } else {
            const validateLog = await logUser();
            if (validateLog) {
                const protectedData = await getUser();
                if (protectedData !== null) {
                    setValidated(true);
                    setLogged(true);
                    setInputs({
                        email: "",
                        password: "",
                        isactive: true
                    })
                    onHide();
                } else {
                    setValidated(false);
                    setLogged(false);
                    alert("Error fetching protected data");
                }
            } else {
                setValidated(false);
                setLogged(false);
                alert("User not found")
            }
        }
    };

    return (
        <Modal
            show={show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="bg-primary">
                <Modal.Title id="contained-modal-title-vcenter">
                    Sign In
                </Modal.Title>
                <CloseButton onClick={onHide}></CloseButton>
            </Modal.Header>
            <Modal.Body className="w-100 d-flex flex-column p-20">
                <Form className="mb-3" noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="g-3">
                        <Form.Group as={Col} md="12" controlId="validationEmail">
                            <FloatingLabel controlId="validationLoginEmail" label="Email address">
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="name@example.com"
                                    value={inputs.email || ""}
                                    onChange={handleChange}
                                    name="email"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please enter an email.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationPassword">
                            <FloatingLabel controlId="validationSignupPassword" label="Password">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    value={inputs.password || ""}
                                    onChange={handleChange}
                                    name="password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose password.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit} variant="success">Log In</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
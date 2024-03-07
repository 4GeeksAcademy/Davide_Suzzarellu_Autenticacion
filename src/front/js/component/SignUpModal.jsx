import React from "react";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import CloseButton from 'react-bootstrap/CloseButton';

export const SignUpModal = ({ show, onHide }) => {
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        isactive: true
    })

    const handleChange = (e) => {
        e.persist();
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const postUser = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: inputs.first_name,
                last_name: inputs.last_name,
                username: inputs.username,
                email: inputs.email,
                password: inputs.password,
            }),
        };
        const response = await fetch("https://studious-space-zebra-wr76g657jj4rf5xp9-3001.app.github.dev/api/signup", options);
        if (!response.ok) {
            console.error(`Error: ${response.status}`);
            return false;
        }
        const data = await response.json();
        return true;
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() == false) {
            event.stopPropagation()
            setValidated(false);
        } else {
            event.preventDefault();
            setValidated(true);

            const postSuccess = await postUser();

            if (postSuccess) {
                setInputs({
                    first_name: "",
                    last_name: "",
                    username: "",
                    email: "",
                    password: "",
                });
                onHide();
            } else {
                setValidated(false)
                alert("Error posting user");
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
                <Form className="mb-3" noValidate validated={validated}>
                    <Row className="g-3">
                        <Form.Group as={Col} md="6" controlId="validationFirstName">
                            <FloatingLabel controlId="validationFirstName" label="First Name">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First name"
                                    value={inputs.first_name || ""}
                                    onChange={handleChange}
                                    name="first_name"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationLastName">
                            <FloatingLabel controlId="validationLastName" label="Last Name">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last Name"
                                    value={inputs.last_name || ""}
                                    onChange={handleChange}
                                    name="last_name"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationEmail">
                            <FloatingLabel type="email" controlId="validationEmail" label="Email address">
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
                                    Please enter a email.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationUsername">
                            <FloatingLabel controlId="validationUsername" label="Username">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    value={inputs.username || ""}
                                    onChange={handleChange}
                                    name="username"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationPassword">
                            <FloatingLabel controlId="validationPassword" label="Password">
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
                        <Form.Group as={Col} md="12" className="mb-3">
                            <Form.Check
                                required
                                label="Agree to terms and conditions"
                                feedback="You must agree before submitting."
                                feedbackType="invalid"
                            />
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit} variant="success">Sign In</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
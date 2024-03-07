import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from "react-bootstrap";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const { logged, user } = store;

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '18rem' }}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Title>Logged User:</Card.Title>
                    <Card.Text>
                        {user && logged ? user.email : "No user logged in"}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};
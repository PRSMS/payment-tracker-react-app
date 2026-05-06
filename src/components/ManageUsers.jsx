import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Tab, Tabs, Card, Row, Col, Badge, Button } from "react-bootstrap";


export function ManageUsers() {
    const [userList, setUserList] = useState(null);
    const { currentUserTokenResult } = useAuth();  

    const handleGetUsers = () => {
        fetch('http://localhost:3000/api/users', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${currentUserTokenResult.token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => { 
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then(data => {
                console.log('Data retrieved successfully:', data);
                setUserList(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

  return (
    <>
        <Card className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">Total users: {userList ? userList.length : 0}</span>
                <Button variant="primary" onClick={handleGetUsers}>Get Users</Button>
            </Card.Body>
        </Card>
        <Row xs={1} md={2} lg={3} className="g-3">
            {userList && userList.map(user => (
                <Col key={user.id}>
                    <Card className="h-100 shadow-sm">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <strong>{user.name ? user.name : 'No Name'}</strong>
                            {user.admin && <Badge bg="primary">Admin</Badge>}
                        </Card.Header>
                        <Card.Body>
                            {/*<Card.Text>*/}
                                <div className="mb-2">
                                    <strong>Email:</strong> {user.email}
                                </div>
                                <div className="mb-2">
                                    <strong>ID:</strong> <code className="small">{user.id}</code>
                                </div>
                                <div className="mb-2">
                                    <strong>Role:</strong> {user.admin ? 'Admin' : 'User'}
                                </div>
                                <div className="mb-2">
                                    <strong>Status:</strong>{' '}
                                    {user.verified ? (
                                        <Badge bg="success">Verified</Badge>
                                    ) : (
                                        <Badge bg="warning" text="dark">Not Verified</Badge>
                                    )}
                                    {' '}
                                    {user.disabled ? (
                                        <Badge bg="danger">Disabled</Badge>
                                    ) : (
                                        <Badge bg="success">Active</Badge>
                                    )}
                                </div>
                                <div className="mb-2">
                                    <strong>Created:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
                                </div>
                                <div>
                                    <strong>Last Login:</strong> {user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString() : 'N/A'}
                                </div>
                            {/*</Card.Text>*/}
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </>
  );
}
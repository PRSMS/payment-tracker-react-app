import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAdminAPI } from '../context/AdminAPIContext.jsx';
import { Container, Tab, Tabs, Card, Row, Col, Badge, Button, Spinner, Form } from "react-bootstrap";


export function ManageUsers() {
    const [userList, setUserList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { currentUserTokenResult } = useAuth();  
    const {getUsers, sendEmailVerificationRequest, setAdminRole} = useAdminAPI();

    //const apiUsersURL = import.meta.env.VITE_API_BASE_URL + '/api/users';

    const handleGetUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            /*
            const response = await fetch(apiUsersURL, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${currentUserTokenResult.token}`,
                    'Content-Type': 'application/json'
                }
            });
            */
           const response = await getUsers();
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            console.log('Data retrieved successfully:', data);
            setUserList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleSendVerification = async (email) => {
        
        setLoading(true);
        setError(null);
        
        alert(`handleSendVerification (on-going): ${email}`);
        setLoading(false);
        /*
        const payload = { 
            email: email, 
        };

        try {
           const response = await sendEmailVerificationRequest(payload);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            console.log('Email Send:', data);
            //setUserList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
            
        } finally {
            setLoading(false);
        }
            */
    }

    const handleSetAdminRole = async (id, isAdmin, e) => {
        
        setLoading(true);
        setError(null);
        
        //alert(`handleGetUsers: ${id} : ${isAdmin}`);
        
        const payload = { 
            id: id,
            admin: !isAdmin
        };

        try {
           const response = await setAdminRole(payload);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            console.log('Email Send:', data);
            //window.location.reload();
            handleGetUsers();
            //setUserList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
            
        } finally {
            setLoading(false);
        }
        
    }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
        <Card className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">Total users: {userList ? userList.length : 0}</span>
                <Button variant="primary" onClick={(e) => handleGetUsers(e)} disabled={loading}>
                    {loading ? 'Loading...' : 'Get Users'}
                </Button>
            </Card.Body>
        </Card>
        {error && <div className="alert alert-danger">{error}</div>}

        <Row xs={1} md={2} lg={3} className="g-3">
            {userList && userList.map(user => (
                <Col key={user.id}>
                    <Card className="h-100 shadow-sm">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <strong>{user.name ? user.name : 'No Name'}</strong>
                            {/*{user.admin && <Badge bg="primary">Admin</Badge>}*/}
                            <Form>
                                <Form.Check 
                                    type="switch"
                                    id="custom-switch"
                                    label={user.admin ? "Admin" : "Admin"}
                                    checked={user.admin}
                                    onChange={(e) => handleSetAdminRole(user.id, user.admin, e)}
                                />
                            </Form>
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
                                        <Button variant="warning" size="sm" onClick={() => handleSendVerification(user.email)} disabled={loading}>
                                            {loading ? 'Loading...' : 'Send Verification Request'}
                                        </Button>
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
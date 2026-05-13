import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAdminAPI } from '../context/AdminAPIContext.jsx';
import { Container, Tab, Tabs, Card, Row, Col, Badge, Button, Spinner, Form } from "react-bootstrap";


export function ManageUsers() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { currentUserTokenResult } = useAuth();  
    const {userLists, getUsers, sendEmailVerificationRequest, setAdminRole, deleteUser, setUserDisabled} = useAdminAPI();

    const [userList, setUserList] = useState(userLists);
    //const apiUsersURL = import.meta.env.VITE_API_BASE_URL + '/api/users';

    const handleGetUsers = async () => {
        setLoading(true);
        setError(null);
        try {
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

    const handleDeleteUsers = async (id, user, email) => {

        const confirmed = window.confirm(`Are you sure you want to delete this user "${user}" (${email})?\nThis action cannot be undone.`);
  
        if(confirmed){
            setLoading(true);
            setError(null);

            try {
                const response = await deleteUser(id);
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                console.log('User delete successfully:', data);
                handleGetUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
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

    const handleUserDisabled = async (id, isDisabled) => {
        
        setLoading(true);
        setError(null);
        
        //alert(`handleGetUsers: ${id} : ${isAdmin}`);
        
        const payload = { 
            id: id,
            disabled: !isDisabled
        };

        try {
           const response = await setUserDisabled(payload);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            console.log('User is Disabled:', data);
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

    const filteredItems =  userList && userList.filter(user => {
        return (user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()))
    })
    
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
                <span className="fw-bold">Total users: {userLists ? userLists.length : 0}</span>
                Search : <input value={query} onChange={e => setQuery(e.target.value)} type="search" />
                {/*
                <Button variant="primary" onClick={(e) => handleGetUsers(e)} disabled={loading}>
                    {loading ? 'Loading...' : 'Get Users'}
                </Button>
                */}
            </Card.Body>
        </Card>
        {error && <div className="alert alert-danger">{error}</div>}

        <Row xs={1} md={2} lg={3} className="g-3">
            {filteredItems && filteredItems.map(user => (
                <Col key={user.id}>
                    <Card className="h-100 shadow-sm">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <strong>{user.name ? user.name : 'No Name'}</strong>
                            {/*{user.admin && <Badge bg="primary">Admin</Badge>}*/}
                            <Form>
                                <Form.Check 
                                    type="switch"
                                    id="custom-switch"
                                    label={user.disabled ? "Disable" : "Disable"}
                                    checked={user.disabled}
                                    onChange={(e) => handleUserDisabled(user.id, user.disabled)}
                                />
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
                        <Card.Footer className="d-flex justify-content-end">
                            <Button variant="warning" size="sm" onClick={() => handleDeleteUsers(user.id, user.name, user.email)} disabled={loading}>Delete</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    </>
  );
}
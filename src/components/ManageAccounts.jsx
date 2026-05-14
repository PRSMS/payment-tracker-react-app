import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Tab, Tabs, Card, Row, Col,
     Badge, Button, Dropdown, Offcanvas } from "react-bootstrap";
import { useAccounts } from "../context/AccountsContext";
import {formatStatus, formatDate, formatAmount } from "../lib/HelperFunction.js"
import { AddNewAccountForm } from "./AddNewAccountForm";

export function ManageAccounts() {
    const { Accounts, deleteAccount} = useAccounts();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAddCanvas, setshowAddCanvas] = useState(false);

    const filteredItems =  Object.fromEntries(
        Object.entries(Accounts).filter(([key, account]) => {
            return account.name.toLowerCase().includes(query.toLowerCase())
        })
    )

    const handleViewDetails = async (key) => {
        console.log("handleViewDetails :" , key);
    };
    
    const handleDeleteAccount = async (id, name) => {

        const confirmed = window.confirm(`Are you sure you want to delete this account "${name}"?\nThis action cannot be undone.`);
  
        if(confirmed){
            setLoading(true);
            //setError(null);

            try {
                const response = await deleteAccount(id);
                if (!response.ok) throw new Error("Network response was not ok");
                //const data = await response.json();
                console.log('Account delete successfully:', response);
                //handleGetUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
                //setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    }

    const handleCloseAddCanvas = () => setshowAddCanvas(false);
    const handleShowAddCanvas = () => setshowAddCanvas(true);

  return (
    <>   
        <Offcanvas show={showAddCanvas} onHide={() => handleCloseAddCanvas()}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Add New Account</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <AddNewAccountForm closeOffcanvas={handleCloseAddCanvas} />
            </Offcanvas.Body>
        </Offcanvas>   
           
        <Button 
            variant="info" 
            className="rounded-circle position-fixed" 
            onClick={() => handleShowAddCanvas()}
            style={{ bottom: '20px', right: '20px', zIndex: 1000 }}
        >
            {/* Icon or Text */}
            <span style={{ fontSize: '20px' }}><i className="fa fa-plus" style={{color: '#fff'}}/></span>
        </Button>          
        <Card className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center"><span className="fw-bold">
                Total accounts: {Accounts ? Object.keys(Accounts).length : 0}</span>
                <div style={{ position: 'relative', width: 'fit-content' }}>
                    <input value={query} onChange={e => setQuery(e.target.value)} type="search" style={{ paddingLeft: '30px' }}/>
                    <i className="fa fa-search" style={{ 
                    position: 'absolute', 
                    left: '10px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#aaa' 
                    }}/>
                </div>
        {/*  
                <span className="fw-bold">Total accounts: {accountList ? Object.keys(accountList).length : 0}</span>
                <Button variant="primary" onClick={handleGetAccounts}>Get Accounts</Button>
        */}
            </Card.Body>
        </Card>
        <Row xs={1} md={2} lg={3} className="g-3">
            {Object.entries(filteredItems).map(([key, account]) => (
                <Col key={key}>
                    <Card className="h-100 shadow-sm">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <strong>{account.name}</strong>
                            <Badge bg={
                                account.account_status === 0 ? 'secondary' :
                                account.account_status === 1 ? 'warning' : 'success'
                            }>
                                {account.account_status === 0 ? 'Pending' : 
                                    account.account_status === 1 ? 'On-going' : 'Done'}
                            </Badge>
                        </Card.Header>
                        <Card.Body>
                            {/*<Card.Text>*/}
                                <div className="mb-2">
                                    <strong>Amount:</strong> {formatAmount(account.amount)}
                                </div>
                                <div className="mb-2">
                                    <strong>Date Created:</strong> {formatDate(account.start_date)}
                                </div>
                                <div className="mb-2">
                                    <strong>Created by:</strong> {account.created_by}
                                </div>
                                <div>
                                    <strong>Remarks:</strong> {account.remarks}
                                </div>
                            {/*</Card.Text>*/}
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-end">
                            <Button variant="warning" size="sm" className="m-1" onClick={() => handleDeleteAccount(key, account.name)} disabled={loading}>Delete</Button>
                            <Button variant="info" size="sm" className="m-1" href={`#/accountDetails/${key}`} onClick={() => handleViewDetails(key)} >View Details</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    </>
  );
}
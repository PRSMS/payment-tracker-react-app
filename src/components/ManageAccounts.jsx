import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Tab, Tabs, Card, Row, Col, Badge, Button } from "react-bootstrap";
import { getAllAccounts } from '../lib/FirebaseAPICall.js';

export function ManageAccounts() {
    const [accountList, setAccountList] = useState([]);

    const handleGetAccounts = () => {
        getAllAccounts().then((message) => {
            console.log('Accounts retrieved successfully:', message);       
            setAccountList(message);
        }).catch((error) => {
            console.error('Error fetching accounts:', error);
        });
    }
  return (
    <>                    
        <Card className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">Total accounts: {accountList ? Object.keys(accountList).length : 0}</span>
                <Button variant="primary" onClick={handleGetAccounts}>Get Accounts</Button>
            </Card.Body>
        </Card>
        <Row xs={1} md={2} lg={3} className="g-3">
            {Object.entries(accountList).map(([key, account]) => (
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
                                    <strong>Amount:</strong> ${account.amount}
                                </div>
                                <div>
                                    <strong>Remarks:</strong> {account.remarks}
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
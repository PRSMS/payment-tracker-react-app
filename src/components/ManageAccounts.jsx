import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Tab, Tabs, Card, Row, Col, Badge, Button } from "react-bootstrap";
import { useAccounts } from "../context/AccountsContext";
import {formatStatus, formatDate, formatAmount } from "../lib/HelperFunction.js"

export function ManageAccounts() {
    const { Accounts } = useAccounts();
    const [query, setQuery] = useState("");

    const filteredItems =  Object.fromEntries(
        Object.entries(Accounts).filter(([key, account]) => {
            return account.name.toLowerCase().includes(query.toLowerCase())
        })
    )

    const handleViewDetails = async (key) => {
        console.log("handleViewDetails :" , key);
    };

  return (
    <>                  
        <Card className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center"><span className="fw-bold">
                Total accounts: {Accounts ? Object.keys(Accounts).length : 0}</span>
                Search : <input value={query} onChange={e => setQuery(e.target.value)} type="search" />
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
                            <Button variant="warning" size="sm" href={`#/accountDetails/${key}`} onClick={() => handleViewDetails(key)} >View Details</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    </>
  );
}
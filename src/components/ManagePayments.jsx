import React, { useState } from 'react'
import { usePaymentLists } from "../context/PaymentListsContext";
import { Container, Tab, Tabs, Card, Row, Col,
     Badge, Button, Dropdown, Offcanvas } from "react-bootstrap";
import {formatStatus, formatDate, formatAmount } from "../lib/HelperFunction.js"

export function ManagePayments({ id }) {
    const [loading, setLoading] = useState(false);
    const { PaymentLists } = usePaymentLists();
        const [query, setQuery] = useState("");
    //const account = accounts.find(acc => acc.id === id);

    const filteredItems =  Object.fromEntries(
        Object.entries(PaymentLists).filter(([key, payment]) => {
            return payment.name.toLowerCase().includes(query.toLowerCase())
        })
    );

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            {/*
            <h1>Manage Payments for Account ID: {id}</h1>
            <p>Account Name: </p>*/}
            {/* Implement payment management functionality here */}
            <div style={{ position: 'relative', width: 'fit-content' }}>
                    <input value={query} onChange={e => setQuery(e.target.value)} type="search" style={{ paddingLeft: '30px' }} />
                    <i className="fa fa-search" style={{ 
                    position: 'absolute', 
                    left: '10px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#aaa' 
                    }}></i>
            </div>
        </div>

        <Row xs={1} md={2} lg={3} className="g-3">
            {Object.entries(filteredItems).map(([key, payment]) => (
                <Col key={key}>
                    <Card className="h-100 shadow-sm">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <strong>{payment.name}</strong>
                            <Badge bg={
                                payment.status === 0 ? 'secondary' :
                                payment.status === 1 ? 'warning' : 'success'
                            }>
                                {payment.status === 0 ? 'Pending' : 
                                    payment.status === 1 ? 'On-going' : 'Done'}
                            </Badge>
                        </Card.Header>
                        <Card.Body>
                            {/*<Card.Text>*/}
                                <div className="mb-2">
                                    <strong>Amount:</strong> {formatAmount(payment.amount)}
                                </div>
                                <div className="mb-2">
                                    <strong>Date Created:</strong> {formatDate(payment.date_created)}
                                </div>
                                <div className="mb-2">
                                    <strong>Created by:</strong> {payment.created_by}
                                </div>
                                <div>
                                    <strong>Remarks:</strong> {payment.remarks}
                                </div>
                            {/*</Card.Text>*/}
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-end">
                            {/*
                            <Button variant="warning" size="sm" className="m-1" onClick={() => handleDeleteAccount(key, account.name)} disabled={loading}>Delete</Button>
                            <Button variant="info" size="sm" className="m-1" href={`#/accountDetails/${key}`} onClick={() => handleViewDetails(key)} >View Details</Button>
                            */}
                            </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
        </>
    );
}
import { useState, useEffect } from 'react';

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
/*
import { getAccountViaId, 
    getTermViaAccountId,
    getPaymentViaAccountID } from '../lib/FirebaseAPICall.js';
*/
import { useParams, Link, useNavigate } from 'react-router-dom';

//import Card from 'react-bootstrap/Card';
//import Nav from 'react-bootstrap/Nav';
import { Container, Tab, Tabs, Badge, 
    Button, Card, Dropdown, DropdownButton, ButtonGroup  } from "react-bootstrap";

import { useAuth } from "../context/AuthContext";
import { useAdminAPI } from '../context/AdminAPIContext.jsx';
import { useAccounts } from "../context/AccountsContext";

import {formatStatus, formatDate, formatAmount } from "../lib/HelperFunction.js"

import { PaymentListsProvider } from "../context/PaymentListsContext";
import { ManagePayments } from "./ManagePayments";
import { TermListsProvider } from "../context/TermListsContext";
import { ManageTerms } from "./ManageTerms";

//import { GearFill } from 'react-bootstrap-icons'; // Example icon
//DataTable.use(DT);

export function AccountDetails() {
    const { accountId } = useParams(null);
    const [tabKey, setTabKey] = useState('details');
    const [loading, setLoading] = useState(true);
    //const [show, setShow] = useState(false);

    const { Accounts } = useAccounts();
    const account = Accounts[accountId];

    const navigate = useNavigate();

    const handleGoBack = async (e) => {
        e.preventDefault()
        navigate(-1);
    }
/*
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    */
    //if (loading) return <p>Loading...</p>;
    return (
        <>
{/*}
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
        </Offcanvas>
*/}
{/*}
        <DropdownButton 
            variant="info" 
            className="rounded-circle position-fixed" 
            onClick={() => handledropDown()}
            style={{ bottom: '20px', right: '20px', zIndex: 1000 }}
        >
            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>
              Active Item
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
            */}
            {/* Icon or Text */}
            {/*<span style={{ fontSize: '20px' }}><i className="fa fa-bars" style={{color: '#fff'}}/></span>*/}
        {/*</DropdownButton>  */}

        <Dropdown className="position-fixed bottom-0 end-0 m-4" style={{ zIndex: 1050 }}>
        <Dropdown.Toggle 
            variant="primary" 
            className="rounded-circle custom-dropdown-toggle"
            id="dropdown-circle"
            style={{ width: '50px', height: '50px', padding: '0'}}
        >
            <span style={{ fontSize: '20px' }}><i className="fa fa-bars" style={{color: '#fff'}}/></span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={(e) => handleGoBack(e)}><i className="fa fa-backward"></i> Back</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        <br />
            <Card className="mb-3">
                <Card.Body className="d-flex justify-content-between align-items-center">
                    <h3>
                    <strong>Account:</strong> <code className="small">{account.name}</code>
                    </h3>
                    {/*
                    <Button variant="primary" onClick={(e) => handleGoBack(e)} >
                        <i className="fa fa-home"></i>
                    </Button>
                    */}
                    {/*
                    <Button variant="primary" onClick={(e) => handleGetUsers(e)} disabled={loading}>
                        {loading ? 'Loading...' : 'Get Users'}
                    </Button>
                    */}
                </Card.Body>
            </Card>
            <Tabs
            id="controlled-tab-example"
            activeKey={tabKey}
            onSelect={(k) => setTabKey(k)}
            className="mb-3"
            >
                <Tab eventKey="details" title="Details">
                    <Card className="h-100 shadow-sm">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <strong>{account.name}</strong>
                        </Card.Header>
                        <Card.Body>
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

                        </Card.Body>
                    </Card>
                </Tab>
                <Tab eventKey="terms" title="Terms">
                    <TermListsProvider><ManageTerms id={accountId} /></TermListsProvider>
                </Tab>
                <Tab eventKey="payments" title="Payments">
                    <PaymentListsProvider><ManagePayments id={accountId} /></PaymentListsProvider>

                </Tab>
            </Tabs>
        </>
    );
}
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Tab, Tabs, Badge, Button } from "react-bootstrap";

import { SignUp } from "./SignUp.jsx";
import { ManageUsers } from "./ManageUsers.jsx";
import { ManageAccounts } from "./ManageAccounts.jsx";

export function Dashboard() {
    const { logout, currentUser, currentUserClaims } = useAuth();
    const [tabKey, setTabKey] = useState('home');

    return (
        <Container className="align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            
            <Tabs
            id="controlled-tab-example"
            activeKey={tabKey}
            onSelect={(k) => setTabKey(k)}
            className="mb-3"
            >
                <Tab eventKey="home" title="Home">
                    <h1>Dashboard</h1>
                    <p>Welcome back, <strong className="text-success bg-light">{currentUser?.displayName ? currentUser.displayName : 'User'}</strong> ({currentUser?.email ? currentUser.email : 'User Email'})</p>

                    <Button variant="outline-danger" onClick={logout}>Log Out</Button>
                </Tab>
                {/* Admin manage payment-tracker users*/}
                {currentUserClaims?.admin ? 
                    <Tab eventKey="users" title="Users"><ManageUsers /> </Tab>
                : null}
                {/* Admin manage payment-tracker accounts*/}
                <Tab eventKey="accounts" title="Accounts">
                    <ManageAccounts />
                </Tab>
                {/* Admin On Boarding Tracker Sign Up */}
                {currentUserClaims?.admin ?
                    <Tab eventKey="signup" title="Sign Up">
                        <h1>Admin On Boarding Tracker User</h1>
                        <p>Welcome to the tracker signup!</p>
                        <SignUp />
                    </Tab>
                : null}
            </Tabs>
        </Container>
    );
}   
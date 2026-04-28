import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, ListGroup, Tab , Tabs} from "react-bootstrap";

import { getAllAccounts } from '../lib/FirebaseAPICall.js';
    
export function Dashboard() {
    const { logout } = useAuth();
    const [userList, setUserList] = useState(null);
    const [accountList, setAccountList] = useState([]);
  const [tabKey, setTabKey] = useState('home');

    const handleGetUsers = () => {
        fetch('http://localhost:3000/api/users')
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

    const handleGetAccounts = () => {
        getAllAccounts().then((message) => {
            console.log('Accounts retrieved successfully:', message);       
            setAccountList(message);
        }).catch((error) => {
            console.error('Error fetching accounts:', error);
        });
    }

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
                    <p>Welcome to the dashboard!</p>

                    <button onClick={logout}>Log Out</button>
                </Tab>
                <Tab eventKey="users" title="Users">
                    Tab content for Users
                    <br /><hr />
                    <button onClick={handleGetUsers}>Get Users</button>
                    <br /><hr />
                    {/*}
                    <ul style={{listStyleType: 'none', padding: 0, margin: 0 }}>
                        {userList && userList.map(user => (
                            <li key={user.id}>{user.id} - {user.email}</li>
                        ))}
                    </ul>
                    */}
                    <span>Total users: {userList ? userList.length : 0}</span>
                    <ListGroup style={{listStyleType: 'none', padding: 0, margin: 0 }}>
                        {userList && userList.map(user => (
                            <ListGroup.Item key={user.id}>{user.displayName ? user.displayName : 'None'} - {user.email} - {user.id}</ListGroup.Item>
                        ))}
                    </ListGroup>
                    <br /><hr />
                </Tab>
                <Tab eventKey="accounts" title="Accounts">
                    Tab content for Accounts
                    <br /><hr />
                    <button onClick={handleGetAccounts}>Get Accounts</button>
                    <br /><hr />
                    <span>Total accounts: {accountList ? Object.keys(accountList).length : 0}</span>
                    <ListGroup style={{listStyleType: 'none', padding: 0, margin: 0 }}>
                        {Object.entries(accountList).map(([key, account]) => (
                            <ListGroup.Item key={key}>{account.name} - {account.amount} - {account.account_status} : {account.remarks}</ListGroup.Item>
                        ))} 
                    </ListGroup>
                </Tab>
            </Tabs>
        </Container>
    );
}   
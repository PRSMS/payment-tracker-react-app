import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Tab, Tabs, Badge, Button } from "react-bootstrap";

//import {OffcanvasExample} from './Navbar.jsx'; 

//import { SignUp } from "./SignUp.jsx";
//import { ManageUsers } from "./ManageUsers.jsx";
//import { ManageAccounts } from "./ManageAccounts.jsx";

//import { AdminAPIProvider } from '../context/AdminAPIContext.jsx';
//import { AccountsProvider } from "../context/AccountsContext";

export function Dashboard() {
    const { logout, currentUser, currentUserClaims } = useAuth();
    //const [tabKey, setTabKey] = useState('home');

    return (
        <>                  
            {/*<h1>Dashboard</h1>*/}
            <h1>Welcome to the Payment Tracker App</h1>
            <p>This is a simple application to track your payments and manage your accounts.</p>
            <p>Welcome back, <strong className="text-success bg-light">{currentUser?.displayName ? currentUser.displayName : 'User'}</strong> ({currentUser?.email ? currentUser.email : 'User Email'})</p>

            <Button variant="outline-danger" onClick={() => logout()}>Log Out</Button>
</>

    );
}   
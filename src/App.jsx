import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css'
//import { BrowserRouter, HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

//import {Home} from './components/Home.jsx';
import {About} from './components/About.jsx'; 
import {Login} from './components/LogIn.jsx'; 
import { ManageUsers } from "./components/ManageUsers.jsx";
import { ManageAccounts } from "./components/ManageAccounts.jsx";

import {AccountDetails} from './components/AccountDetails.jsx'; 
import {OffcanvasExample} from './components/Navbar.jsx'; 

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {HashRouter as Router, Routes, Route, Link} from 'react-router-dom';

import { Dashboard } from './components/Dashboard.jsx';
import { SignUp } from "./components/SignUp.jsx";
import { ForgotPassword } from "./components/ForgotPassword.jsx";
import PrivateRoute from './components/PrivateRoute';

import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { AdminAPIProvider } from './context/AdminAPIContext.jsx';
import { AccountsProvider } from "./context/AccountsContext";

function App() {
  const [count, setCount] = useState(0);
  const [accountLists, setAccountLists] = useState([]);

  const { currentUser } = useAuth();
  const baseURL = import.meta.env.VITE_BASE_URL;
{/*
  const handleClick = () => {
    getAllAccounts().then((message) => {
      console.log('Accounts retrieved successfully:', message);
      setAccountLists(message);
    }).catch((error) => {
      console.error('Error fetching accounts:', error);
    });
  };
*/}
  return (
    <>
    {/*}
      {currentUser ? (
        <Dashboard />
      ) : (
        <Login />
      )}
*/}
      <AuthProvider>
      <Container className="align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        {/*}
        <Button variant="primary" href={`${baseURL}/login`}>Log In</Button>{' '}
        <Button variant="secondary" href={`${baseURL}/signup`}>Sign Up</Button>
        */}
        {/*<Router basename={import.meta.env.VITE_BASE_URL}>*/}
        
        <OffcanvasExample />
        <Router>
              <Routes>

                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route path="/manage-users" element={<AdminAPIProvider><ManageUsers /></AdminAPIProvider>} />
                  <Route path="/manage-accounts" element={<AccountsProvider><ManageAccounts /></AccountsProvider>} />
                  <Route path="/accountDetails/:accountId" element={<AdminAPIProvider><AccountsProvider><AccountDetails /></AccountsProvider></AdminAPIProvider>} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
        </Router>
      </Container>
      </AuthProvider>
    </>
  )
}

export default App

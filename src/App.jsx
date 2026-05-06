import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css'
//import { BrowserRouter, HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

import {Home} from './components/Home.jsx';
import {About} from './components/About.jsx'; 
import {Login} from './components/LogIn.jsx'; 
import {AccountDetails} from './components/AccountDetails.jsx'; 
import {OffcanvasExample} from './components/Navbar.jsx'; 

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import { Dashboard } from './components/Dashboard.jsx';
import { SignUp } from "./components/SignUp.jsx";
import { ForgotPassword } from "./components/ForgotPassword.jsx";
import PrivateRoute from './components/PrivateRoute';

import { AuthProvider, useAuth } from './context/AuthContext.jsx';

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
      <Container className="align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <h1>Welcome to the Payment Tracker App</h1>
        <p>This is a simple application to track your payments and manage your accounts.</p>
        {/*}
        <Button variant="primary" href={`${baseURL}/login`}>Log In</Button>{' '}
        <Button variant="secondary" href={`${baseURL}/signup`}>Sign Up</Button>
        */}
        <Router basename={import.meta.env.VITE_BASE_URL}>
          <AuthProvider>
              <Routes>

                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                  <Route exact path="/" element={<Dashboard />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
          </AuthProvider>
        </Router>
      </Container>
    </>
  )
}

export default App

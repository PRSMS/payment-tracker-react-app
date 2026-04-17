import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

//import './App.css'
import { BrowserRouter, HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

import {Home} from './components/Home.jsx';
import {About} from './components/About.jsx'; 
import {Login} from './components/LogIn.jsx'; 
import {AccountDetails} from './components/AccountDetails.jsx'; 

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
  const [count, setCount] = useState(0);
  const [accountLists, setAccountLists] = useState([]);

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
    <Router>
      {/* Navigation */}
      <Navbar expand="lg" className="bg-body-tertiary" bg="primary" data-bs-theme="dark">
        <Container fluid>
          <img
            className="d-inline-block align-top"
            src={heroImg}
            alt=""
            width="48"
            height="38"
          />
          &emsp;
          <Navbar.Brand href="#home">Admin Office</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#login">Login</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        {/*
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/login">Login</Link>
        */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
          <Route path="accountdetails/:accountId" element={<AccountDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App

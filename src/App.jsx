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
import {OffcanvasExample} from './components/Navbar.jsx'; 

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
        <OffcanvasExample />
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

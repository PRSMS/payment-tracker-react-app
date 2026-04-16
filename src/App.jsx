import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {Home} from './components/Home.jsx';
import {About} from './components/About.jsx'; 
import {Login} from './components/LogIn.jsx'; 

function App() {
  const [count, setCount] = useState(0);
  const [accountLists, setAccountLists] = useState([]);
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
    <BrowserRouter>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {Home} from './components/Home.jsx';
import {About} from './components/About.jsx'; 
import {Login} from './components/LogIn.jsx'; 

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
      <nav>
        <img
          className="framework"
          src={heroImg}
          alt=""
          width="48"
          height="38"
        />
        <a href="./">Admin Office</a>
        {/*<button
          type="button"
          id="navbarSideCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>*/}
        <div
          className="navbar-collapse offcanvas-collapse"
          id="navbarsExampleDefault"
        >
          <ul>
            <li>
              {/*<a className="nav-link" href="/login">Login</a>*/}
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
        </div>
        {/*
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/login">Login</Link>
        */}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App

import React, { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import reactLogo from '../assets/react.svg'

import { useAuth } from "../context/AuthContext";

export function OffcanvasExample() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [dataBsTheme, setDataBsTheme] = useState('Light');
  const { logout, currentUser, currentUserClaims } = useAuth();
    
  useEffect(() => {
    //const adminStatus = sessionStorage.getItem('isAdmin');

    currentUserClaims && currentUserClaims.admin === true ? setIsAdmin(true) : setIsAdmin(false);
  }, [currentUserClaims]);

  useEffect(() => {
    // This updates the <html data-bs-theme="..."> tag
    document.documentElement.setAttribute('data-bs-theme', dataBsTheme);
  }, [dataBsTheme]);

  return (
    <>
      {currentUser ? (
        <Navbar key="sm" expand="sm" collapseOnSelect className="bg-body-tertiary mb-3" style={{position:'sticky', top:0, zIndex: 1000}}>
          <Container fluid>
            <img
                className="d-inline-block align-top"
                src={reactLogo}
                alt=""
                width="48"
                height="38"
            />
            &emsp;
            <Navbar.Brand href="#/">{isAdmin ? "Admin Office" : "User Office"}</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-sm`}
              aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                    <img
                        className="d-inline-block align-top"
                        src={reactLogo}
                        alt=""
                        width="48"
                        height="38"
                    />
                    &emsp;
                  {isAdmin ? " Admin Office" : " User Office"}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-front flex-grow-1 pe-3">
                  <Nav.Link href="#/">Home</Nav.Link>
                  {isAdmin ? (
                    <Nav.Link href="#/manage-users">Manage Users</Nav.Link>
                  ) : null}
                  <Nav.Link href="#/manage-accounts">Manage Accounts</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-sm`}
                  >
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
                <form>
                  <Form.Check 
                      type="switch"
                      id="custom-switch"
                      label={dataBsTheme === 'dark' ? <i className="fa fa-moon-o"></i> : <i className="fa fa-sun-o"></i>}
                      checked={dataBsTheme === 'dark'}
                      onChange={(e) => setDataBsTheme(e.target.checked ? 'dark' : 'light')}
                  />
                </form>
                &emsp;
                <NavDropdown
                    title={<i className="fa fa-cog"></i>}
                    id={`offcanvasNavbarDropdown-expand-sm`}
                  >
                    <NavDropdown.Item onClick={() => setDataBsTheme('auto')}>Auto</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => setDataBsTheme('light')}>
                      <i className="fa fa-sun-o"></i> Light
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => setDataBsTheme('dark')}>
                      <i className="fa fa-moon-o"></i> Dark
                    </NavDropdown.Item>
                  </NavDropdown>
                &emsp;
                <Nav.Link variant="outline-secondary" onClick={() => logout()}><i className="fa fa-power-off"></i></Nav.Link>
                  
                {/*}
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>*/}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ) : (
        null
      )}
    </>
  );
}

import { Car, AccountInfo } from './components/AccountLists.jsx';

import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Form from 'react-bootstrap/Form';

export function Home() {
  const [show, setShow] = useState(false);

  const handleCloseCreateAccount = () => setShow(false);
  const handleShowCreateAccount  = () => setShow(true);

  return (
    <>
        <Offcanvas show={show} onHide={handleCloseCreateAccount}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Add New Account</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
        <Container className="p-3">
            <Card>
                {/* <Card.Img variant="top" src="https://placeholder.com" /> */}
                <Card.Header>
                    <div className="row row-cols-2">
                        <div className="col-sm">
                            <h6 className="">Accounts Lists</h6>
                        </div>
                        <div className="col-sm">
                            {/*<Button variant="outline-primary" className="float-end" onClick={handleShow }>Create</Button>*/}
                            <a variant="outline-primary" className="nav-link float-end" onClick={handleShowCreateAccount}><i className="fa fa-plus-square"></i> Create</a>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                        <AccountInfo  />
                    {/*<Card.Title></Card.Title> */}
                    {/*<Card.Text></Card.Text>*/}
                    {/*<Button variant="primary">Learn More</Button>*/} 
                </Card.Body>
            </Card>
        </Container>
        
        {/* 
            <div className="App">
            <h1>Hello World!</h1>
            </div>
            <Car color="red" brand="Toyota" model="Corolla" />
        */}
            {/*<button onClick={handleClick}>Click Me</button>*/}
    </>
    );
}
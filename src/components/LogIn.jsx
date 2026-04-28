import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Card, Container, Form , Col, Row, Button } from 'react-bootstrap';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();
  console.log(auth); 

  const { login, loginWithPersistence } = auth;

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      //await login(email, password)
      //login(email, password)
      loginWithPersistence(email, password)
    } catch (error) {
      console.error('Error logging in:', error)
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card className="p-4" style={{ maxWidth: '400px', width: '100%' }}> 
      <h1 className='d-flex align-items-center justify-content-center'>Login Page</h1>
      <form onSubmit={handleSubmit}>
        {/*}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        */}
        <br /><hr />
        <Form.Group as={Col} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <br /><hr />
        <Form.Group as={Row} className="">
          <Col>
            <Button type="submit">Login</Button>
          </Col>
        </Form.Group>
        {/*<button type="submit">Login</button>*/}
      </form>
      </Card>
    </Container>
  )
}
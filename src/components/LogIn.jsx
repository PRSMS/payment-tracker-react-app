import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Card, Container, Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { Link, useNavigate  } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const auth = useAuth();
  console.log(auth); 
  const baseURL = import.meta.env.VITE_BASE_URL;

  const { login, loginWithPersistence } = auth;

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await loginWithPersistence(email, password)
      navigate('/'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Error logging in:', error)
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow-lg" style={{ maxWidth: '450px', width: '100%', border: 'none' }}>
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Welcome Back</h2>
            <p className="text-muted">Sign in to your account</p>
          </div>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Email Address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <InputGroup>
                <Form.Control 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  size="lg"
                />
                <Button 
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputGroup>
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <Form.Check type="checkbox" label="Remember me" />
              <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
            </div>

            <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold" size="lg">
              Sign In
            </Button>
          </Form>

          <div className="text-center mt-4">
            <p className="text-muted">
              Don't have an account?{' '}
              <Link to="/signup" className="text-decoration-none fw-semibold">Sign up</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}
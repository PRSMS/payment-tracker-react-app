import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Card, Container, Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const auth = useAuth();
  console.log(auth); 
  const baseURL = import.meta.env.VITE_BASE_URL;

  const { resetPassword } = auth;

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setMessage(''); // Clear previous messages
      await resetPassword(email);
      setMessage('Password reset email sent successfully.');
      //navigate('/'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Error resetting password:', error)
      setError('Error sending password reset email.');
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow-lg" style={{ maxWidth: '450px', width: '100%', border: 'none' }}>
        <Card.Body className="p-5">
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Reset Your Password</h2>
            <p className="text-muted">Enter your email to receive a password reset link</p>
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

            <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold" size="lg">
              Reset Password
            </Button>
          </Form>

          <div className="text-center mt-4">
            <p className="text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-decoration-none fw-semibold">Login</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

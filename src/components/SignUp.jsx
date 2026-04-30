import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Card, Container, Form, Button, InputGroup } from 'react-bootstrap';
//import { Link } from 'react-router-dom';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const auth = useAuth();
  //console.log(auth); 

  const { signup } = auth;

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Username validation
    if (!displayName.trim()) {
      newErrors.displayName = 'Username is required';
    } else if (displayName.trim().length < 3) {
      newErrors.displayName = 'Username must be at least 3 characters';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        handleAdminSignUpPost(); // Post to backend
      } catch (error) {
        console.error('Error signing up:', error)
      }
    }
  }

const handleAdminSignUpPost = async () => {
  const data = { 
    name: displayName, 
    email: email, 
    password: password 
  };

  try {
    const response = await fetch(' http://localhost:3000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Critical for sending JSON
      },
      body: JSON.stringify(data), // Data must be stringified
    });

    const result = await response.json();
    console.log('Success:', result);
    window.location.reload();
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow-lg" style={{ maxWidth: '450px', width: '100%', border: 'none' }}>
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Create Account</h2>
            <p className="text-muted">Sign up to get started</p>
          </div>
          
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Email Address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({...errors, email: ''});
                }}
                isInvalid={!!errors.email}
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="fw-semibold">Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your username" 
                value={displayName} 
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  if (errors.displayName) setErrors({...errors, displayName: ''});
                }}
                isInvalid={!!errors.displayName}
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.displayName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <InputGroup>
                <Form.Control 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a password" 
                  value={password} 
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({...errors, password: ''});
                  }}
                  isInvalid={!!errors.password}
                  size="lg"
                />
                <Button 
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold" size="lg">
              Sign Up
            </Button>
          </Form>
{/*}
          <div className="text-center mt-4">
            <p className="text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-decoration-none fw-semibold">Sign in</Link>
            </p>
          </div>*/}
        </Card.Body>
      </Card>
    </Container>
  )
}
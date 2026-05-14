import React, { useState } from 'react'
import { Card, Container, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAccounts } from "../context/AccountsContext";
import { useAuth } from "../context/AuthContext";

export function AddNewAccountForm({ closeOffcanvas }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState({});

    const { Accounts, addNewAccount } = useAccounts();

    const validateForm = () => {
        const newErrors = {};

        // Username validation
        if (!name.trim()) {
            newErrors.name = 'Username is required';
        } else if (name.trim().length < 3) {
            newErrors.name = 'Username must be at least 3 characters';
        }

        // Amount validation
        if (!amount.trim()) {
            newErrors.amount = 'Amount is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        const newData = {};
        newData.name = name;
        newData.amount = amount;

        console.log('newData :', newData)

        if (validateForm()) {
            try {
                //handleAdminSignUpPost(); // Post to backend
                const response = await addNewAccount(newData)
                if (!response?.ok) throw new Error("Network response was not ok");
                closeOffcanvas();
                console.log("Sava Data:", response)
            } catch (error) {
                console.error('Error signing up:', error)
            }
        }

    }

    return (
        <Form onSubmit={handleSubmit} noValidate>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className="fw-semibold">Account Name</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter account name" 
                value={name} 
                onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({...errors, name: ''});
                }}
                isInvalid={!!errors.name}
                size="lg"
                />
                <Form.Control.Feedback type="invalid">
                {errors.name}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className="fw-semibold">Amount</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter amount" 
                value={amount} 
                onChange={(e) => {
                    setAmount(e.target.value);
                    if (errors.amount) setErrors({...errors, amount: ''});
                }}
                isInvalid={!!errors.amount}
                size="lg"
                />
                <Form.Control.Feedback type="invalid">
                {errors.amount}
                </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold" size="lg">
                Add
            </Button>
        </Form>

    )
}
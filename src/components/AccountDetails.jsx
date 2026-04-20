import { useState, useEffect } from 'react';

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

import { getAccountViaId, 
    getTermViaAccountId,
    getPaymentViaAccountID } from '../lib/FirebaseAPICall.js';

import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

DataTable.use(DT);

export function AccountDetails() {
    const { accountId } = useParams(null);
    const [loading, setLoading] = useState(true);


    //if (loading) return <p>Loading...</p>;
    return (
        <>
            <Container>
                <Card border="info" >
                    <Card.Body>
                        <Card.Title>Account Information</Card.Title>
                        <Details accountId={accountId} />
                        <Terms accountId={accountId} />
                        <Payments accountId={accountId} />
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
function Details(accountId) {

    const [accountData, setAccountData] = useState(null);

    useEffect(() => {
        // Fetch account details            
        getAccountViaId(accountId.accountId).then((accountData) => {
            console.log('Account details retrieved successfully:', accountData);
            setAccountData(accountData);
            //setLoading(false);
        }).catch((error) => {
            console.error('Error fetching account details:', error);
            //setLoading(false);
        });
    }, []);

    return (
        <>
            <h1>Account : {accountData?.name}</h1>
        </>
    );
}

function Terms(accountId) {
    const [termsData, setTermsData] = useState(null);

    useEffect(() => {
        // Fetch terms for the account
        getTermViaAccountId(accountId.accountId).then((termsData) => {
            console.log('Terms retrieved successfully:', termsData);
            const data = Object.values(termsData).map(term => {
                return [
                    term.term || '',
                    formatDate(term.due_date) || '',
                    formatAmount(term.amortization) || '',
                    term.status || '',
                    term.remarks || ''
                ];
            });
            setTermsData(data);
            //setLoading(false);
        }).catch((error) => {
            console.error('Error fetching terms:', error);
            //setLoading(false);
        });  
        
    }, []);

    return (
        <>
            <h1>Terms</h1>
            {/* Render DataTable here account-table*/}
            <DataTable data={termsData} className="table table-striped table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Due Date</th>
                        <th>Amortization</th>
                        <th>Status</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
            </DataTable>
            
        </>
    );
}

function Payments(accountId) {
    const [paymentsData, setPaymentsData] = useState(null);
    useEffect(() => {
        // Fetch payments for the account
        getPaymentViaAccountID(accountId.accountId).then((paymentsData) => {
            console.log('Payments retrieved successfully:', paymentsData);;
            const data = Object.values(paymentsData).map(payment => {
                return [
                    payment.name || '',
                    formatAmount(payment.amount) || '',
                    formatDate(payment.payment_date) || '',
                    payment.status || '',
                    payment.remarks || ''
                ];
            });
            setPaymentsData(data);
            //setLoading(false);
        }).catch((error) => {
            console.error('Error fetching payments:', error);
            //setLoading(false);
        });
    }, []);

    return (
        <>
            <h1>Payments</h1>
            {/* Render DataTable here account-table*/}
            <DataTable data={paymentsData} className="table table-striped table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
            </DataTable>
        </>
    );   

}

function formatStatus(statusValue) {
    if (!statusValue) return '';
    return statusValue.charAt(0).toUpperCase() + statusValue.slice(1);
}

function formatDate(dateValue) {
    if (!dateValue) return '';
    const date = new Date(dateValue);
    return date.toLocaleDateString();
}

function formatAmount(amountValue) {
    return amountValue != null && amountValue !== ''
        ? `₱${Number(amountValue).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`
        : '';
}
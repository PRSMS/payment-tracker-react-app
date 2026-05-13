import { useState, useEffect } from 'react';

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
/*
import { getAccountViaId, 
    getTermViaAccountId,
    getPaymentViaAccountID } from '../lib/FirebaseAPICall.js';
*/
import { useParams } from 'react-router-dom';

//import Card from 'react-bootstrap/Card';
//import Nav from 'react-bootstrap/Nav';
import { Container, Tab, Tabs, Badge, Button } from "react-bootstrap";

import { useAuth } from "../context/AuthContext";
import { useAdminAPI } from '../context/AdminAPIContext.jsx';
import { useAccounts } from "../context/AccountsContext";


import { PaymentListsProvider } from "../context/PaymentListsContext";

//DataTable.use(DT);

export function AccountDetails() {
    const { accountId } = useParams(null);
    const [tabKey, setTabKey] = useState('home');
    const [loading, setLoading] = useState(true);

    const { Accounts } = useAccounts();
    const account = Accounts[accountId];

    //if (loading) return <p>Loading...</p>;
    return (
        <>
            <div className="mb-2">
                <h3>
                <strong>Account:</strong> <code className="small">{account.name}</code>
                </h3>
            </div>
            
            <Tabs
            id="controlled-tab-example"
            activeKey={tabKey}
            onSelect={(k) => setTabKey(k)}
            className="mb-3"
            >
                <Tab eventKey="details" title="Details">
                    <h1>Details</h1>
                </Tab>
                <Tab eventKey="terms" title="Terms">
                    <h1>Terms</h1>
                </Tab>
                <Tab eventKey="payments" title="Payments">
                    <h1>Payments</h1>
                    <PaymentListsProvider></PaymentListsProvider>

                </Tab>
            </Tabs>
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
    /*
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
    */

    return (
        <>
        {/*
            <h1>Payments</h1>
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
            */}
        </>
    );   

}
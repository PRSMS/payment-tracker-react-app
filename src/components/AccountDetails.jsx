import { useState, useEffect } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

import { getAccountViaId, 
    getTermViaAccountId,
    getPaymentViaAccountID } from '../lib/FirebaseAPICall.js';

export function AccountDetails(accountId) {

    const [loading, setLoading] = useState(true);
    const [accountData, setAccountData] = useState(null);
    const [termsData, setTermsData] = useState(null);
    const [paymentsData, setPaymentsData] = useState(null);

    useEffect(() => {
        // Fetch account details            
        getAccountViaId(accountId.accountId).then((accountData) => {
            console.log('Account details retrieved successfully:', accountData);
            setAccountData(accountData);
            setLoading(false);
        }).catch((error) => {
            console.error('Error fetching account details:', error);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        // Fetch terms for the account
        getTermViaAccountId(accountId.accountId).then((termsData) => {
            console.log('Terms retrieved successfully:', termsData);
            setTermsData(termsData);
            setLoading(false);
        }).catch((error) => {
            console.error('Error fetching terms:', error);
            setLoading(false);
        });  
        
    }, []);

    useEffect(() => {
        // Fetch payments for the account
        getPaymentViaAccountID(accountId.accountId).then((paymentsData) => {
            console.log('Payments retrieved successfully:', paymentsData);
            setPaymentsData(paymentsData);
            setLoading(false);
        }).catch((error) => {
            console.error('Error fetching payments:', error);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading...</p>;
    return (
        <>
            <h1>Account Details</h1>
            <h1>Terms</h1>
            {/* Render DataTable here account-table*/}
            <DataTable data={termsData} className="display account-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Due Date</th>
                        <th>Amortization</th>
                        <th>Status</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
            </DataTable>
            
            <h1>Payments</h1>
            {/* Render DataTable here account-table*/}
            <DataTable data={paymentsData} className="display account-table">
                <thead>
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
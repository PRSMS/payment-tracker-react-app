import { useState, useEffect } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

import { getAllAccounts } from '../lib/FirebaseAPICall.js';

DataTable.use(DT);

export function Car({color, brand, ...rest}) {
  return (
    <h2>My {brand} {rest.model} is {color}!</h2>
  );
}

export function AccountInfo() {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllAccounts().then((message) => {
            console.log('Accounts retrieved successfully:', message);
                const data = Object.values(message).map(account => {
                    const amountValue = account.amount;
                    const formattedAmount = amountValue != null && amountValue !== ''
                        ? `₱${Number(amountValue).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}`
                        : '';

                    return [
                        account.name || '',
                        account.account_status || '',
                        formattedAmount,
                        account.remarks || ''
                    ];
                });
                setTableData(data);
                setLoading(false);
        }).catch((error) => {
            console.error('Error fetching accounts:', error);
            setLoading(false);
        });
    }, []);

  {/*}  
    useEffect(() => {
        if (accountLists) {
            const data = Object.values(accountLists).map(account => {
                const amountValue = account.amount;
                const formattedAmount = amountValue != null && amountValue !== ''
                    ? `₱${Number(amountValue).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}`
                    : '';

                return [
                    account.name || '',
                    account.account_status || '',
                    formattedAmount,
                    account.remarks || ''
                ];
            });
            setTableData(data);
        }
    }, [accountLists]);
*/}

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1>Account Lists!!!!</h1>
      {/* Render account list here */}
      {/*
      <ul>
        {Object.entries(accountLists).map(([key, account]) => (
            <li key={key}>{key}: {account.name} - {account.amount}</li>
        ))}
      </ul>
      */}
        {/* Render DataTable here account-table*/}
        <DataTable data={tableData} className="display account-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Account Status</th>
                    <th>Amount</th>
                    <th>Remarks</th>
                </tr>
            </thead>
        </DataTable>
    </div>
  );
}
import { useState, useEffect } from 'react';

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
                //setTableData(data);
                setTableData(message);
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
    <div className="pt-3">
      {/*<h1>Account Lists!</h1> */}
      {/* Render account list here */}
      {/*
      <ul>
        {Object.entries(accountLists).map(([key, account]) => (
            <li key={key}>{key}: {account.name} - {account.amount}</li>
        ))}
      </ul>
      */}
        {/* Render DataTable here account-table*/}
        {/*}
        <DataTable className="table table-striped table-bordered table-hover" options={{responsive: true}}>
            <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Account Status</th>
                    <th>Amount</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(tableData).map(([key, account]) => (
                    <tr key={key}>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle>
                                    {account.name || 'No Name'}&emsp;<i className="fa fa-eye"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href={`#accountdetails/${key}`}>See Details</Dropdown.Item>
                                    <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                                    <Dropdown.Item href="#/action-1">Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                        <td>{account.account_status}</td>
                        <td>{account.amount}</td>
                        <td>{account.remarks}</td>
                    </tr>
                ))}
            </tbody>
        </DataTable>
        */}
        <ul style={{listStyleType: 'none', padding: 0, margin: 0 }}>
            {Object.entries(tableData).map(([key, account]) => (
                <li className="pt-3"  key={key}>
                    <Card>
                        <Card.Header>{account.name || 'No Name'}</Card.Header>
                        <Card.Body>
                            <Card.Title>{account.amount} : {account.account_status}</Card.Title>
                            <Card.Text>
                            {account.remarks}
                            </Card.Text>
                            <Button variant="primary" href={`#accountdetails/${key}`}>See Details</Button>
                        </Card.Body>
                    </Card>
                </li>
            ))}
        </ul>
    </div>
  );
}
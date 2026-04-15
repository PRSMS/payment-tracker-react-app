import { useState, useEffect } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

DataTable.use(DT);

export function Car({color, brand, ...rest}) {
  return (
    <h2>My {brand} {rest.model} is {color}!</h2>
  );
}

export function AccountInfo({accountLists}) {
    const [tableData, setTableData] = useState([]);

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

  return (
    <div>
      <h1>Account Lists</h1>
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
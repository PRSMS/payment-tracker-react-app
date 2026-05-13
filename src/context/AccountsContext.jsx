import React, { useContext, useState, useEffect } from 'react'
import { auth, database } from '../config/firebase'
import { ref, set, get, onValue } from 'firebase/database'

const AccountsContext = React.createContext();

export function useAccounts() {
    return useContext(AccountsContext);
}

export function AccountsProvider({ children }) {
    const [Accounts, setAccounts] = useState(null);
    const [loading, setLoading] = useState(true);

    //const accountsRef = ref(database, 'accounts/');
    useEffect(() => {
        const accountsRef = ref(database, 'accounts/');

        const unsubscribe = onValue(accountsRef, (snapshot) => {
            const data = snapshot.val();
            setAccounts(data);
            console.log('Accounts:', Accounts);
            setLoading(false);
        });

        /*
        if(!Accounts){
            get(accountsRef).then((snapshot) => {
                const data = snapshot.val();
                setAccounts(data);
                console.log('Accounts:', Accounts);
                setLoading(false);
            });
            
        }*/

        return unsubscribe;
    }, []);
    
    const value = {
        Accounts
    };

    return (
        <AccountsContext.Provider value={value}>
            {!loading && children}
            {/*{children}*/}
        </AccountsContext.Provider>
    );
}
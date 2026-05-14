import React, { useContext, useState, useEffect } from 'react'
import { auth, database } from '../config/firebase'
import { ref, set, get, push, remove, onValue } from 'firebase/database'

import { useAuth } from "./AuthContext";

const AccountsContext = React.createContext();

export function useAccounts() {
    return useContext(AccountsContext);
}

export function AccountsProvider({ children }) {
    const [Accounts, setAccounts] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const { currentUser, currentUserClaims } = useAuth();

    function addNewAccount(data){
        console.log("currentUser : ", currentUser)
        const listRef = ref(database, 'accounts');
        const newItemRef = push(listRef);

        return new Promise((resolve, reject) => {
            set(newItemRef, {
                name: data.name,
                created_by: currentUser.uid,
                amount: data.amount,
                account_status:1,
                remarks:'',
                start_date: Date.now()
            }).then(() => {
                console.log("Data saved successfully! ")
                resolve({ ok: true });
            }).catch((error) => {
                reject("Error:" + error);
                alert("error adding new account :" , error);
            });
        });
    }

    function deleteAccount(id){
        const removeItemRef = ref(database, 'accounts/' + id)
        return new Promise((resolve, reject) => {
            remove(removeItemRef).then(() => {
                resolve({ ok: true });
            }).catch((error) => {
                reject("Error:" + error);
            })
        });
    }


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
        Accounts,
        addNewAccount,
        deleteAccount
    };

    return (
        <AccountsContext.Provider value={value}>
            {!loading && children}
            {/*{children}*/}
        </AccountsContext.Provider>
    );
}
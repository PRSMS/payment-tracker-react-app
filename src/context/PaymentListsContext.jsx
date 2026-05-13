import React, { useContext, useState, useEffect } from 'react'
import { auth, database } from '../config/firebase'
import { ref, set, get, onValue } from 'firebase/database'

const PaymentListsContext = React.createContext();

export function useDatabase() {
    return useContext(PaymentListsContext);
}

export function PaymentListsProvider({ children }) {
    const [PaymentLists, setPaymentLists] = useState(null);
    const [loading, setLoading] = useState(true);

    //const accountsRef = ref(database, 'accounts/');
    useEffect(() => {
        const paymentListsRef = ref(database, 'payment_list/');

        const unsubscribe = onValue(paymentListsRef, (snapshot) => {
            const data = snapshot.val();
            setPaymentLists(data);
            console.log('PaymentLists:', PaymentLists);
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
        PaymentLists
    };

    return (
        <PaymentListsContext.Provider value={value}>
            {!loading && children}
            {/*{children}*/}
        </PaymentListsContext.Provider>
    );
}
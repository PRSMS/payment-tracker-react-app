import React, { useContext, useState, useEffect } from 'react'
import { auth, database } from '../config/firebase'
import { ref, set, get, onValue, query, orderByChild, equalTo } from 'firebase/database'

const TermListsContext = React.createContext();

export function useTermLists() {
    return useContext(TermListsContext);
}

export function TermListsProvider({ children }) {
    const [TermLists, setTermLists] = useState(null);
    const [loading, setLoading] = useState(true);

    function getTermListsById(accountId){
        setLoading(true);
        console.log("getTermListsById called with accountId:", accountId);
        const termListsRef = ref(database, `term_list/`);
        const nameQuery = query(termListsRef, orderByChild('account_id'), equalTo(accountId));
        get(nameQuery).then((snapshot) => {
            const data = snapshot.val();
            setTermLists(data);
            console.log('TermLists initialized for accountId:', accountId, 'Data:', data);
            setLoading(false);
        }).catch((error) => {
            console.error("Error initializing TermLists for accountId:", accountId, "Error:", error);
            setLoading(false);
        });
    }

    useEffect(() => {
        const termListsRef = ref(database, 'term_list/');

        const unsubscribe = onValue(termListsRef, (snapshot) => {
            const data = snapshot.val();
            setTermLists(data);
            console.log('TermLists:', TermLists);
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
        TermLists,
        getTermListsById
    };

    return (
        <TermListsContext.Provider value={value}>
            {!loading && children}
            {/*{children}*/}
        </TermListsContext.Provider>
    );
}
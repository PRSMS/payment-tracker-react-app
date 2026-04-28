import React, { useContext, useState, useEffect } from 'react'
import { auth, database } from '../config/firebase'
import { setPersistence, browserSessionPersistence,
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, onAuthStateChanged } from 'firebase/auth'
//import { ref, set } from 'firebase/database';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    //const [loading, setLoading] = useState(true);

    
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function loginWithPersistence(email, password) {
        return setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password);
            });
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            //setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout,
        loginWithPersistence
    };

    return (
        <AuthContext.Provider value={value}>
            {/*{!loading && children}*/}
            {children}
        </AuthContext.Provider>
    );
}
/*

        login: (email, password) => signInWithEmailAndPassword(auth, email, password),
        signUp: (email, password) => createUserWithEmailAndPassword(auth, email, password),
        logout: () => signOut(auth)*/
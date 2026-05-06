import React, { useContext, useState, useEffect } from 'react'
import { auth, database } from '../config/firebase'
import { setPersistence, browserSessionPersistence,
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, onAuthStateChanged, sendPasswordResetEmail, sendEmailVerification
 } from 'firebase/auth'
//import { ref, set } from 'firebase/database';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserTokenResult, setCurrentUserTokenResult] = useState(null);
    const [currentUserClaims, setCurrentUserClaims] = useState(null);
    const [loading, setLoading] = useState(true);

    
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function loginWithPersistence(email, password) {
        return setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password).then((UserCredential) => {
                    if(!UserCredential.user.emailVerified){
                        // 1. Notify the user they need to verify their email
                        alert("Please verify your email before logging in.");

                        // 3. Force sign out so they can't access protected routes
                        signOut(auth);

                    }
                });
            });
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email) {
        // Implement password reset functionality here
        return sendPasswordResetEmail(auth, email);
    }

    function emailAddressVerification() {
        // Implement email address verification functionality here
        return currentUser.sendEmailVerification();
        //return sendEmailVerification(currentUser);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (currentUser) {
            currentUser.getIdTokenResult(true) // Force refresh to get latest claims
                .then((idTokenResult) => {
                    setCurrentUserClaims(idTokenResult.claims);
                    setCurrentUserTokenResult(idTokenResult);
                    console.log('User claims updated:', idTokenResult.claims);
                    console.log('ID Token Result updated:', idTokenResult);
                })
                .catch((error) => {
                    console.error('Error fetching ID token result:', error);
                });
        } else {
            setCurrentUserClaims(null);
            setCurrentUserTokenResult(null);
        }
    }, [currentUser]);

    const value = {
        currentUser,
        currentUserTokenResult,
        currentUserClaims,
        login,
        signup,
        logout,
        loginWithPersistence,
        resetPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
            {/*{children}*/}
        </AuthContext.Provider>
    );
}
/*

        login: (email, password) => signInWithEmailAndPassword(auth, email, password),
        signUp: (email, password) => createUserWithEmailAndPassword(auth, email, password),
        logout: () => signOut(auth)*/
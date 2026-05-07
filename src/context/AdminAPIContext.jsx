import React, { useContext, useState, useEffect } from 'react'

const AdminAPIContext = React.createContext();

const apiAdminBaseURL = import.meta.env.VITE_API_BASE_URL;

export function useAdminAPI() {
    return useContext(AdminAPIContext);
}

export function AdminAPIProvider({ children }) {
    const [loading, setLoading] = useState(false);

    function createUser(data){
        return fetch(apiAdminBaseURL + '/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Critical for sending JSON
                },
                body: JSON.stringify(data), // Data must be stringified
            });
    }

    function getUsers(){
        return fetch(apiAdminBaseURL + '/api/users', {
                method: 'GET',
                headers: {
                    /*'authorization': `Bearer ${currentUserTokenResult.token}`,*/
                    'Content-Type': 'application/json'
                }
            });
    }

    function forgotPassword(data){
        
        return fetch(apiAdminBaseURL + '/api/users/email/password/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Critical for sending JSON
                },
                body: JSON.stringify(data), // Data must be stringified
            });
    }

    function sendEmailVerificationRequest(email){
        
        return fetch(apiAdminBaseURL + '/api/users/email/verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Critical for sending JSON
                },
                body: JSON.stringify(email), // Data must be stringified
            });
    }

    function setAdminRole(data){
        const id = data.id;
        const payload = {
                "admin": data.admin
                };

        return fetch(apiAdminBaseURL + '/api/users/admin/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Critical for sending JSON
                },
                body: JSON.stringify(payload), // Data must be stringifie
            });
    }

    const value = {
        createUser,
        getUsers,
        forgotPassword,
        sendEmailVerificationRequest,
        setAdminRole
    };

    return (
        <AdminAPIContext.Provider value={value}>
            {!loading && children}
            {/*{children}*/}
        </AdminAPIContext.Provider>
    );
}
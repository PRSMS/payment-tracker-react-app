import React, { useContext, useState, useEffect } from 'react'

const AdminAPIContext = React.createContext();

const apiAdminBaseURL = import.meta.env.VITE_API_BASE_URL;

export function useAdminAPI() {
    return useContext(AdminAPIContext);
}

export function AdminAPIProvider({ children }) {
    const [userLists, setuserLists] = useState(null);
    const [loading, setLoading] = useState(true);

    function createUser(data){
        return fetch(apiAdminBaseURL + '/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Critical for sending JSON
                },
                body: JSON.stringify(data), // Data must be stringified
            });
    }

    function deleteUser(id){
        return fetch(apiAdminBaseURL + '/api/users/' + id, {
                method: 'DELETE',
                headers: {
                    /*'authorization': `Bearer ${currentUserTokenResult.token}`,*/
                    'Content-Type': 'application/json'
                }
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

    function setUserDisabled(data){
        const id = data.id;
        const payload = {
                "disabled": data.disabled
            };

        return fetch(apiAdminBaseURL + '/api/users/disabled/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Critical for sending JSON
                },
                body: JSON.stringify(payload), // Data must be stringifie
            });
    }

    useEffect(() => {
        // 1. Create the AbortController
        const controller = new AbortController();
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                console.log('User fetching successfully:', data);
                setuserLists(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

        // 4. Cleanup: abort request if component unmounts
        return () => controller.abort();
    }, []);

    const value = {
        userLists,
        createUser,
        deleteUser,
        getUsers,
        forgotPassword,
        sendEmailVerificationRequest,
        setAdminRole,
        setUserDisabled
    };

    return (
        <AdminAPIContext.Provider value={value}>
            {!loading && children}
            {/*{children}*/}
        </AdminAPIContext.Provider>
    );
}
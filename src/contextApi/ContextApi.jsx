import { createContext, useContext, useState } from "react";

export const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
    
    // Retrieve token from localStorage
    const getToken = localStorage.getItem("JWT_TOKEN")
        ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
        : null;

    // Retrieve user details from localStorage (Assuming they are stored as JSON)
    const getStoredUser = localStorage.getItem("USER_DETAILS")
        ? JSON.parse(localStorage.getItem("USER_DETAILS"))
        : null;

    const [token, setToken] = useState(getToken);
    const [currentUser, setCurrentUser] = useState(getStoredUser); // New State for User Details

    // NOTE: Your login/registration flow MUST call setCurrentUser(userObject) 
    // and store it in localStorage when successful.

    const sendData = {
        token,
        setToken,
        currentUser, // Added to context
        setCurrentUser, // Added to context (useful for updating user details)
    };

    return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>
};


export const useStoreContext = () => {
    const context = useContext(ContextApi);
    return context;
}
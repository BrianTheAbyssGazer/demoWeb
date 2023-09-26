// src/AuthContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


// Define the user data type (customize as needed)
interface UserData {
    userName: string;
    email: string;
    loggedIn: boolean;
}

// Create a new context
interface AuthContextType {
    user: UserData;
    login: (userData: UserData) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: {
        userName: ' ',
        email: ' ',
        loggedIn: false,
    },
    login: () => { },
    logout: () => { }
});

// AuthProvider component to wrap your app with
interface AuthProviderProps {
    children: ReactNode;
}

const getInitialState = () => {
    const authInfo = localStorage.getItem("AuthInfo");
    return authInfo ===  null ? {
        userName: ' ',
        email: ' ',
        loggedIn: false,
    } : JSON.parse(authInfo);
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserData>(getInitialState());
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem("AuthInfo", JSON.stringify(user))
        if (user.loggedIn === true) navigate(-1);
    })

    // Function to set the authenticated user
    const login = (userData: UserData) => {
        setUser(userData);
    };

    // Function to clear the authenticated user (logout)
    const logout = () => {
        setUser({
            userName: ' ',
            email: ' ',
            loggedIn: false,
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};





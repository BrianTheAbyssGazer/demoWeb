// src/AuthContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';

// Define the user data type (customize as needed)
interface UserData {
    userName: string;
    email: string;
    loggedIn: boolean;
}

// Create a new context
interface AuthContextType {
    user: UserData | null;
    login: (userData: UserData) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => { },
    logout: () => { }
});

// AuthProvider component to wrap your app with
interface AuthProviderProps {
    children: ReactNode;
}

const getInitialState = () => {
    const authInfo = localStorage.getItem("AuthInfo")
    return authInfo ? JSON.parse(authInfo) : {
        userName: ' ',
        email: ' ',
        loggedIn: false,
    };
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(getInitialState());
    useEffect(() => {
        localStorage.setItem("AuthInfo", JSON.stringify(user))
    }, [user])

    // Function to set the authenticated user
    const login = (userData: UserData) => {
        setUser(userData);
    };

    // Function to clear the authenticated user (logout)
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};





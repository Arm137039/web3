import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (auth: boolean) => void;
}

// Interface pour les props du fournisseur d'authentification**
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
});

// Typage du composant avec les props**
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

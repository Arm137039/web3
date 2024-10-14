import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (auth: boolean) => void;
    user: any;
    loading: boolean;
}

// Interface pour les props du fournisseur d'authentification**
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    user: null,
    loading: true,
});

// Typage du composant avec les props**
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    // Token expiré
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                    setUser(null);
                } else {
                    // Token valide
                    setIsAuthenticated(true);
                    setUser(decoded);
                }
            } catch (error) {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
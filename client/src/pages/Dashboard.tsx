import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from "antd";

const Dashboard: React.FC = () => {
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <div>
            <h2>Bienvenue sur votre tableau de bord</h2>
            <Button onClick={handleLogout}>Se déconnecter</Button>
            {/* Contenu du tableau de bord */}
        </div>
    );
};

export default Dashboard;

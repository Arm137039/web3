import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <div>
            <h2>Bienvenue sur votre tableau de bord</h2>
            <button onClick={handleLogout}>Se déconnecter</button>
            {/* Contenu du tableau de bord */}
        </div>
    );
};

export default Dashboard;

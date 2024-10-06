import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Home: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    // Si l'utilisateur est authentifié, rediriger vers le tableau de bord
    if (isAuthenticated) {
        navigate('/dashboard');
        return null;
    }

    return (
        <div>
            <h1>Bienvenue sur notre application de choix de films</h1>
            <button>
                <Link to="/signup">Créer un compte</Link>
            </button>
            <button>
                <Link to="/signin">Se connecter</Link>
            </button>
        </div>
    );
};

export default Home;

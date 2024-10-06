import React, { useState, useContext } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Appel à l'API pour créer un compte
            const response = await api.post('/users/register', { email, password });
            // Stocker le token JWT dans le localStorage
            localStorage.setItem('token', response.data.token);
            // Mettre à jour l'état d'authentification
            setIsAuthenticated(true);
            // Rediriger vers le tableau de bord
            navigate('/dashboard');
        } catch (error) {
            console.error('Erreur lors de la création du compte :', error);
        }
    };

    return (
        <div>
            <h2>Créer un compte</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default SignUp;

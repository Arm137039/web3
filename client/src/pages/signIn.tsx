import React, { useState, useContext } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Row, Col, Typography, Button, Input } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons'; // Import des icônes
import styles from '../styles/SignIn.module.scss'; // Import du fichier CSS Module

const { Title } = Typography;

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false); // État pour le mode sombre

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Appel à l'API pour se connecter
            const response = await api.post('/users/login', { email, password });
            // Stocker le token JWT dans le localStorage
            localStorage.setItem('token', response.data.token);
            // Mettre à jour l'état d'authentification
            setIsAuthenticated(true);
            // Rediriger vers le tableau de bord
            navigate('/dashboard');
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <Row justify="center" align="middle" className={`${styles.signInContainer} ${isDarkMode ? styles.dark : styles.light}`} style={{ height: '100vh' }}>
            <Button
                onClick={toggleDarkMode}
                className={styles.themeToggleButton}
                type="text"
                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '24px', color: 'inherit' }}
            />
            <Col span={24} style={{ textAlign: 'center', marginBottom: '30px' }}>
                <Title level={1} className={styles.signInTitle} style={{color: 'inherit',fontSize: '6rem' }}>
                    Se connecter
                </Title>
            </Col>
            <Col span={24}>
                <form onSubmit={handleSubmit} className={styles.signInForm}>
                    <Input
                        type="email"
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.inputField}
                    />
                    <Input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.inputField}
                    />
                    <Button type="primary" htmlType="submit" className={styles.submitButton}>
                        Se connecter
                    </Button>
                </form>
            </Col>
        </Row>
    );
};

export default SignIn;

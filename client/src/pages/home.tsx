import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Button } from 'antd';
import { AuthContext } from '../contexts/AuthContext';
import { SunOutlined, MoonOutlined } from '@ant-design/icons'; // Import des icônes
import styles from '../styles/Home.module.scss'; // Import du fichier CSS Module

const { Title } = Typography;

const Home: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false); // État pour le mode sombre

    // Redirection si l'utilisateur est authentifié
    if (isAuthenticated) {
        navigate('/dashboard');
        return null;
    }

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <Row justify="center" align="middle" className={`${styles.homeContainer} ${isDarkMode ? styles.dark : styles.light}`} style={{ height: '100vh' }}>
            <Button
                onClick={toggleDarkMode}
                className={styles.themeToggleButton}
                type="text"
                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '24px', color: 'inherit' }}
            />
            <Col span={24} style={{ textAlign: 'center', marginBottom: '30px' }}>
                <Title level={1} className={styles.homeTitle} style={{ fontSize: '5rem', color: 'inherit' }}>
                    Bienvenue sur FilmHub
                </Title>
            </Col>
            <Col span={24} style={{ textAlign: 'center', marginTop: '-100px' }}>
                <Button type="primary" size="large" className={styles.customButton} style={{ fontSize: '2rem', padding: '30px 50px' }}>
                    <Link to="/signup" style={{ color: '#fff' }}>Créer un compte</Link>
                </Button>
                <Button type="default" size="large" className={styles.customButton} style={{ fontSize: '2rem', padding: '30px 50px', marginLeft: '10px' }}>
                    <Link to="/signin">Se connecter</Link>
                </Button>
            </Col>
        </Row>
    );
};

export default Home;
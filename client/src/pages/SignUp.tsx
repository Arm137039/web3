/*
import React, { useState, useContext } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Row, Col, Typography, Button, Input, Select, Form } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import styles from '../styles/SignUp.module.scss';

const { Title } = Typography;
//const { Option } = Select;

const SignUp: React.FC = () => {
    const [form] = Form.useForm();
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleSubmit = async (values: any) => {
        try {
            const response = await api.post('/users/register', values);
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            navigate('/dashboard');
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const streamingOptions = [
        { label: 'Netflix', value: 'Netflix' },
        { label: 'Amazon Prime Video', value: 'Amazon Prime Video' },
        { label: 'Disney+', value: 'Disney+' },
        { label: 'Hulu', value: 'Hulu' },
        { label: 'HBO Max', value: 'HBO Max' },
        // TODO: Ajoutez d'autres fournisseurs
    ];

    return (
        <Row justify="center" align="middle" className={`${styles.signUpContainer} ${isDarkMode ? styles.dark : styles.light}`} style={{ minHeight: '100vh' }}>
            <Button
                type="text"
                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                style={{ position: 'static', top: '20px', right: '20px', fontSize: '0px', color: 'inherit' }}
                onClick={toggleDarkMode}
                className={styles.themeToggleButton}
            />
            <Row justify="center" align="top" style={{ minHeight: '100vh', paddingTop: '50px' }}>
                <Col span={24} style={{ marginTop: '10px', textAlign: 'center', marginBottom: '10px' }}>
                    <Title level={1} className={styles.signUpTitle} style={{ color: 'inherit', fontSize: '5rem' }}>
                        Créer un compte
                    </Title>
                </Col>
                <Col span={24} style={{ position: 'static' }}>
                    <Form form={form} onFinish={handleSubmit} className={styles.signUpForm}>
                        <Form.Item name="firstName" rules={[{ required: true, message: 'Veuillez entrer votre prénom' }]}>
                            <Input placeholder="Prénom" className={styles.inputField} />
                        </Form.Item>
                        <Form.Item name="lastName" rules={[{ required: true, message: 'Veuillez entrer votre nom' }]}>
                            <Input placeholder="Nom" className={styles.inputField} />
                        </Form.Item>
                        <Form.Item name="email" rules={[{ required: true, message: 'Veuillez entrer votre email', type: 'email' }]}>
                            <Input placeholder="Adresse e-mail" className={styles.inputField} />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Veuillez entrer votre mot de passe' }]}>
                            <Input.Password placeholder="Mot de passe" className={styles.inputField} />
                        </Form.Item>
                        <Form.Item name="streamingProviders" rules={[{ required: true, message: 'Veuillez selectionner des platforms' }]}>
                            <Select
                                mode="multiple"
                                placeholder="Choisissez vos fournisseurs de streaming"
                                className={styles.selectField}
                                options={streamingOptions}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={styles.submitButton}>
                                S'inscrire
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Row>
    );
};

export default SignUp;*/
import React, { useState, useContext } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Row, Col, Typography, Button, message } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import styles from '../styles/SignUp.module.scss';
import SignUpForm from '../components/SignUpForm';
//import moment from 'moment';

const { Title } = Typography;

const SignUp: React.FC = () => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleSubmit = async (values: any) => {
        try {
            const formattedValues = {
                ...values,
                birthDate: values.birthDate.format('YYYY-MM-DD'), // Formater la date
            };
            // Appel à l'API pour s'inscrire
            const response = await api.post('/users/register', formattedValues);
            // Stocker le token JWT dans le localStorage
            localStorage.setItem('token', response.data.token);
            // Mettre à jour l'état d'authentification
            setIsAuthenticated(true);
            // Rediriger vers le tableau de bord
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Erreur lors de l\'inscription :', error);
            // Afficher le message d'erreur renvoyé par le backend
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message);
            } else {
                message.error('Erreur lors de l\'inscription');
            }
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div className={`${styles.signUpContainer} ${isDarkMode ? styles.dark : styles.light}`}>
            <Button
                onClick={toggleDarkMode}
                className={styles.themeToggleButton}
                type="text"
                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '24px', color: 'inherit' }}
            />
            <Row justify="center" align="top" style={{ minHeight: '100vh', paddingTop: '50px' }}>
                <Col span={24} style={{ textAlign: 'center', margin: '10px' }}>
                    <Title level={1} className={styles.signUpTitle} style={{ color: 'inherit', fontSize: '5rem' }}>
                        Créer un compte
                    </Title>
                </Col>
                <Col span={24}>
                    <SignUpForm onSubmit={handleSubmit} />
                </Col>
            </Row>
        </div>
    );
};

export default SignUp;

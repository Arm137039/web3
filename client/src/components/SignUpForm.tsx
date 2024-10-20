import React from 'react';
import { Form, Button, Select, DatePicker } from 'antd';
import CustomInput from './CustomInput';
import styles from '../styles/SignUp.module.scss';

interface SignUpFormProps {
    onSubmit: (values: any) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
    const [form] = Form.useForm();

    const streamingOptions = [
        { label: 'Netflix', value: 'Netflix' },
        { label: 'Amazon Prime Video', value: 'Amazon Prime Video' },
        { label: 'Disney+', value: 'Disney+' },
        { label: 'Hulu', value: 'Hulu' },
        { label: 'HBO Max', value: 'HBO Max' },
        // TODO: Ajoutez d'autres fournisseurs
    ];

    return (
        <Form
            form={form}
            onFinish={onSubmit}
            className={styles.signUpForm}
        >
            <CustomInput
                name="firstName"
                placeholder="Prénom"
                className={styles.inputField}
                rules={[
                    { required: true, message: 'Le prénom est requis' },
                    { min: 4, message: 'Le prénom doit contenir au moins 4 caractères' },
                ]}
            />
            <CustomInput
                name="lastName"
                placeholder="Nom"
                className={styles.inputField}
                rules={[
                    { required: true, message: 'Le nom est requis' },
                    { min: 4, message: 'Le nom doit contenir au moins 4 caractères' },
                ]}
            />
            <CustomInput
                name="nickname"
                placeholder="Surnom"
                className={styles.inputField}
                rules={[
                    { required: true, message: 'Le surnom est requis' },
                    { min: 4, message: 'Le surnom doit contenir au moins 4 caractères' },
                ]}
            />
            <Form.Item
                name="birthDate"
                rules={[{ required: true, message: 'La date de naissance est requise' }]}
            >
                <DatePicker
                    placeholder="Date de naissance"
                    className={styles.inputField}
                    format="DD/MM/YYYY"
                    style={{ width: '100%' }}
                />
            </Form.Item>
            <CustomInput
                name="email"
                placeholder="Adresse e-mail"
                className={styles.inputField}
                type="email"
                rules={[
                    { required: true, message: 'L\'email est requis' },
                    { type: 'email', message: 'Veuillez entrer un email valide' },
                ]}
            />
            <CustomInput
                name="password"
                placeholder="Mot de passe"
                className={styles.inputField}
                type="password"
                rules={[
                    { required: true, message: 'Le mot de passe est requis' },
                    { min: 6, message: 'Le mot de passe doit contenir au moins 6 caractères' },
                    {
                        pattern: /^(?=.*[0-9]).{6,}$/,
                        message: 'Le mot de passe doit contenir au moins un chiffre',
                    },
                ]}
            />
            <Form.Item name="streamingProviders">
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
    );
};

export default SignUpForm;
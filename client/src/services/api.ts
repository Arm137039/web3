import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

// Ajouter un intercepteur pour inclure le token JWT dans les en-têtes
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;

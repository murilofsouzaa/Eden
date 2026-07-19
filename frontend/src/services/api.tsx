import axios from 'axios';

const rawApiBaseURL = import.meta.env.VITE_API_URL?.trim();
const apiBaseURL = rawApiBaseURL
    ? rawApiBaseURL.endsWith('/api')
        ? rawApiBaseURL
        : `${rawApiBaseURL.replace(/\/$/, '')}/api`
    : '/api';

const api = axios.create({
    baseURL: apiBaseURL,
});

// Interceptor para injetar o token JWT automaticamente em rotas protegidas
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { api };
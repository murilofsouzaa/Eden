import axios from 'axios';

const apiBaseURL = (import.meta.env.VITE_API_URL ?? '/api').replace(/\/$/, '');

const api = axios.create({
    baseURL: apiBaseURL
})

//api.get não aceita somente "localhost:"

export {api} ;
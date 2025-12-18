import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'
import { BASE_URL } from '../utils/constant'

// Ensure every request hits the correct API and always sends cookies/JWT
axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true

// Attach Authorization header if a token is stored
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

createRoot(document.getElementById('root')).render(

    <App />
 
)

import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const axiosWithConfig = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosWithConfig.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosWithConfig;
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
    async config => {
        const token = cookies.get('access_token');

        return {
            ...config,
            headers: {
                ...config.headers,
                Authorization:
                    config?.headers?.Authorization ||
                    (token ? `Bearer ${token}` : null),
            },
        };
    },
    error => Promise.reject(error),
);

export default axiosInstance;

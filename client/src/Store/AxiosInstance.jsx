import axios from 'axios';

const apiBaseUrlFromEnv = (import.meta.env.VITE_API_URL || '').trim();
const fallbackApiBaseUrl = import.meta.env.MODE === 'development'
  ? 'http://localhost:3000/api'
  : '/api';

const axiosInstance = axios.create({
  baseURL: apiBaseUrlFromEnv || fallbackApiBaseUrl,
  withCredentials: true,
  timeout: 15000,
});

export default axiosInstance
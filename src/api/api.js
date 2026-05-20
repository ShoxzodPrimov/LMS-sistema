import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://najot-edu.softwareengineer.uz/api/v1',
  timeout: 10000, // increased timeout to 10s for better resilience under slow networks
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
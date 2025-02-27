import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept':'application/json'
  },
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {        
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;

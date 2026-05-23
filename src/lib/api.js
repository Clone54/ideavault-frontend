import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
  baseURL: import.meta.env.MODE === 'production' 
    ? 'https://ideavault-backend-1.onrender.com/api' 
    : 'http://localhost:3000/api',
});

api.interceptors.request.use(async (config) => {
  if (auth.currentUser) {
    try {
      const token = await auth.currentUser.getIdToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch(err) {
       console.error("Error getting id token", err);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

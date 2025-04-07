import axios from 'axios';

export const axiosAPI = axios.create({
    baseURL : `${import.meta.env.VITE_API_URL}`,
    headers : {
        'Content-Type' : 'application/json'
    }
})

// Attach token to every request dynamically
axiosAPI.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        delete config.headers['Authorization'];
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
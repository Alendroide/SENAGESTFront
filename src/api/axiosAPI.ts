import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const axiosAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Attach token to every request dynamically
axiosAPI.interceptors.request.use(
  (config) => {
    const token = cookies.get('token');
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

axiosAPI.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response && error.response.status === 401) {
      // In case we got a 401 Status, return to /login only if you aren't there already
      if (window.location.pathname !== '/login') {
        cookies.remove("token");
        alert("La sesión ha expirado, se redireccionará al login");
        window.location.href = '/login';
      }
    }
    if (error.response && error.response.status === 403) {
        alert("No tienes permiso para realizar esta acción! Reobteniendo permisos...");
        window.location.reload();
    }
    return Promise.reject(error);
  }
);
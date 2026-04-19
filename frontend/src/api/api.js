import axios from 'axios';

const api = axios.create({
  baseURL: '/', // Vite proxy will handle the backend URL
});

export default api; 
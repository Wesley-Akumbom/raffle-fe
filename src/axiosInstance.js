import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Base URL for your API
});

// Add a request interceptor to automatically attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Get the token from localStorage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Add token to headers
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

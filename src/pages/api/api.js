import axios from 'axios';
import store from '@redux/store';
import { jwtDecode } from 'jwt-decode';
import { logout } from '@redux/auth';

const baseUrl = "http://13.210.51.138:3000/api";

const api = axios.create({
  baseURL: baseUrl,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});


api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    
    const token = store.getState().auth.accessToken;
    
    if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            store.dispatch(logout());
            store.dispatch(push('/'));
            return Promise.reject('Token expired');
        }
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
)

export default api;
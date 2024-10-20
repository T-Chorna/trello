import axios from 'axios';
import { api } from '../common/constants';
import NProgress from 'nprogress';
import './nprogress.css'

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 123', // до цього ми ще повернемося якось потім
  },
});

instance.interceptors.request.use((config) => {
  NProgress.start(); 
  return config;
}, (error) => {
  NProgress.done();  
  return Promise.reject(error);
});

// Додаємо інтерсептор на відповідь
instance.interceptors.response.use((response) => {
  NProgress.done();  
  return response.data;
}, (error) => {
  NProgress.done();  
  return Promise.reject(error);
});

export default instance;
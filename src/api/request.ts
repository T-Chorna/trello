import axios from 'axios';
import { api } from '../common/constants';
import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';  // Підключаємо стилі для прогрес-бару
import './nprogress.css'

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 123', // до цього ми ще повернемося якось потім
  },
});

// instance.interceptors.response.use((res) => res.data);
// Додаємо інтерсептор на запит
instance.interceptors.request.use((config) => {
  NProgress.start();  // Запускаємо прогрес-бар при початку запиту
  return config;
}, (error) => {
  NProgress.done();  // Зупиняємо прогрес-бар при помилці
  return Promise.reject(error);
});

// Додаємо інтерсептор на відповідь
instance.interceptors.response.use((response) => {
  NProgress.done();  // Зупиняємо прогрес-бар при отриманні відповіді
  return response.data;
}, (error) => {
  NProgress.done();  // Зупиняємо прогрес-бар при помилці
  return Promise.reject(error);
});

export default instance;
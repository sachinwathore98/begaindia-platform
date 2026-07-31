// src/services/authService.js
import apiClient from './apiClient';

export const loginApi = async (credentials) => {
  return await apiClient.post('/auth/login', credentials);
};

export const registerApi = async (userData) => {
  return await apiClient.post('/auth/register', userData);
};
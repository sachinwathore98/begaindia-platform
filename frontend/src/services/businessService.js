import apiClient from './apiClient';

export const getMyProfile = async () => {
  return await apiClient.get('/business/me');
};

export const updateProfile = async (formData) => {
  return await apiClient.put('/business/update', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
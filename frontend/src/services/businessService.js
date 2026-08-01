import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

// Helper to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
};

// Fetch current user's business profile
export const getMyProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/business/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update profile with text and file attachments (Logo, Brochure, Gallery)
export const updateProfile = async (formData) => {
  const response = await axios.put(
    `${API_URL}/api/business/update`,
    formData,
    getAuthHeader()
  );
  return response.data;
};
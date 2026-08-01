import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAdminStats = async () => {
  const res = await axios.get(`${API_URL}/api/admin/stats`, getAuthHeader());
  return res.data;
};

export const getAllUsers = async (search = '', status = '') => {
  const res = await axios.get(
    `${API_URL}/api/admin/users?search=${search}&status=${status}`,
    getAuthHeader()
  );
  return res.data;
};

export const createAdminUser = async (userData) => {
  const res = await axios.post(`${API_URL}/api/admin/users`, userData, getAuthHeader());
  return res.data;
};

export const updateAdminUser = async (id, userData) => {
  const res = await axios.put(`${API_URL}/api/admin/users/${id}`, userData, getAuthHeader());
  return res.data;
};

export const toggleBlockUser = async (id) => {
  const res = await axios.put(`${API_URL}/api/admin/users/${id}/block`, {}, getAuthHeader());
  return res.data;
};

export const approveMembership = async (id, planName) => {
  const res = await axios.put(
    `${API_URL}/api/admin/users/${id}/approve-membership`,
    { planName },
    getAuthHeader()
  );
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API_URL}/api/admin/users/${id}`, getAuthHeader());
  return res.data;
};
// --- Business Directory Moderation ---
export const getAdminDirectory = async (search = '', status = '') => {
  const res = await axios.get(
    `${API_URL}/api/admin/directory?search=${search}&status=${status}`,
    getAuthHeader()
  );
  return res.data;
};

export const updateDirectoryStatus = async (id, status, rejectionReason = '') => {
  const res = await axios.put(
    `${API_URL}/api/admin/directory/${id}/status`,
    { status, rejectionReason },
    getAuthHeader()
  );
  return res.data;
};

export const toggleFeaturedCompany = async (id) => {
  const res = await axios.put(`${API_URL}/api/admin/directory/${id}/feature`, {}, getAuthHeader());
  return res.data;
};

// --- Event Management ---
export const getAdminEvents = async () => {
  const res = await axios.get(`${API_URL}/api/admin/events`, getAuthHeader());
  return res.data;
};

export const createAdminEvent = async (eventData) => {
  const res = await axios.post(`${API_URL}/api/admin/events`, eventData, getAuthHeader());
  return res.data;
};

export const updateAdminEvent = async (id, eventData) => {
  const res = await axios.put(`${API_URL}/api/admin/events/${id}`, eventData, getAuthHeader());
  return res.data;
};

export const deleteAdminEvent = async (id) => {
  const res = await axios.delete(`${API_URL}/api/admin/events/${id}`, getAuthHeader());
  return res.data;
};
// --- Revenue Management & Reports ---
export const getRevenueStats = async () => {
  const res = await axios.get(`${API_URL}/api/admin/revenue/stats`, getAuthHeader());
  return res.data;
};

export const getAdminTransactions = async (search = '', status = '', plan = '') => {
  const res = await axios.get(
    `${API_URL}/api/admin/revenue/transactions?search=${search}&status=${status}&plan=${plan}`,
    getAuthHeader()
  );
  return res.data;
};
// --- CMS Management ---
export const getCMSContent = async () => {
  const res = await axios.get(`${API_URL}/api/admin/cms`);
  return res.data;
};

export const updateCMSContent = async (cmsData) => {
  const res = await axios.put(`${API_URL}/api/admin/cms`, cmsData, getAuthHeader());
  return res.data;
};
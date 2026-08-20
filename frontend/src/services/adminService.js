import apiClient from './apiClient';

export const getAdminStats = async () => {
  return await apiClient.get('/admin/stats');
};

export const getAllUsers = async (search = '', status = '') => {
  return await apiClient.get(`/admin/users?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`);
};

export const createAdminUser = async (userData) => {
  return await apiClient.post('/admin/users', userData);
};

export const updateAdminUser = async (id, userData) => {
  return await apiClient.put(`/admin/users/${id}`, userData);
};

export const toggleBlockUser = async (id) => {
  return await apiClient.put(`/admin/users/${id}/block`, {});
};

export const approveMembership = async (id, planName) => {
  return await apiClient.put(`/admin/users/${id}/approve-membership`, { planName });
};

export const deleteUser = async (id) => {
  return await apiClient.delete(`/admin/users/${id}`);
};

export const getAdminDirectory = async (search = '', status = '') => {
  return await apiClient.get(`/admin/directory?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`);
};

export const updateDirectoryStatus = async (id, status, rejectionReason = '') => {
  return await apiClient.put(`/admin/directory/${id}/status`, { status, rejectionReason });
};

export const toggleFeaturedCompany = async (id) => {
  return await apiClient.put(`/admin/directory/${id}/feature`, {});
};

export const getAdminEvents = async () => {
  return await apiClient.get('/admin/events');
};

export const createAdminEvent = async (eventData) => {
  return await apiClient.post('/admin/events', eventData);
};

export const updateAdminEvent = async (id, eventData) => {
  return await apiClient.put(`/admin/events/${id}`, eventData);
};

export const deleteAdminEvent = async (id) => {
  return await apiClient.delete(`/admin/events/${id}`);
};

export const getRevenueStats = async () => {
  return await apiClient.get('/admin/revenue/stats');
};

export const getAdminTransactions = async (search = '', status = '', plan = '') => {
  return await apiClient.get(
    `/admin/revenue/transactions?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}&plan=${encodeURIComponent(plan)}`
  );
};
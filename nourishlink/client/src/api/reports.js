import api from './auth';

export const reportsAPI = {
  getSummary: (dateRange) => api.get('/api/reports/summary', { params: dateRange }),
  getInventory: (dateRange) => api.get('/api/reports/inventory', { params: dateRange }),
  getDonations: (dateRange) => api.get('/api/reports/donations', { params: dateRange }),
  getVolunteers: (dateRange) => api.get('/api/reports/volunteers', { params: dateRange }),
  getClients: (dateRange) => api.get('/api/reports/clients', { params: dateRange }),
};

import api from './auth';

export const donationsAPI = {
  // Donor profiles
  createDonor: (donorData) => api.post('/api/donors', donorData),
  getDonor: (id) => api.get(`/api/donors/${id}`),
  updateDonor: (id, donorData) => api.patch(`/api/donors/${id}`, donorData),
  
  // Donations
  createDonation: (donationData) => api.post('/api/donations', donationData),
  getMyDonations: () => api.get('/api/donations/my'),
  processDonation: (id) => api.patch(`/api/donations/${id}/process`),
  getReceipt: (id) => api.get(`/api/donations/${id}/receipt`),
};

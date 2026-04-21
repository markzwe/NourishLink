import api from './auth';

export const clientsAPI = {
  createClient: (clientData) => api.post('/api/clients', clientData),
  getClient: (id) => api.get(`/api/clients/${id}`),
  updateClient: (id, clientData) => api.patch(`/api/clients/${id}`, clientData),
  uploadDocument: (id, formData) => api.post(`/api/clients/${id}/documents`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  getPendingClients: () => api.get('/api/clients/pending'),
  updateEligibility: (id, status) => api.patch(`/api/clients/${id}/eligibility`, { eligibilityStatus: status }),
};

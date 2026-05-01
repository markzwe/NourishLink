import api from './auth';

export const clientsAPI = {
  createClient: (clientData) => api.post('/api/clients', clientData),
  getClient: (id) => api.get(`/api/clients/${id}`),
  getMyProfile: () => api.get('/api/clients/me'),
  updateClient: (id, clientData) => api.patch(`/api/clients/${id}`, clientData),
  updateMyProfile: (clientData) => api.patch('/api/clients/me', clientData),
  uploadDocument: (id, formData, onUploadProgress) => api.post(`/api/clients/${id}/documents`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  }),
  getMyDocuments: () => api.get('/api/clients/me/documents'),
  deleteDocument: (documentId) => api.delete(`/api/clients/me/documents/${documentId}`),
  getPendingClients: () => api.get('/api/clients/pending'),
  updateEligibility: (id, status) => api.patch(`/api/clients/${id}/eligibility`, { eligibilityStatus: status }),
};

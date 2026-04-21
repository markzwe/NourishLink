import api from './auth';

export const volunteersAPI = {
  // Volunteer profiles
  createVolunteer: (volunteerData) => api.post('/api/volunteers', volunteerData),
  getVolunteer: (id) => api.get(`/api/volunteers/${id}`),
  updateVolunteer: (id, volunteerData) => api.patch(`/api/volunteers/${id}`, volunteerData),
  
  // Shifts
  getShifts: () => api.get('/api/shifts'),
  signupForShift: (id) => api.post(`/api/shifts/${id}/signup`),
  cancelShift: (id) => api.patch(`/api/shifts/${id}/cancel`),
  checkIn: (id) => api.patch(`/api/shifts/${id}/checkin`),
  checkOut: (id) => api.patch(`/api/shifts/${id}/checkout`),
  
  // History
  getMyHistory: () => api.get('/api/volunteers/history/me'),
};

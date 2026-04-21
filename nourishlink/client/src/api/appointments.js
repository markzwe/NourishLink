import api from './auth';

export const appointmentsAPI = {
  createAppointment: (appointmentData) => api.post('/api/appointments', appointmentData),
  getMyAppointments: () => api.get('/api/appointments/my'),
  cancelAppointment: (id) => api.patch(`/api/appointments/${id}/cancel`),
  updateCapacity: (date, capacity) => api.patch(`/api/appointments/capacity/${date}`, { capacity }),
};

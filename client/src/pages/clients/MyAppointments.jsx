import React, { useEffect, useState } from 'react';
import { appointmentsAPI } from '../../api/appointments';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState('');

  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    slot: '',
    dietaryNotes: '',
  });

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await appointmentsAPI.getMyAppointments();
        const normalized = (response.data?.data || []).map((appointment) => ({
          id: appointment._id,
          date: appointment.appointmentDate,
          timeSlot: appointment.timeSlot,
          status: appointment.status,
          dietaryNotes: appointment.dietaryNotes,
        }));
        setAppointments(normalized);
      } catch (error) {
        setPageError(error.response?.data?.message || 'Unable to load appointments.');
      } finally {
        setIsLoading(false);
      }
    };
    loadAppointments();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'checked_in': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentsAPI.cancelAppointment(appointmentId);
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === appointmentId
              ? { ...appointment, status: 'cancelled' }
              : appointment
          )
        );
      } catch (error) {
        setPageError(error.response?.data?.message || 'Unable to cancel appointment.');
      }
    }
  };

  const slotMap = {
    morning: { start: '9:00 AM', end: '12:00 PM' },
    afternoon: { start: '1:00 PM', end: '4:00 PM' },
    evening: { start: '5:00 PM', end: '7:00 PM' },
  };

  const getSlotKey = (timeSlot) => {
    const match = Object.entries(slotMap).find(
      ([, slot]) => slot.start === timeSlot.start && slot.end === timeSlot.end
    );
    return match ? match[0] : '';
  };

  const resetAppointmentForm = () => {
    setEditingAppointment(null);
    setNewAppointment({ date: '', slot: '', dietaryNotes: '' });
    setShowScheduleForm(false);
    setPageError('');
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setShowScheduleForm(true);
    setPageError('');
    setNewAppointment({
      date: appointment.date?.substring(0, 10) || '',
      slot: getSlotKey(appointment.timeSlot),
      dietaryNotes: appointment.dietaryNotes || '',
    });
  };

  const handleScheduleAgain = (appointment) => {
    setEditingAppointment(null);
    setShowScheduleForm(true);
    setPageError('');
    setNewAppointment({
      date: '',
      slot: getSlotKey(appointment.timeSlot),
      dietaryNotes: appointment.dietaryNotes || '',
    });
  };

  const handleScheduleAppointment = async () => {
    if (!newAppointment.date || !newAppointment.slot) {
      setPageError('Please select a date and time slot.');
      return;
    }

    try {
      setPageError('');
      const timeSlot = slotMap[newAppointment.slot];

      if (editingAppointment) {
        const response = await appointmentsAPI.updateAppointment(editingAppointment.id, {
          appointmentDate: newAppointment.date,
          timeSlot,
          dietaryNotes: newAppointment.dietaryNotes,
        });

        const updated = response.data?.data;
        if (updated) {
          setAppointments((prev) => prev.map((appointment) =>
            appointment.id === editingAppointment.id
              ? {
                ...appointment,
                date: updated.appointmentDate,
                timeSlot: updated.timeSlot,
                dietaryNotes: updated.dietaryNotes,
              }
              : appointment
          ));
        }
      } else {
        const response = await appointmentsAPI.createAppointment({
          appointmentDate: newAppointment.date,
          timeSlot,
          dietaryNotes: newAppointment.dietaryNotes,
        });

        const created = response.data?.data;
        if (created) {
          setAppointments((prev) => ([
            ...prev,
            {
              id: created._id,
              date: created.appointmentDate,
              timeSlot: created.timeSlot,
              status: created.status,
              dietaryNotes: created.dietaryNotes,
            },
          ]));
        }
      }

      resetAppointmentForm();
    } catch (error) {
      setPageError(error.response?.data?.message || 'Unable to save appointment.');
    }
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === 'scheduled');
  const pastAppointments = appointments.filter(apt => apt.status !== 'scheduled');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 mt-2">Manage your food pickup appointments.</p>
          {pageError && (
            <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-700">
              {pageError}
            </div>
          )}
        </div>
        <button
          onClick={() => setShowScheduleForm(!showScheduleForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Schedule New Appointment
        </button>
      </div>

      {/* Schedule Appointment Form */}
      {showScheduleForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment((prev) => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Time Slot
              </label>
              <select
                value={newAppointment.slot}
                onChange={(e) => setNewAppointment((prev) => ({ ...prev, slot: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select time slot</option>
                <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                <option value="afternoon">Afternoon (1:00 PM - 4:00 PM)</option>
                <option value="evening">Evening (5:00 PM - 7:00 PM)</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dietary Notes (Optional)
            </label>
            <textarea
              rows="3"
              value={newAppointment.dietaryNotes}
              onChange={(e) => setNewAppointment((prev) => ({ ...prev, dietaryNotes: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any dietary restrictions or preferences..."
            />
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={resetAppointmentForm}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleScheduleAppointment}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              {editingAppointment ? 'Save Changes' : 'Schedule Appointment'}
            </button>
          </div>
        </div>
      )}

      {/* Upcoming Appointments */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">Loading appointments...</p>
          </div>
        ) : upcomingAppointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No upcoming appointments scheduled.</p>
            <button
              onClick={() => setShowScheduleForm(true)}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Schedule your first appointment
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map(appointment => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-2">
                      Time: {appointment.timeSlot.start} - {appointment.timeSlot.end}
                    </p>

                    {appointment.dietaryNotes && (
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm font-medium text-gray-700 mb-1">Dietary Notes:</p>
                        <p className="text-sm text-gray-600">{appointment.dietaryNotes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditAppointment(appointment)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Appointments */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Appointments</h2>

        {pastAppointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No past appointments.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pastAppointments.map(appointment => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-md p-6 opacity-75">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-2">
                      Time: {appointment.timeSlot.start} - {appointment.timeSlot.end}
                    </p>

                    {appointment.dietaryNotes && (
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm font-medium text-gray-700 mb-1">Dietary Notes:</p>
                        <p className="text-sm text-gray-600">{appointment.dietaryNotes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(appointment)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleScheduleAgain(appointment)}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Schedule Again
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedAppointment && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Appointment Details</h2>
                <p className="text-sm text-gray-500">Review your past appointment information.</p>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="rounded-full bg-gray-100 px-3 py-1 text-gray-600 hover:bg-gray-200"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-lg font-medium text-gray-900">
                  {new Date(selectedAppointment.date).toLocaleDateString('en-US', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="text-lg font-medium text-gray-900">
                  {selectedAppointment.timeSlot.start} - {selectedAppointment.timeSlot.end}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-lg font-medium text-gray-900">{selectedAppointment.status}</p>
              </div>

              {selectedAppointment.dietaryNotes && (
                <div>
                  <p className="text-sm text-gray-500">Dietary Notes</p>
                  <p className="text-lg font-medium text-gray-900">{selectedAppointment.dietaryNotes}</p>
                </div>
              )}

              {selectedAppointment.cancellationReason && (
                <div>
                  <p className="text-sm text-gray-500">Cancellation Reason</p>
                  <p className="text-lg font-medium text-gray-900">{selectedAppointment.cancellationReason}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;

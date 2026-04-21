import React, { useState } from 'react';

const MyAppointments = () => {
  const [appointments] = useState([
    {
      id: 1,
      date: '2023-12-15',
      timeSlot: { start: '2:00 PM', end: '4:00 PM' },
      status: 'scheduled',
      dietaryNotes: 'No nuts, gluten-free items preferred',
    },
    {
      id: 2,
      date: '2023-12-01',
      timeSlot: { start: '10:00 AM', end: '12:00 PM' },
      status: 'completed',
      dietaryNotes: 'Vegetarian options only',
    },
    {
      id: 3,
      date: '2023-11-15',
      timeSlot: { start: '3:00 PM', end: '5:00 PM' },
      status: 'completed',
      dietaryNotes: 'Dairy-free alternatives needed',
    },
  ]);

  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'checked_in': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      // This would make an API call to cancel the appointment
      console.log('Cancelling appointment:', appointmentId);
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Schedule New Appointment</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Time Slot
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any dietary restrictions or preferences..."
            />
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => setShowScheduleForm(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Schedule Appointment
            </button>
          </div>
        </div>
      )}

      {/* Upcoming Appointments */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
        
        {upcomingAppointments.length === 0 ? (
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
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
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
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      View Details
                    </button>
                    <button className="text-green-600 hover:text-green-800 text-sm">
                      Schedule Again
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;

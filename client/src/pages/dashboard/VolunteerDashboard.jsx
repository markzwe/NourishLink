import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { volunteersAPI } from '../../api/volunteers';

const VolunteerDashboard = () => {
  const { user } = useAuth();

  const { data: shiftsData, isLoading: shiftsLoading, isError: shiftsError } = useQuery({
    queryKey: ['availableShifts'],

    queryFn: async () => {
      const response = await volunteersAPI.getShifts();
      return response.data.data || [];
    }
  });

  const { data: historyData, isLoading: historyLoading, isError: historyError } = useQuery({
    queryKey: ['volunteerHistory'],

    queryFn: async () => {
      const response = await volunteersAPI.getMyHistory();
      return response.data.data || [];
    }
  });

  const isLoading = shiftsLoading || historyLoading;
  const isError = shiftsError || historyError;

  const shifts = shiftsData || [];
  const history = historyData || [];

  const upcomingShift = shifts
    .filter((shift) => shift.shiftDate)
    .map((shift) => ({ ...shift, startDate: new Date(shift.shiftDate) }))
    .sort((a, b) => a.startDate - b.startDate)[0];

  const nextShiftLabel = upcomingShift
    ? `${upcomingShift.shiftDate} • ${upcomingShift.startTime || ''} - ${upcomingShift.endTime || ''}`
    : 'No upcoming shifts';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Unable to load volunteer dashboard data. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Volunteer Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.firstName || 'Volunteer'}!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Available Shifts</h3>
          <div className="text-3xl font-bold text-green-600">{shifts.length}</div>
          <p className="text-sm text-gray-600 mt-2">Open opportunities</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Shift</h3>
          <div className="text-3xl font-bold text-blue-600">{nextShiftLabel}</div>
          <p className="text-sm text-gray-600 mt-2">Upcoming assignment</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Volunteer History</h3>
          <div className="text-3xl font-bold text-purple-600">{history.length}</div>
          <p className="text-sm text-gray-600 mt-2">Past shifts</p>
        </div>
      </div>

      {/* Upcoming Shifts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Shifts</h2>
        {shifts.length === 0 ? (
          <p className="text-gray-500">No available shifts are currently scheduled.</p>
        ) : (
          <div className="space-y-4">
            {shifts.slice(0, 3).map((shift) => (
              <div key={shift.id || shift._id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{shift.taskRole || 'Volunteer Shift'}</p>
                  <p className="text-sm text-gray-600">{shift.shiftDate || ''} • {shift.startTime || ''} - {shift.endTime || ''}</p>
                </div>
                <span className="text-sm text-blue-600">{shift.location || 'Location TBD'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;

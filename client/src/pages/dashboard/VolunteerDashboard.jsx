import React from 'react';
import { useAuth } from '../../context/AuthContext';

const VolunteerDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Volunteer Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.firstName}!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Hours</h3>
          <div className="text-3xl font-bold text-green-600">156</div>
          <p className="text-sm text-gray-600 mt-2">This year</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Shift</h3>
          <div className="text-3xl font-bold text-blue-600">Today</div>
          <p className="text-sm text-gray-600 mt-2">2:00 PM - 6:00 PM</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Shifts This Month</h3>
          <div className="text-3xl font-bold text-purple-600">8</div>
          <p className="text-sm text-gray-600 mt-2">32 hours scheduled</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700">
            View Available Shifts
          </button>
          <button className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700">
            Check In
          </button>
          <button className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700">
            My Schedule
          </button>
          <button className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700">
            View History
          </button>
        </div>
      </div>

      {/* Upcoming Shifts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Shifts</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-gray-900">Food Distribution</p>
              <p className="text-sm text-gray-600">Today, 2:00 PM - 6:00 PM</p>
            </div>
            <span className="text-sm text-blue-600">Check in at 1:45 PM</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-gray-900">Inventory Organization</p>
              <p className="text-sm text-gray-600">Dec 16, 10:00 AM - 2:00 PM</p>
            </div>
            <span className="text-sm text-gray-600">Scheduled</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Donation Processing</p>
              <p className="text-sm text-gray-600">Dec 18, 1:00 PM - 5:00 PM</p>
            </div>
            <span className="text-sm text-gray-600">Scheduled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;

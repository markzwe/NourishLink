import React from 'react';
import { useAuth } from '../../context/AuthContext';

const StaffDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.firstName}!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Applications</h3>
          <div className="text-3xl font-bold text-orange-600">12</div>
          <p className="text-sm text-gray-600 mt-2">Awaiting review</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Appointments</h3>
          <div className="text-3xl font-bold text-blue-600">24</div>
          <p className="text-sm text-gray-600 mt-2">Scheduled pickups</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Low Stock Items</h3>
          <div className="text-3xl font-bold text-red-600">8</div>
          <p className="text-sm text-gray-600 mt-2">Need restocking</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Volunteers</h3>
          <div className="text-3xl font-bold text-green-600">15</div>
          <p className="text-sm text-gray-600 mt-2">On shift today</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700">
            Review Applications
          </button>
          <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700">
            Manage Inventory
          </button>
          <button className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700">
            Process Donations
          </button>
          <button className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700">
            Generate Reports
          </button>
        </div>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Alerts</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded">
              <span className="text-red-600">critical</span>
              <div>
                <p className="font-medium text-gray-900">Critical: Milk inventory below minimum</p>
                <p className="text-sm text-gray-600">Only 2 gallons remaining</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded">
              <span className="text-orange-600">warning</span>
              <div>
                <p className="font-medium text-gray-900">5 client applications pending review</p>
                <p className="text-sm text-gray-600">Submitted in last 48 hours</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded">
              <span className="text-blue-600">info</span>
              <div>
                <p className="font-medium text-gray-900">Large donation scheduled for tomorrow</p>
                <p className="text-sm text-gray-600">Food Bank - 500 lbs expected</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-gray-900">9:00 AM - Staff Meeting</p>
                <p className="text-sm text-gray-600">Weekly planning session</p>
              </div>
              <span className="text-sm text-gray-500">In 1 hour</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-gray-900">10:00 AM - Volunteer Training</p>
                <p className="text-sm text-gray-600">New volunteer orientation</p>
              </div>
              <span className="text-sm text-gray-500">In 2 hours</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900">2:00 PM - Food Distribution</p>
                <p className="text-sm text-gray-600">Client pickup appointments</p>
              </div>
              <span className="text-sm text-gray-500">In 6 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;

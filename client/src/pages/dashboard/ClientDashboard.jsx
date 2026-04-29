import React from 'react';
// import { useAuth } from '../../context/AuthContext';

const ClientDashboard = () => {
  // const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.firstName}!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Eligibility Status</h3>
          <div className="text-3xl font-bold text-green-600">Approved</div>
          <p className="text-sm text-gray-600 mt-2">Next renewal: 2024-12-31</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Appointment</h3>
          <div className="text-3xl font-bold text-blue-600">Dec 15</div>
          <p className="text-sm text-gray-600 mt-2">2:00 PM - 4:00 PM</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Household Size</h3>
          <div className="text-3xl font-bold text-purple-600">4</div>
          <p className="text-sm text-gray-600 mt-2">Members registered</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700">
            Schedule Appointment
          </button>
          <button className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700">
            Upload Documents
          </button>
          <button className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700">
            Update Profile
          </button>
          <button className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700">
            View History
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-gray-900">Appointment Scheduled</p>
              <p className="text-sm text-gray-600">December 15, 2023 - 2:00 PM</p>
            </div>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-gray-900">Document Uploaded</p>
              <p className="text-sm text-gray-600">Proof of Income - Approved</p>
            </div>
            <span className="text-sm text-gray-500">1 week ago</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Profile Updated</p>
              <p className="text-sm text-gray-600">Address and phone number changed</p>
            </div>
            <span className="text-sm text-gray-500">2 weeks ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;

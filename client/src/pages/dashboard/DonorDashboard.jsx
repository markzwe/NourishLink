import React from 'react';
import { useAuth } from '../../context/AuthContext';

const DonorDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.firstName || 'Donor'}!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Donations</h3>
          <div className="text-3xl font-bold text-green-600">24</div>
          <p className="text-sm text-gray-600 mt-2">This year</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Weight</h3>
          <div className="text-3xl font-bold text-blue-600">450 lbs</div>
          <p className="text-sm text-gray-600 mt-2">YTD contribution</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Drop-off</h3>
          <div className="text-3xl font-bold text-purple-600">Dec 20</div>
          <p className="text-sm text-gray-600 mt-2">10:00 AM - 12:00 PM</p>
        </div>
      </div>

      {/* Recent Donations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Donations</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-gray-900">Canned Goods</p>
              <p className="text-sm text-gray-600">25 lbs - Dec 10, 2023</p>
            </div>
            <span className="text-sm text-green-600">Completed</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-gray-900">Fresh Produce</p>
              <p className="text-sm text-gray-600">50 lbs - Dec 5, 2023</p>
            </div>
            <span className="text-sm text-green-600">Completed</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Dry Goods</p>
              <p className="text-sm text-gray-600">30 lbs - Nov 28, 2023</p>
            </div>
            <span className="text-sm text-green-600">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;

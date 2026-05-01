import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { clientsAPI } from '../../api/clients';
import { donationsAPI } from '../../api/donations';

const StaffDashboard = () => {
  const { user } = useAuth();

  const { data: pendingData, isLoading: pendingLoading, isError: pendingError } = useQuery({
    queryKey: ['pendingClients'],

    queryFn: async () => {
      const response = await clientsAPI.getPendingClients();
      return response.data.data || [];
    }
  });

  const { data: donationsData, isLoading: donationsLoading, isError: donationsError } = useQuery({
    queryKey: ['incomingDonations'],

    queryFn: async () => {
      const response = await donationsAPI.getIncomingDonations();
      return response.data.data || [];
    }
  });

  const isLoading = pendingLoading || donationsLoading;
  const isError = pendingError || donationsError;

  const pendingCount = pendingData?.length || 0;
  const donations = donationsData || [];
  const today = new Date().toISOString().split('T')[0];
  const todayDonations = donations.filter((donation) => donation.dropoffDate === today);
  const processingCount = donations.filter((donation) => donation.status === 'processing').length;
  const completedToday = donations.filter(
    (donation) => donation.status === 'completed' && donation.dropoffDate === today
  ).length;

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
        <p className="text-red-600">Unable to load staff dashboard data. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.firstName || 'Staff'}!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Applications</h3>
          <div className="text-3xl font-bold text-orange-600">{pendingCount}</div>
          <p className="text-sm text-gray-600 mt-2">Awaiting review</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Donations</h3>
          <div className="text-3xl font-bold text-blue-600">{todayDonations.length}</div>
          <p className="text-sm text-gray-600 mt-2">Scheduled pickups</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing</h3>
          <div className="text-3xl font-bold text-red-600">{processingCount}</div>
          <p className="text-sm text-gray-600 mt-2">Donations in progress</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed Today</h3>
          <div className="text-3xl font-bold text-green-600">{completedToday}</div>
          <p className="text-sm text-gray-600 mt-2">Processed donations</p>
        </div>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Operational Insights</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded">
              <span className="text-yellow-600">warning</span>
              <div>
                <p className="font-medium text-gray-900">{pendingCount} pending applications need review.</p>
                <p className="text-sm text-gray-600">Keep approval times low by processing applications daily.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded">
              <span className="text-blue-600">info</span>
              <div>
                <p className="font-medium text-gray-900">{todayDonations.length} donations scheduled for today.</p>
                <p className="text-sm text-gray-600">Monitor arrivals and move items into inventory quickly.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded">
              <span className="text-green-600">success</span>
              <div>
                <p className="font-medium text-gray-900">{completedToday} donations completed today.</p>
                <p className="text-sm text-gray-600">Great work keeping donation flow moving.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-gray-900">Pending review</p>
                <p className="text-sm text-gray-600">{pendingCount} applications need a response.</p>
              </div>
              <span className="text-sm text-gray-500">Ongoing</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-gray-900">Donation processing</p>
                <p className="text-sm text-gray-600">{processingCount} donations currently in process.</p>
              </div>
              <span className="text-sm text-gray-500">Active</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900">Completed today</p>
                <p className="text-sm text-gray-600">{completedToday} completed donation deliveries.</p>
              </div>
              <span className="text-sm text-gray-500">Finished</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;

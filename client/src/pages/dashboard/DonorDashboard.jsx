import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { donationsAPI } from '../../api/donations';

const DonorDashboard = () => {
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['myDonations'],

    queryFn: async () => {
      const response = await donationsAPI.getMyDonations();
      return response.data.data || [];
    }
  });

  const donations = data || [];
  const totalWeight = donations.reduce((sum, donation) => sum + (donation.totalWeight || 0), 0);

  const upcomingDropoff = donations
    .filter((donation) => donation.dropoffDate && donation.status !== 'completed')
    .map((donation) => ({
      ...donation,
      dropoffDateObj: new Date(donation.dropoffDate),
    }))
    .filter((donation) => donation.dropoffDateObj >= new Date())
    .sort((a, b) => a.dropoffDateObj - b.dropoffDateObj)[0];

  const nextDropoffLabel = upcomingDropoff
    ? `${upcomingDropoff.dropoffDateObj.toLocaleDateString()} • ${upcomingDropoff.dropoffTime || ''}`.trim()
    : 'None scheduled';

  const recentDonations = [...donations]
    .sort((a, b) => new Date(b.dropoffDate) - new Date(a.dropoffDate))
    .slice(0, 3);

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
        <p className="text-red-600">Unable to load donation data. Please try again.</p>
      </div>
    );
  }

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
          <div className="text-3xl font-bold text-green-600">{donations.length}</div>
          <p className="text-sm text-gray-600 mt-2">Logged donations</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Weight</h3>
          <div className="text-3xl font-bold text-blue-600">{totalWeight} lbs</div>
          <p className="text-sm text-gray-600 mt-2">Total weight donated</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Drop-off</h3>
          <div className="text-3xl font-bold text-purple-600">{nextDropoffLabel}</div>
          <p className="text-sm text-gray-600 mt-2">Upcoming scheduled donation</p>
        </div>
      </div>

      {/* Recent Donations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Donations</h2>
        <div className="space-y-4">
          {recentDonations.length === 0 ? (
            <div className="text-gray-500">You have no donation records yet.</div>
          ) : (
            recentDonations.map((donation) => (
              <div key={donation.id || donation._id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{donation.items?.length ? `${donation.items.length} item(s)` : 'Donation'}</p>
                  <p className="text-sm text-gray-600">{donation.dropoffDate ? new Date(donation.dropoffDate).toLocaleDateString() : 'No date'} • {donation.dropoffTime || 'No time'}</p>
                </div>
                <span className="text-sm text-green-600">{donation.status || 'scheduled'}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;

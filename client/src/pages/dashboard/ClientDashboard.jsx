import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { appointmentsAPI } from '../../api/appointments';
import { clientsAPI } from '../../api/clients';

const ClientDashboard = () => {
  const { user } = useAuth();

  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useQuery({
    queryKey: ['myProfile'],

    queryFn: async () => {
      const response = await clientsAPI.getMyProfile();
      return response.data.data;
    }
  });

  const {
    data: appointmentData,
    isLoading: appointmentsLoading,
    isError: appointmentsError,
  } = useQuery({
    queryKey: ['myAppointments'],

    queryFn: async () => {
      const response = await appointmentsAPI.getMyAppointments();
      return (response.data?.data || []).map((appointment) => ({
        id: appointment._id,
        date: appointment.appointmentDate,
        timeSlot: appointment.timeSlot,
        status: appointment.status,
        dietaryNotes: appointment.dietaryNotes,
      }));
    }
  });

  const isLoading = profileLoading || appointmentsLoading;
  const isError = profileError || appointmentsError;
  const profile = profileData?.clientProfile;
  const appointments = appointmentData || [];

  const upcomingAppointments = appointments
    .filter((appointment) => appointment.status === 'scheduled')
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const nextAppointment = upcomingAppointments[0];
  const nextAppointmentLabel = nextAppointment
    ? `${new Date(nextAppointment.date).toLocaleDateString()} • ${nextAppointment.timeSlot?.start || ''} - ${nextAppointment.timeSlot?.end || ''}`
    : 'No appointment scheduled';

  const eligibilityStatus = profile?.eligibilityStatus || 'Pending';
  const householdSize = profile?.householdSize ?? 'N/A';
  const nextRenewal = profile?.lastRenewalDate
    ? new Date(profile.lastRenewalDate).toLocaleDateString()
    : 'TBD';

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
        <p className="text-red-600">Unable to load dashboard data. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {profileData?.user?.firstName || user?.firstName || 'Client'}!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Eligibility Status</h3>
          <div className="text-3xl font-bold text-green-600">{eligibilityStatus}</div>
          <p className="text-sm text-gray-600 mt-2">Next renewal: {nextRenewal}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Appointment</h3>
          <div className="text-3xl font-bold text-blue-600">{nextAppointmentLabel}</div>
          <p className="text-sm text-gray-600 mt-2">Upcoming scheduled appointment</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Household Size</h3>
          <div className="text-3xl font-bold text-purple-600">{householdSize}</div>
          <p className="text-sm text-gray-600 mt-2">Members registered</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-gray-900">Profile Loaded</p>
              <p className="text-sm text-gray-600">Your latest profile information is being displayed.</p>
            </div>
            <span className="text-sm text-gray-500">Updated now</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-gray-900">Eligibility Status</p>
              <p className="text-sm text-gray-600">{eligibilityStatus}</p>
            </div>
            <span className="text-sm text-gray-500">Current</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Next Appointment</p>
              <p className="text-sm text-gray-600">{nextAppointmentLabel}</p>
            </div>
            <span className="text-sm text-gray-500">Scheduled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;

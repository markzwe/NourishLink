import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './layouts/Layout'

import { useAuth } from './context/AuthContext';

// Dashboard redirect component
const DashboardRedirect = () => {
  const { user } = useAuth();
  const role = user?.role;

  switch (role) {
    case 'staff': return <Navigate to="/staff/dashboard" replace />
    case 'client': return <Navigate to="/client/dashboard" replace />
    case 'donor': return <Navigate to="/donor/dashboard" replace />
    case 'volunteer': return <Navigate to="/volunteer/dashboard" replace />
    default: return <Navigate to="/login" replace />
  }
}

// Import pages
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Client pages
import ClientDashboard from './pages/dashboard/ClientDashboard'
import ClientRegistration from './pages/clients/ClientRegistration'
import UploadDocuments from './pages/clients/UploadDocuments'
import MyAppointments from './pages/clients/MyAppointments'
import UpdateProfile from './pages/clients/UpdateProfile'

// Donor pages
import DonorDashboard from './pages/dashboard/DonorDashboard'
import LogDonation from './pages/donors/LogDonation'
import DonationHistory from './pages/donors/DonationHistory'
import ScheduleDropoff from './pages/donors/ScheduleDropoff'
import Receipts from './pages/donors/Receipts'
import ContactStaff from './pages/donors/ContactStaff'

// Volunteer pages
import VolunteerDashboard from './pages/dashboard/VolunteerDashboard'
import AvailableShifts from './pages/volunteers/AvailableShifts'
import MyShifts from './pages/volunteers/MyShifts'
import Tasks from './pages/volunteers/Tasks'
import VolunteerHistory from './pages/volunteers/VolunteerHistory'

// Staff pages
import StaffDashboard from './pages/dashboard/StaffDashboard'
import PendingApplications from './pages/staff/PendingApplications'
import InventoryCategories from './pages/inventory/InventoryCategories'
import InventoryAudit from './pages/inventory/InventoryAudit'
import IncomingDonations from './pages/staff/IncomingDonations'
import VolunteerAssignments from './pages/staff/VolunteerAssignments'
import ReportsCenter from './pages/reports/ReportsCenter'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DashboardRedirect />} />

            {/* Client Routes */}
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/register" element={<ClientRegistration />} />
            <Route path="/client/upload-documents" element={<UploadDocuments />} />
            <Route path="/client/appointments" element={<MyAppointments />} />
            <Route path="/client/profile" element={<UpdateProfile />} />

            {/* Donor Routes */}
            <Route path="/donor/dashboard" element={<DonorDashboard />} />
            <Route path="/donor/log-donation" element={<LogDonation />} />
            <Route path="/donor/history" element={<DonationHistory />} />
            <Route path="/donor/schedule-dropoff" element={<ScheduleDropoff />} />
            <Route path="/donor/receipts" element={<Receipts />} />
            <Route path="/donor/contact" element={<ContactStaff />} />

            {/* Volunteer Routes */}
            <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
            <Route path="/volunteer/shifts" element={<AvailableShifts />} />
            <Route path="/volunteer/my-shifts" element={<MyShifts />} />
            <Route path="/volunteer/tasks" element={<Tasks />} />
            <Route path="/volunteer/history" element={<VolunteerHistory />} />

            {/* Staff Routes */}
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
            <Route path="/staff/applications" element={<PendingApplications />} />
            <Route path="/staff/inventory/categories" element={<InventoryCategories />} />
            <Route path="/staff/inventory/audit" element={<InventoryAudit />} />
            <Route path="/staff/donations" element={<IncomingDonations />} />
            <Route path="/staff/volunteers" element={<VolunteerAssignments />} />
            <Route path="/staff/reports" element={<ReportsCenter />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  )
}

export default App

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './layouts/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Dashboard redirect component
const DashboardRedirect = () => {
  const role = localStorage.getItem('userRole')
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
            <Route path="/client/dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
            <Route path="/client/register" element={<ProtectedRoute><ClientRegistration /></ProtectedRoute>} />
            <Route path="/client/upload-documents" element={<ProtectedRoute><UploadDocuments /></ProtectedRoute>} />
            <Route path="/client/appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />
            <Route path="/client/profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />

            {/* Donor Routes */}
            <Route path="/donor/dashboard" element={<ProtectedRoute><DonorDashboard /></ProtectedRoute>} />
            <Route path="/donor/log-donation" element={<ProtectedRoute><LogDonation /></ProtectedRoute>} />
            <Route path="/donor/history" element={<ProtectedRoute><DonationHistory /></ProtectedRoute>} />
            <Route path="/donor/schedule-dropoff" element={<ProtectedRoute><ScheduleDropoff /></ProtectedRoute>} />
            <Route path="/donor/receipts" element={<ProtectedRoute><Receipts /></ProtectedRoute>} />
            <Route path="/donor/contact" element={<ProtectedRoute><ContactStaff /></ProtectedRoute>} />

            {/* Volunteer Routes */}
            <Route path="/volunteer/dashboard" element={<ProtectedRoute><VolunteerDashboard /></ProtectedRoute>} />
            <Route path="/volunteer/shifts" element={<ProtectedRoute><AvailableShifts /></ProtectedRoute>} />
            <Route path="/volunteer/my-shifts" element={<ProtectedRoute><MyShifts /></ProtectedRoute>} />
            <Route path="/volunteer/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
            <Route path="/volunteer/history" element={<ProtectedRoute><VolunteerHistory /></ProtectedRoute>} />

            {/* Staff Routes */}
            <Route path="/staff/dashboard" element={<ProtectedRoute><StaffDashboard /></ProtectedRoute>} />
            <Route path="/staff/applications" element={<ProtectedRoute><PendingApplications /></ProtectedRoute>} />
            <Route path="/staff/inventory/categories" element={<ProtectedRoute><InventoryCategories /></ProtectedRoute>} />
            <Route path="/staff/inventory/audit" element={<ProtectedRoute><InventoryAudit /></ProtectedRoute>} />
            <Route path="/staff/donations" element={<ProtectedRoute><IncomingDonations /></ProtectedRoute>} />
            <Route path="/staff/volunteers" element={<ProtectedRoute><VolunteerAssignments /></ProtectedRoute>} />
            <Route path="/staff/reports" element={<ProtectedRoute><ReportsCenter /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  )
}

export default App

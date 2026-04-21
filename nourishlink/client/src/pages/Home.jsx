import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Navigate to your dashboard using the menu above.
        </p>
        <Link
          to={`/${user.role}/dashboard`}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          NourishLink
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Community Food Pantry Management System - Connecting those in need with essential resources through efficient management.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-4xl mb-4">family_restroom</div>
          <h3 className="text-xl font-semibold mb-2">For Clients</h3>
          <p className="text-gray-600">
            Register for services, upload eligibility documents, and schedule pickup appointments.
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-4xl mb-4">volunteer_activism</div>
          <h3 className="text-xl font-semibold mb-2">For Donors</h3>
          <p className="text-gray-600">
            Log donations, schedule drop-offs, and track your contribution history.
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-4xl mb-4">people</div>
          <h3 className="text-xl font-semibold mb-2">For Volunteers</h3>
          <p className="text-gray-600">
            Sign up for shifts, track hours, and help serve your community.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h4 className="font-semibold mb-2">Register</h4>
            <p className="text-sm text-gray-600">Create an account with your role</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <h4 className="font-semibold mb-2">Complete Profile</h4>
            <p className="text-sm text-gray-600">Fill in your specific information</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold">3</span>
            </div>
            <h4 className="font-semibold mb-2">Get Approved</h4>
            <p className="text-sm text-gray-600">Staff review and approve applications</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold">4</span>
            </div>
            <h4 className="font-semibold mb-2">Start Using</h4>
            <p className="text-sm text-gray-600">Access all features and services</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

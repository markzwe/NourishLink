import React from "react";
import { Link } from "react-router-dom";

const DonorDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Donor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <Link to="/donor/log-donation" className="p-4 bg-blue-500 text-white rounded">
          Log Donation
        </Link>

        <Link to="/donor/history" className="p-4 bg-green-500 text-white rounded">
          View Donation History
        </Link>

        <Link to="/donor/schedule-dropoff" className="p-4 bg-purple-500 text-white rounded">
          Schedule Drop-off
        </Link>

        <Link to="/donor/receipts" className="p-4 bg-yellow-500 text-white rounded">
          Download Receipts
        </Link>

        <Link to="/donor/contact" className="p-4 bg-red-500 text-white rounded">
          Contact Staff
        </Link>

      </div>
    </div>
  );
};

export default DonorDashboard;
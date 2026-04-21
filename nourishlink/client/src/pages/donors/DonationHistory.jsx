import React, { useState } from 'react';

const DonationHistory = () => {
  const [donations] = useState([
    {
      id: 1,
      dropoffDate: '2023-12-10',
      dropoffTime: '10:00 AM',
      status: 'completed',
      totalWeight: 25,
      items: [
        { itemType: 'canned_goods', description: 'Canned vegetables', quantity: '15 cans' },
        { itemType: 'dry_goods', description: 'Rice and pasta', quantity: '10 lbs' },
      ],
      receiptGenerated: true,
    },
    {
      id: 2,
      dropoffDate: '2023-12-05',
      dropoffTime: '2:00 PM',
      status: 'completed',
      totalWeight: 50,
      items: [
        { itemType: 'fresh_produce', description: 'Fresh vegetables', quantity: '30 lbs' },
        { itemType: 'bakery', description: 'Bread and pastries', quantity: '20 lbs' },
      ],
      receiptGenerated: true,
    },
    {
      id: 3,
      dropoffDate: '2023-11-28',
      dropoffTime: '3:00 PM',
      status: 'completed',
      totalWeight: 30,
      items: [
        { itemType: 'dairy', description: 'Milk and cheese', quantity: '20 lbs' },
        { itemType: 'meat', description: 'Frozen meat', quantity: '10 lbs' },
      ],
      receiptGenerated: true,
    },
    {
      id: 4,
      dropoffDate: '2023-12-15',
      dropoffTime: '11:00 AM',
      status: 'pending',
      totalWeight: 40,
      items: [
        { itemType: 'canned_goods', description: 'Canned fruits', quantity: '25 cans' },
        { itemType: 'dry_goods', description: 'Cereal and oatmeal', quantity: '15 lbs' },
      ],
      receiptGenerated: false,
    },
  ]);

  const [filter, setFilter] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredDonations = donations.filter(donation => {
    if (filter === 'all') return true;
    return donation.status === filter;
  });

  const totalWeight = donations.reduce((sum, donation) => sum + donation.totalWeight, 0);
  const completedDonations = donations.filter(d => d.status === 'completed').length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Donation History</h1>
        <p className="text-gray-600 mt-2">View and manage your donation records.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Donations</h3>
          <div className="text-3xl font-bold text-blue-600">{donations.length}</div>
          <p className="text-sm text-gray-600 mt-2">All time</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Weight</h3>
          <div className="text-3xl font-bold text-green-600">{totalWeight} lbs</div>
          <p className="text-sm text-gray-600 mt-2">All time</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed</h3>
          <div className="text-3xl font-bold text-purple-600">{completedDonations}</div>
          <p className="text-sm text-gray-600 mt-2">Processed donations</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Filter Donations</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All ({donations.length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Completed ({completedDonations})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Pending ({donations.filter(d => d.status === 'pending').length})
            </button>
          </div>
        </div>
      </div>

      {/* Donations List */}
      <div className="space-y-4">
        {filteredDonations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No donations found matching the selected filter.</p>
          </div>
        ) : (
          filteredDonations.map(donation => (
            <div key={donation.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {new Date(donation.dropoffDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(donation.status)}`}>
                      {donation.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600">
                    Drop-off Time: {donation.dropoffTime}
                  </p>
                  <p className="text-gray-600">
                    Total Weight: {donation.totalWeight} lbs
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  {donation.receiptGenerated && (
                    <button className="text-green-600 hover:text-green-800 text-sm">
                      Download Receipt
                    </button>
                  )}
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    View Details
                  </button>
                </div>
              </div>
              
              {/* Items List */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Items Donated:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {donation.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="font-medium">{item.description}</span>
                      <span>·</span>
                      <span>{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DonationHistory;

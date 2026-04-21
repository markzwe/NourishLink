import React, { useState } from 'react';

const IncomingDonations = () => {
  const [donations] = useState([
    {
      id: 1,
      donorName: 'Local Grocery Store',
      dropoffDate: '2023-12-15',
      dropoffTime: '10:00 AM',
      status: 'scheduled',
      totalWeight: 150,
      items: [
        { type: 'canned_goods', description: 'Canned vegetables', quantity: '50 cases', condition: 'good' },
        { type: 'dry_goods', description: 'Pasta and rice', quantity: '30 bags', condition: 'excellent' },
        { type: 'bakery', description: 'Bread items', quantity: '20 loaves', condition: 'good' },
      ],
      notes: 'Regular weekly donation',
      contactPhone: '(555) 123-4567',
    },
    {
      id: 2,
      donorName: 'Community Farm',
      dropoffDate: '2023-12-15',
      dropoffTime: '2:00 PM',
      status: 'arrived',
      totalWeight: 75,
      items: [
        { type: 'fresh_produce', description: 'Mixed vegetables', quantity: '75 lbs', condition: 'excellent' },
        { type: 'fresh_produce', description: 'Fresh fruits', quantity: '50 lbs', condition: 'good' },
      ],
      notes: 'Seasonal produce donation',
      contactPhone: '(555) 234-5678',
    },
    {
      id: 3,
      donorName: 'Jane Smith',
      dropoffDate: '2023-12-14',
      dropoffTime: '3:00 PM',
      status: 'processing',
      totalWeight: 25,
      items: [
        { type: 'canned_goods', description: 'Canned goods', quantity: '15 cans', condition: 'good' },
        { type: 'dry_goods', description: 'Pantry items', quantity: '10 boxes', condition: 'good' },
      ],
      notes: 'Individual donor',
      contactPhone: '(555) 345-6789',
    },
    {
      id: 4,
      donorName: 'Food Bank Central',
      dropoffDate: '2023-12-16',
      dropoffTime: '9:00 AM',
      status: 'scheduled',
      totalWeight: 500,
      items: [
        { type: 'mixed', description: 'Various food items', quantity: '500 lbs', condition: 'good' },
      ],
      notes: 'Monthly bulk delivery',
      contactPhone: '(555) 456-7890',
    },
  ]);

  const [selectedDonation, setSelectedDonation] = useState(null);
  const [actionStatus, setActionStatus] = useState({});

  const handleProcess = async (donationId) => {
    setActionStatus(prev => ({ ...prev, [donationId]: 'processing' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setActionStatus(prev => ({ ...prev, [donationId]: 'processed' }));
      
      alert(`Donation #${donationId} has been processed successfully!`);
      
      setTimeout(() => setActionStatus(prev => ({ ...prev, [donationId]: null })), 2000);
    } catch (error) {
      console.error('Process error:', error);
      setActionStatus(prev => ({ ...prev, [donationId]: 'error' }));
    }
  };

  const handleComplete = async (donationId) => {
    setActionStatus(prev => ({ ...prev, [donationId]: 'completing' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setActionStatus(prev => ({ ...prev, [donationId]: 'completed' }));
      
      alert(`Donation #${donationId} has been completed and added to inventory!`);
      
      setTimeout(() => setActionStatus(prev => ({ ...prev, [donationId]: null })), 2000);
    } catch (error) {
      console.error('Complete error:', error);
      setActionStatus(prev => ({ ...prev, [donationId]: 'error' }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'arrived': return 'text-yellow-600 bg-yellow-100';
      case 'processing': return 'text-orange-600 bg-orange-100';
      case 'completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const todayDonations = donations.filter(d => d.dropoffDate === today);
  const totalWeightToday = todayDonations.reduce((sum, d) => sum + d.totalWeight, 0);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Incoming Donations</h1>
        <p className="text-gray-600 mt-2">Manage and process incoming food donations.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Donations</h3>
          <div className="text-3xl font-bold text-blue-600">{todayDonations.length}</div>
          <p className="text-sm text-gray-600 mt-2">Scheduled</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Weight</h3>
          <div className="text-3xl font-bold text-green-600">{totalWeightToday} lbs</div>
          <p className="text-sm text-gray-600 mt-2">Expected</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing</h3>
          <div className="text-3xl font-bold text-orange-600">{donations.filter(d => d.status === 'processing').length}</div>
          <p className="text-sm text-gray-600 mt-2">Active</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed Today</h3>
          <div className="text-3xl font-bold text-purple-600">{donations.filter(d => d.status === 'completed' && d.dropoffDate === today).length}</div>
          <p className="text-sm text-gray-600 mt-2">Processed</p>
        </div>
      </div>

      {/* Donations List */}
      <div className="space-y-4">
        {donations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No incoming donations scheduled.</p>
          </div>
        ) : (
          donations.map(donation => (
            <div key={donation.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{donation.donorName}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(donation.status)}`}>
                      {donation.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                    <div>
                      <p className="font-medium text-gray-900">Date & Time</p>
                      <p>{new Date(donation.dropoffDate).toLocaleDateString()} - {donation.dropoffTime}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">Total Weight</p>
                      <p>{donation.totalWeight} lbs</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">Items</p>
                      <p>{donation.items.length} different items</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">Contact</p>
                      <p>{donation.contactPhone}</p>
                    </div>
                  </div>
                  
                  {donation.notes && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">Notes:</p>
                      <p className="text-sm text-gray-600">{donation.notes}</p>
                    </div>
                  )}
                  
                  {/* Items List */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Donation Items:</h4>
                    <div className="space-y-2">
                      {donation.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-700">{item.description}</span>
                            <span className="text-sm text-gray-500">·</span>
                            <span className="text-sm text-gray-600">{item.quantity}</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(item.condition)}`}>
                              {item.condition}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedDonation(donation)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  View Details
                </button>
                
                {donation.status === 'arrived' && (
                  <button
                    onClick={() => handleProcess(donation.id)}
                    disabled={actionStatus[donation.id]}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {actionStatus[donation.id] === 'processing' ? 'Processing...' :
                     actionStatus[donation.id] === 'processed' ? 'Processed!' :
                     actionStatus[donation.id] === 'error' ? 'Error' :
                     'Start Processing'}
                  </button>
                )}
                
                {donation.status === 'processing' && (
                  <button
                    onClick={() => handleComplete(donation.id)}
                    disabled={actionStatus[donation.id]}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {actionStatus[donation.id] === 'completing' ? 'Completing...' :
                     actionStatus[donation.id] === 'completed' ? 'Completed!' :
                     actionStatus[donation.id] === 'error' ? 'Error' :
                     'Complete & Add to Inventory'}
                  </button>
                )}
                
                {donation.status === 'scheduled' && (
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    Awaiting Arrival
                  </button>
                )}
                
                {donation.status === 'completed' && (
                  <button
                    disabled
                    className="px-4 py-2 bg-green-100 text-green-800 rounded-lg cursor-not-allowed"
                  >
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Donation Details - {selectedDonation.donorName}
                </h2>
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Donation Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Donor:</span>
                        <span className="text-gray-600">{selectedDonation.donorName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Date:</span>
                        <span className="text-gray-600">{new Date(selectedDonation.dropoffDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Time:</span>
                        <span className="text-gray-600">{selectedDonation.dropoffTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Total Weight:</span>
                        <span className="text-gray-600">{selectedDonation.totalWeight} lbs</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Contact:</span>
                        <span className="text-gray-600">{selectedDonation.contactPhone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Status:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedDonation.status)}`}>
                          {selectedDonation.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Processing Information</h3>
                    <div className="space-y-2 text-sm">
                      {selectedDonation.status === 'scheduled' && (
                        <p className="text-gray-600">Awaiting donor arrival</p>
                      )}
                      {selectedDonation.status === 'arrived' && (
                        <div>
                          <p className="text-green-600 font-medium">Donation has arrived</p>
                          <p className="text-gray-600">Ready to begin processing</p>
                        </div>
                      )}
                      {selectedDonation.status === 'processing' && (
                        <div>
                          <p className="text-blue-600 font-medium">Currently being processed</p>
                          <p className="text-gray-600">Items being sorted and inspected</p>
                        </div>
                      )}
                      {selectedDonation.status === 'completed' && (
                        <div>
                          <p className="text-green-600 font-medium">Processing completed</p>
                          <p className="text-gray-600">Items added to inventory</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Donation Items</h3>
                  <div className="space-y-3">
                    {selectedDonation.items.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{item.description}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(item.condition)}`}>
                            {item.condition}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedDonation.notes && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
                    <p className="text-gray-600">{selectedDonation.notes}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                
                {selectedDonation.status === 'arrived' && (
                  <button
                    onClick={() => {
                      handleProcess(selectedDonation.id);
                      setSelectedDonation(null);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Start Processing
                  </button>
                )}
                
                {selectedDonation.status === 'processing' && (
                  <button
                    onClick={() => {
                      handleComplete(selectedDonation.id);
                      setSelectedDonation(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Complete & Add to Inventory
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomingDonations;

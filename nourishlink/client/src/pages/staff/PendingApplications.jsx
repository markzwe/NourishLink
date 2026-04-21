import React, { useState } from 'react';

const PendingApplications = () => {
  const [applications] = useState([
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@email.com',
      applicationDate: '2023-12-10',
      householdSize: 3,
      monthlyIncome: 1800,
      address: '456 Oak Street, Anytown, CA 12345',
      phone: '(555) 234-5678',
      documents: [
        { type: 'proof_of_income', status: 'approved', fileName: 'paystub_dec.pdf' },
        { type: 'id_document', status: 'pending', fileName: 'driver_license.jpg' },
      ],
      eligibilityStatus: 'pending',
    },
    {
      id: 2,
      firstName: 'Robert',
      lastName: 'Johnson',
      email: 'robert.j@email.com',
      applicationDate: '2023-12-08',
      householdSize: 2,
      monthlyIncome: 2500,
      address: '789 Pine Avenue, Anytown, CA 12345',
      phone: '(555) 345-6789',
      documents: [
        { type: 'proof_of_income', status: 'approved', fileName: 'employment_letter.pdf' },
        { type: 'address_proof', status: 'approved', fileName: 'utility_bill.pdf' },
      ],
      eligibilityStatus: 'pending',
    },
    {
      id: 3,
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria.g@email.com',
      applicationDate: '2023-12-05',
      householdSize: 4,
      monthlyIncome: 2200,
      address: '321 Elm Road, Anytown, CA 12345',
      phone: '(555) 456-7890',
      documents: [
        { type: 'proof_of_income', status: 'pending', fileName: 'tax_return.pdf' },
        { type: 'id_document', status: 'pending', fileName: 'state_id.jpg' },
        { type: 'address_proof', status: 'approved', fileName: 'lease_agreement.pdf' },
      ],
      eligibilityStatus: 'pending',
    },
  ]);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [actionStatus, setActionStatus] = useState({});

  const handleApprove = async (applicationId) => {
    setActionStatus(prev => ({ ...prev, [applicationId]: 'approving' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setActionStatus(prev => ({ ...prev, [applicationId]: 'approved' }));
      
      alert(`Application #${applicationId} has been approved!`);
      
      setTimeout(() => setActionStatus(prev => ({ ...prev, [applicationId]: null })), 2000);
    } catch (error) {
      console.error('Approve error:', error);
      setActionStatus(prev => ({ ...prev, [applicationId]: 'error' }));
    }
  };

  const handleReject = async (applicationId, reason) => {
    setActionStatus(prev => ({ ...prev, [applicationId]: 'rejecting' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setActionStatus(prev => ({ ...prev, [applicationId]: 'rejected' }));
      
      alert(`Application #${applicationId} has been rejected.`);
      
      setTimeout(() => setActionStatus(prev => ({ ...prev, [applicationId]: null })), 2000);
    } catch (error) {
      console.error('Reject error:', error);
      setActionStatus(prev => ({ ...prev, [applicationId]: 'error' }));
    }
  };

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEligibilityColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pending Applications</h1>
        <p className="text-gray-600 mt-2">Review and process client eligibility applications.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Pending</h3>
          <div className="text-3xl font-bold text-yellow-600">{applications.length}</div>
          <p className="text-sm text-gray-600 mt-2">Applications</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">This Week</h3>
          <div className="text-3xl font-bold text-blue-600">
            {applications.filter(a => {
              const appDate = new Date(a.applicationDate);
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return appDate >= weekAgo;
            }).length}
          </div>
          <p className="text-sm text-gray-600 mt-2">New applications</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg Review Time</h3>
          <div className="text-3xl font-bold text-purple-600">2.3</div>
          <p className="text-sm text-gray-600 mt-2">Days</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Approval Rate</h3>
          <div className="text-3xl font-bold text-green-600">78%</div>
          <p className="text-sm text-gray-600 mt-2">Last 30 days</p>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No pending applications to review.</p>
          </div>
        ) : (
          applications.map(application => (
            <div key={application.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {application.firstName} {application.lastName}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEligibilityColor(application.eligibilityStatus)}`}>
                      {application.eligibilityStatus}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div>
                      <p className="font-medium text-gray-900">Contact</p>
                      <p>{application.email}</p>
                      <p>{application.phone}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">Household</p>
                      <p>{application.householdSize} members</p>
                      <p>${application.monthlyIncome}/month</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">Application</p>
                      <p>Submitted: {new Date(application.applicationDate).toLocaleDateString()}</p>
                      <p>{application.address}</p>
                    </div>
                  </div>
                  
                  {/* Documents */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Documents:</h4>
                    <div className="space-y-2">
                      {application.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-700">{doc.fileName}</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatusColor(doc.status)}`}>
                              {doc.status}
                            </span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedApplication(application)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Review Details
                </button>
                
                <button
                  onClick={() => handleApprove(application.id)}
                  disabled={actionStatus[application.id]}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {actionStatus[application.id] === 'approving' ? 'Approving...' :
                   actionStatus[application.id] === 'approved' ? 'Approved!' :
                   actionStatus[application.id] === 'error' ? 'Error' :
                   'Approve'}
                </button>
                
                <button
                  onClick={() => {
                    const reason = prompt('Please provide reason for rejection:');
                    if (reason) handleReject(application.id, reason);
                  }}
                  disabled={actionStatus[application.id]}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {actionStatus[application.id] === 'rejecting' ? 'Rejecting...' :
                   actionStatus[application.id] === 'rejected' ? 'Rejected!' :
                   actionStatus[application.id] === 'error' ? 'Error' :
                   'Reject'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Application Details - {selectedApplication.firstName} {selectedApplication.lastName}
                </h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Name:</p>
                      <p className="text-gray-600">{selectedApplication.firstName} {selectedApplication.lastName}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Email:</p>
                      <p className="text-gray-600">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Phone:</p>
                      <p className="text-gray-600">{selectedApplication.phone}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Application Date:</p>
                      <p className="text-gray-600">{new Date(selectedApplication.applicationDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Household Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Household Size:</p>
                      <p className="text-gray-600">{selectedApplication.householdSize} members</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Monthly Income:</p>
                      <p className="text-gray-600">${selectedApplication.monthlyIncome}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-medium text-gray-700">Address:</p>
                      <p className="text-gray-600">{selectedApplication.address}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Submitted Documents</h3>
                  <div className="space-y-2">
                    {selectedApplication.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                        <div>
                          <p className="font-medium text-gray-900">{doc.fileName}</p>
                          <p className="text-sm text-gray-600">Type: {doc.type.replace('_', ' ')}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => {
                    handleApprove(selectedApplication.id);
                    setSelectedApplication(null);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Approve Application
                </button>
                
                <button
                  onClick={() => {
                    const reason = prompt('Please provide reason for rejection:');
                    if (reason) {
                      handleReject(selectedApplication.id, reason);
                      setSelectedApplication(null);
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingApplications;

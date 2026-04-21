import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const InventoryAudit = () => {
  const [audits] = useState([
    {
      id: 1,
      itemId: 1,
      itemName: 'Canned Tomatoes',
      categoryName: 'Canned Goods',
      physicalCount: 45,
      systemCount: 50,
      varianceQty: -5,
      varianceReason: 'Spoilage/Expired',
      status: 'completed',
      auditTimestamp: '2023-12-10T10:30:00',
      staffName: 'Sarah Johnson',
      batchNumber: 'CT-2023-12-01',
      expiryDate: '2024-06-15',
    },
    {
      id: 2,
      itemId: 2,
      itemName: 'Fresh Carrots',
      categoryName: 'Fresh Produce',
      physicalCount: 25,
      systemCount: 30,
      varianceQty: -5,
      varianceReason: 'Spoilage',
      status: 'completed',
      auditTimestamp: '2023-12-10T11:15:00',
      staffName: 'Mike Chen',
      batchNumber: 'FP-2023-12-08',
      expiryDate: '2023-12-20',
    },
    {
      id: 3,
      itemId: 3,
      itemName: 'Rice',
      categoryName: 'Dry Goods',
      physicalCount: 60,
      systemCount: 55,
      varianceQty: 5,
      varianceReason: 'Counting Error',
      status: 'completed',
      auditTimestamp: '2023-12-10T09:45:00',
      staffName: 'Sarah Johnson',
      batchNumber: 'DG-2023-11-15',
      expiryDate: '2024-11-15',
    },
    {
      id: 4,
      itemId: 4,
      itemName: 'Milk',
      categoryName: 'Dairy',
      physicalCount: null,
      systemCount: 20,
      varianceQty: null,
      varianceReason: null,
      status: 'pending',
      auditTimestamp: null,
      staffName: null,
      batchNumber: 'DA-2023-12-14',
      expiryDate: '2023-12-21',
    },
    {
      id: 5,
      itemName: 'Chicken Breast',
      categoryName: 'Meat',
      physicalCount: null,
      systemCount: 15,
      varianceQty: null,
      varianceReason: null,
      status: 'pending',
      auditTimestamp: null,
      staffName: null,
      batchNumber: 'MT-2023-12-13',
      expiryDate: '2023-12-25',
    },
  ]);

  const [selectedAudit, setSelectedAudit] = useState(null);
  const [showAuditForm, setShowAuditForm] = useState(false);
  const [actionStatus, setActionStatus] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setActionStatus(prev => ({ ...prev, submitting: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setActionStatus(prev => ({ ...prev, submitting: false, completed: true }));
      
      alert('Audit completed successfully!');
      setShowAuditForm(false);
      reset();
      
      setTimeout(() => setActionStatus(prev => ({ ...prev, completed: null })), 2000);
    } catch (error) {
      console.error('Audit error:', error);
      setActionStatus(prev => ({ ...prev, submitting: false, error: true }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getVarianceColor = (variance) => {
    if (variance === null) return 'text-gray-600 bg-gray-100';
    if (variance === 0) return 'text-green-600 bg-green-100';
    if (variance < 0) return 'text-red-600 bg-red-100';
    return 'text-blue-600 bg-blue-100';
  };

  const completedAudits = audits.filter(a => a.status === 'completed');
  const pendingAudits = audits.filter(a => a.status === 'pending');
  const totalVariance = completedAudits.reduce((sum, a) => sum + (a.varianceQty || 0), 0);
  const itemsWithVariance = completedAudits.filter(a => a.varianceQty !== 0).length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Audit</h1>
          <p className="text-gray-600 mt-2">Conduct physical inventory counts and track variances.</p>
        </div>
        <button
          onClick={() => setShowAuditForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Start New Audit
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Audits</h3>
          <div className="text-3xl font-bold text-blue-600">{completedAudits.length}</div>
          <p className="text-sm text-gray-600 mt-2">Completed today</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Audits</h3>
          <div className="text-3xl font-bold text-yellow-600">{pendingAudits.length}</div>
          <p className="text-sm text-gray-600 mt-2">To be completed</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Variance</h3>
          <div className="text-3xl font-bold text-purple-600">{totalVariance}</div>
          <p className="text-sm text-gray-600 mt-2">Items difference</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Items with Variance</h3>
          <div className="text-3xl font-bold text-orange-600">{itemsWithVariance}</div>
          <p className="text-sm text-gray-600 mt-2">Need attention</p>
        </div>
      </div>

      {/* Audit Form */}
      {showAuditForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Conduct Inventory Audit</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item to Audit
                </label>
                <select
                  {...register('itemId', { required: 'Please select an item' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select an item</option>
                  {audits.filter(a => a.status === 'pending').map(item => (
                    <option key={item.id} value={item.itemId}>
                      {item.itemName} - {item.categoryName}
                    </option>
                  ))}
                </select>
                {errors.itemId && (
                  <p className="mt-1 text-sm text-red-600">{errors.itemId.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Physical Count
                </label>
                <input
                  {...register('physicalCount', { 
                    required: 'Physical count is required',
                    min: { value: 0, message: 'Cannot be negative' }
                  })}
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter actual count"
                />
                {errors.physicalCount && (
                  <p className="mt-1 text-sm text-red-600">{errors.physicalCount.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Variance Reason
              </label>
              <select
                {...register('varianceReason', { required: 'Variance reason is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select reason</option>
                <option value="counting_error">Counting Error</option>
                <option value="spoilage">Spoilage/Expired</option>
                <option value="damage">Damage</option>
                <option value="theft">Theft/Loss</option>
                <option value="data_entry">Data Entry Error</option>
                <option value="other">Other</option>
              </select>
              {errors.varianceReason && (
                <p className="mt-1 text-sm text-red-600">{errors.varianceReason.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                {...register('notes')}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Additional notes about the audit..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={actionStatus.submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {actionStatus.submitting ? 'Submitting...' : 
                 actionStatus.completed ? 'Completed!' :
                 actionStatus.error ? 'Error' :
                 'Complete Audit'}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setShowAuditForm(false);
                  reset();
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Audits List */}
      <div className="space-y-4">
        {audits.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No audit records found.</p>
          </div>
        ) : (
          audits.map(audit => (
            <div key={audit.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{audit.itemName}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(audit.status)}`}>
                      {audit.status}
                    </span>
                    {audit.varianceQty !== null && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getVarianceColor(audit.varianceQty)}`}>
                        Variance: {audit.varianceQty > 0 ? '+' : ''}{audit.varianceQty}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                    <div>
                      <p className="font-medium text-gray-900">Category</p>
                      <p>{audit.categoryName}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">System vs Physical</p>
                      <p>{audit.systemCount} vs {audit.physicalCount || 'Not counted'}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">Batch/Expiry</p>
                      <p>{audit.batchNumber}</p>
                      <p>Expires: {new Date(audit.expiryDate).toLocaleDateString()}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">Audit Details</p>
                      {audit.status === 'completed' ? (
                        <>
                          <p>Audited by: {audit.staffName}</p>
                          <p>{new Date(audit.auditTimestamp).toLocaleString()}</p>
                          {audit.varianceReason && (
                            <p>Reason: {audit.varianceReason.replace('_', ' ')}</p>
                          )}
                        </>
                      ) : (
                        <p>Pending audit</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-6">
                  <button
                    onClick={() => setSelectedAudit(audit)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View Details
                  </button>
                  
                  {audit.status === 'pending' && (
                    <button
                      onClick={() => {
                        setSelectedAudit(audit);
                        setShowAuditForm(true);
                      }}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Audit Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedAudit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Audit Details - {selectedAudit.itemName}
                </h2>
                <button
                  onClick={() => setSelectedAudit(null)}
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Item Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Item:</span>
                        <span className="text-gray-600">{selectedAudit.itemName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Category:</span>
                        <span className="text-gray-600">{selectedAudit.categoryName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Batch Number:</span>
                        <span className="text-gray-600">{selectedAudit.batchNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Expiry Date:</span>
                        <span className="text-gray-600">{new Date(selectedAudit.expiryDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Audit Results</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">System Count:</span>
                        <span className="text-gray-600">{selectedAudit.systemCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Physical Count:</span>
                        <span className="text-gray-600">{selectedAudit.physicalCount || 'Not counted'}</span>
                      </div>
                      {selectedAudit.varianceQty !== null && (
                        <>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Variance:</span>
                            <span className={`font-medium ${getVarianceColor(selectedAudit.varianceQty).split(' ')[0]}`}>
                              {selectedAudit.varianceQty > 0 ? '+' : ''}{selectedAudit.varianceQty}
                            </span>
                          </div>
                          {selectedAudit.varianceReason && (
                            <div className="flex justify-between">
                              <span className="font-medium text-gray-700">Reason:</span>
                              <span className="text-gray-600">{selectedAudit.varianceReason.replace('_', ' ')}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {selectedAudit.status === 'completed' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Audit Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Audited by:</span>
                        <span className="text-gray-600">{selectedAudit.staffName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Audit Date:</span>
                        <span className="text-gray-600">{new Date(selectedAudit.auditTimestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setSelectedAudit(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                
                {selectedAudit.status === 'pending' && (
                  <button
                    onClick={() => {
                      setSelectedAudit(null);
                      setShowAuditForm(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Start Audit
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

export default InventoryAudit;

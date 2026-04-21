import React, { useState } from 'react';

const MyShifts = () => {
  const [myShifts] = useState([
    {
      id: 1,
      shiftDate: '2023-12-15',
      startTime: '2:00 PM',
      endTime: '6:00 PM',
      location: 'Main Distribution Center',
      taskRole: 'Food Distribution',
      status: 'scheduled',
      taskInstructions: 'Assist clients with food selection and bagging',
      checkInTime: null,
      checkOutTime: null,
    },
    {
      id: 2,
      shiftDate: '2023-12-10',
      startTime: '10:00 AM',
      endTime: '2:00 PM',
      location: 'Warehouse',
      taskRole: 'Inventory Management',
      status: 'completed',
      taskInstructions: 'Organize and restock shelves',
      checkInTime: '2023-12-10T09:45:00',
      checkOutTime: '2023-12-10T14:15:00',
    },
    {
      id: 3,
      shiftDate: '2023-12-08',
      startTime: '1:00 PM',
      endTime: '5:00 PM',
      location: 'Main Distribution Center',
      taskRole: 'Donation Processing',
      status: 'completed',
      taskInstructions: 'Sort and process incoming donations',
      checkInTime: '2023-12-08T12:50:00',
      checkOutTime: '2023-12-08T17:05:00',
    },
    {
      id: 4,
      shiftDate: '2023-12-20',
      startTime: '9:00 AM',
      endTime: '12:00 PM',
      location: 'Main Distribution Center',
      taskRole: 'Client Services',
      status: 'scheduled',
      taskInstructions: 'Help with client check-in and registration',
      checkInTime: null,
      checkOutTime: null,
    },
  ]);

  const [actionStatus, setActionStatus] = useState({});

  const handleCheckIn = async (shiftId) => {
    setActionStatus(prev => ({ ...prev, [shiftId]: 'checking_in' }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setActionStatus(prev => ({ ...prev, [shiftId]: 'checked_in' }));
      
      // Update the shift in local state
      const shiftIndex = myShifts.findIndex(s => s.id === shiftId);
      if (shiftIndex !== -1) {
        myShifts[shiftIndex].checkInTime = new Date().toISOString();
        myShifts[shiftIndex].status = 'checked_in';
      }
      
      setTimeout(() => {
        setActionStatus(prev => ({ ...prev, [shiftId]: null }));
      }, 2000);
    } catch (error) {
      console.error('Check-in error:', error);
      setActionStatus(prev => ({ ...prev, [shiftId]: 'error' }));
    }
  };

  const handleCheckOut = async (shiftId) => {
    setActionStatus(prev => ({ ...prev, [shiftId]: 'checking_out' }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setActionStatus(prev => ({ ...prev, [shiftId]: 'checked_out' }));
      
      // Update the shift in local state
      const shiftIndex = myShifts.findIndex(s => s.id === shiftId);
      if (shiftIndex !== -1) {
        myShifts[shiftIndex].checkOutTime = new Date().toISOString();
        myShifts[shiftIndex].status = 'completed';
      }
      
      setTimeout(() => {
        setActionStatus(prev => ({ ...prev, [shiftId]: null }));
      }, 2000);
    } catch (error) {
      console.error('Check-out error:', error);
      setActionStatus(prev => ({ ...prev, [shiftId]: 'error' }));
    }
  };

  const handleCancel = async (shiftId) => {
    if (!window.confirm('Are you sure you want to cancel this shift?')) return;
    
    setActionStatus(prev => ({ ...prev, [shiftId]: 'cancelling' }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setActionStatus(prev => ({ ...prev, [shiftId]: 'cancelled' }));
      
      alert('Shift cancelled successfully.');
      
      setTimeout(() => {
        setActionStatus(prev => ({ ...prev, [shiftId]: null }));
      }, 2000);
    } catch (error) {
      console.error('Cancel error:', error);
      setActionStatus(prev => ({ ...prev, [shiftId]: 'error' }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'checked_in': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const upcomingShifts = myShifts.filter(shift => 
    shift.status === 'scheduled' || shift.status === 'checked_in'
  );
  const completedShifts = myShifts.filter(shift => shift.status === 'completed');
  const totalHours = completedShifts.reduce((total, shift) => {
    if (shift.checkInTime && shift.checkOutTime) {
      const checkIn = new Date(shift.checkInTime);
      const checkOut = new Date(shift.checkOutTime);
      return total + (checkOut - checkIn) / (1000 * 60 * 60); // Convert to hours
    }
    return total;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Shifts</h1>
        <p className="text-gray-600 mt-2">Manage your volunteer shifts and track your hours.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upcoming Shifts</h3>
          <div className="text-3xl font-bold text-blue-600">{upcomingShifts.length}</div>
          <p className="text-sm text-gray-600 mt-2">Scheduled</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed Shifts</h3>
          <div className="text-3xl font-bold text-green-600">{completedShifts.length}</div>
          <p className="text-sm text-gray-600 mt-2">This month</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Hours</h3>
          <div className="text-3xl font-bold text-purple-600">{totalHours.toFixed(1)}</div>
          <p className="text-sm text-gray-600 mt-2">Volunteered</p>
        </div>
      </div>

      {/* Upcoming Shifts */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Shifts</h2>
        
        {upcomingShifts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No upcoming shifts scheduled.</p>
            <button className="mt-4 text-blue-600 hover:text-blue-800">
              Browse Available Shifts
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingShifts.map(shift => (
              <div key={shift.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {shift.taskRole}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(shift.status)}`}>
                        {shift.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="font-medium text-gray-900">Date & Time</p>
                        <p>{new Date(shift.shiftDate).toLocaleDateString()} - {shift.startTime} to {shift.endTime}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p>{shift.location}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900">Check-in Status</p>
                        <p>
                          {shift.checkInTime ? 
                            `Checked in at ${new Date(shift.checkInTime).toLocaleTimeString()}` : 
                            'Not checked in'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-1">Task Instructions:</p>
                  <p className="text-sm text-gray-600">{shift.taskInstructions}</p>
                </div>
                
                <div className="flex space-x-3">
                  {shift.status === 'scheduled' && (
                    <button
                      onClick={() => handleCheckIn(shift.id)}
                      disabled={actionStatus[shift.id]}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      {actionStatus[shift.id] === 'checking_in' ? 'Checking In...' : 'Check In'}
                    </button>
                  )}
                  
                  {shift.status === 'checked_in' && (
                    <button
                      onClick={() => handleCheckOut(shift.id)}
                      disabled={actionStatus[shift.id]}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {actionStatus[shift.id] === 'checking_out' ? 'Checking Out...' : 'Check Out'}
                    </button>
                  )}
                  
                  {shift.status === 'scheduled' && (
                    <button
                      onClick={() => handleCancel(shift.id)}
                      disabled={actionStatus[shift.id]}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50"
                    >
                      {actionStatus[shift.id] === 'cancelling' ? 'Cancelling...' : 'Cancel Shift'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Shifts */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Shifts</h2>
        
        {completedShifts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No completed shifts yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {completedShifts.map(shift => (
              <div key={shift.id} className="bg-white rounded-lg shadow-md p-6 opacity-75">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {shift.taskRole}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(shift.status)}`}>
                        {shift.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="font-medium text-gray-900">Date</p>
                        <p>{new Date(shift.shiftDate).toLocaleDateString()}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900">Time</p>
                        <p>{shift.startTime} - {shift.endTime}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p>{shift.location}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900">Hours Worked</p>
                        <p>
                          {shift.checkInTime && shift.checkOutTime ? 
                            `${((new Date(shift.checkOutTime) - new Date(shift.checkInTime)) / (1000 * 60 * 60)).toFixed(1)} hours` : 
                            'N/A'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyShifts;

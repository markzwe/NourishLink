import React, { useState } from 'react';

const VolunteerAssignments = () => {
  const [assignments] = useState([
    {
      id: 1,
      volunteerName: 'John Smith',
      shiftDate: '2023-12-15',
      timeSlot: '2:00 PM - 6:00 PM',
      location: 'Main Distribution Center',
      taskRole: 'Food Distribution',
      status: 'assigned',
      skills: ['food_distribution', 'client_services'],
      checkInTime: null,
      checkOutTime: null,
      notes: 'Experienced volunteer, good with clients',
    },
    {
      id: 2,
      volunteerName: 'Sarah Johnson',
      shiftDate: '2023-12-15',
      timeSlot: '10:00 AM - 2:00 PM',
      location: 'Warehouse',
      taskRole: 'Inventory Management',
      status: 'checked_in',
      skills: ['inventory_management', 'heavy_lifting'],
      checkInTime: '2023-12-15T09:45:00',
      checkOutTime: null,
      notes: 'Strong volunteer, can handle heavy items',
    },
    {
      id: 3,
      volunteerName: 'Mike Chen',
      shiftDate: '2023-12-15',
      timeSlot: '2:00 PM - 6:00 PM',
      location: 'Main Distribution Center',
      taskRole: 'Client Services',
      status: 'assigned',
      skills: ['client_services', 'bilingual'],
      checkInTime: null,
      checkOutTime: null,
      notes: 'Bilingual in Spanish and English',
    },
    {
      id: 4,
      volunteerName: 'Emily Davis',
      shiftDate: '2023-12-15',
      timeSlot: '9:00 AM - 1:00 PM',
      location: 'Main Distribution Center',
      taskRole: 'Donation Processing',
      status: 'completed',
      skills: ['donation_processing'],
      checkInTime: '2023-12-15T08:50:00',
      checkOutTime: '2023-12-15T13:10:00',
      notes: 'Very efficient at sorting donations',
    },
    {
      id: 5,
      volunteerName: 'Robert Wilson',
      shiftDate: '2023-12-16',
      timeSlot: '10:00 AM - 2:00 PM',
      location: 'Warehouse',
      taskRole: 'Inventory Management',
      status: 'assigned',
      skills: ['inventory_management'],
      checkInTime: null,
      checkOutTime: null,
      notes: 'New volunteer, needs some guidance',
    },
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [actionStatus, setActionStatus] = useState({});

  const handleReassign = async (assignmentId) => {
    setActionStatus(prev => ({ ...prev, [assignmentId]: 'reassigning' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActionStatus(prev => ({ ...prev, [assignmentId]: 'reassigned' }));
      
      alert('Volunteer has been reassigned successfully!');
      
      setTimeout(() => setActionStatus(prev => ({ ...prev, [assignmentId]: null })), 2000);
    } catch (error) {
      console.error('Reassign error:', error);
      setActionStatus(prev => ({ ...prev, [assignmentId]: 'error' }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned': return 'text-blue-600 bg-blue-100';
      case 'checked_in': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const todayAssignments = assignments.filter(a => a.shiftDate === today);
  const activeVolunteers = todayAssignments.filter(a => a.status === 'checked_in').length;
  const completedToday = todayAssignments.filter(a => a.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Volunteer Assignments</h1>
        <p className="text-gray-600 mt-2">Manage volunteer shifts and assignments.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Shifts</h3>
          <div className="text-3xl font-bold text-blue-600">{todayAssignments.length}</div>
          <p className="text-sm text-gray-600 mt-2">Scheduled</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Now</h3>
          <div className="text-3xl font-bold text-green-600">{activeVolunteers}</div>
          <p className="text-sm text-gray-600 mt-2">Volunteers</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed Today</h3>
          <div className="text-3xl font-bold text-purple-600">{completedToday}</div>
          <p className="text-sm text-gray-600 mt-2">Shifts</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Assignments</h3>
          <div className="text-3xl font-bold text-orange-600">{assignments.length}</div>
          <p className="text-sm text-gray-600 mt-2">All time</p>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No volunteer assignments found.</p>
          </div>
        ) : (
          assignments.map(assignment => (
            <div key={assignment.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{assignment.volunteerName}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                    <div>
                      <p className="font-medium text-gray-900">Date & Time</p>
                      <p>{new Date(assignment.shiftDate).toLocaleDateString()} - {assignment.timeSlot}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p>{assignment.location}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">Role</p>
                      <p>{assignment.taskRole}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">Check-in/Out</p>
                      <p>
                        {assignment.checkInTime ? 
                          `In: ${new Date(assignment.checkInTime).toLocaleTimeString()}` : 
                          'Not checked in'
                        }
                        {assignment.checkOutTime && 
                          ` / Out: ${new Date(assignment.checkOutTime).toLocaleTimeString()}`
                        }
                      </p>
                    </div>
                  </div>
                  
                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {assignment.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {skill.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {assignment.notes && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">Notes:</p>
                      <p className="text-sm text-gray-600">{assignment.notes}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedAssignment(assignment)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  View Details
                </button>
                
                {assignment.status === 'assigned' && (
                  <button
                    onClick={() => handleReassign(assignment.id)}
                    disabled={actionStatus[assignment.id]}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {actionStatus[assignment.id] === 'reassigning' ? 'Reassigning...' :
                     actionStatus[assignment.id] === 'reassigned' ? 'Reassigned!' :
                     actionStatus[assignment.id] === 'error' ? 'Error' :
                     'Reassign'}
                  </button>
                )}
                
                {assignment.status === 'checked_in' && (
                  <button
                    disabled
                    className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg cursor-not-allowed"
                  >
                    Currently Working
                  </button>
                )}
                
                {assignment.status === 'completed' && (
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
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Assignment Details - {selectedAssignment.volunteerName}
                </h2>
                <button
                  onClick={() => setSelectedAssignment(null)}
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Shift Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Volunteer:</span>
                        <span className="text-gray-600">{selectedAssignment.volunteerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Date:</span>
                        <span className="text-gray-600">{new Date(selectedAssignment.shiftDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Time:</span>
                        <span className="text-gray-600">{selectedAssignment.timeSlot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Location:</span>
                        <span className="text-gray-600">{selectedAssignment.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Role:</span>
                        <span className="text-gray-600">{selectedAssignment.taskRole}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Status:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedAssignment.status)}`}>
                          {selectedAssignment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Time Tracking</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Check-in Time:</span>
                        <span className="text-gray-600">
                          {selectedAssignment.checkInTime ? 
                            new Date(selectedAssignment.checkInTime).toLocaleTimeString() : 
                            'Not checked in'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Check-out Time:</span>
                        <span className="text-gray-600">
                          {selectedAssignment.checkOutTime ? 
                            new Date(selectedAssignment.checkOutTime).toLocaleTimeString() : 
                            'Not checked out'
                          }
                        </span>
                      </div>
                      {selectedAssignment.checkInTime && selectedAssignment.checkOutTime && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Total Hours:</span>
                          <span className="text-gray-600">
                            {((new Date(selectedAssignment.checkOutTime) - new Date(selectedAssignment.checkInTime)) / (1000 * 60 * 60)).toFixed(2)} hours
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Volunteer Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAssignment.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                        {skill.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
                
                {selectedAssignment.notes && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
                    <p className="text-gray-600">{selectedAssignment.notes}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setSelectedAssignment(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                
                {selectedAssignment.status === 'assigned' && (
                  <button
                    onClick={() => {
                      handleReassign(selectedAssignment.id);
                      setSelectedAssignment(null);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Reassign Volunteer
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

export default VolunteerAssignments;

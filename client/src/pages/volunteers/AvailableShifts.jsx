import React, { useState } from 'react';
import { volunteersAPI } from '../../api/volunteers';

const AvailableShifts = () => {
  const [shifts, setShifts] = useState([
    {
      id: 1,
      shiftDate: '2023-12-16',
      startTime: '10:00 AM',
      endTime: '2:00 PM',
      location: 'Main Distribution Center',
      capacity: 5,
      currentVolunteers: 2,
      requirements: 'Must be able to lift 25 lbs',
      taskRole: 'Food Distribution',
      description: 'Help distribute food to clients during pickup hours',
    },
    {
      id: 2,
      shiftDate: '2023-12-16',
      startTime: '2:00 PM',
      endTime: '6:00 PM',
      location: 'Main Distribution Center',
      capacity: 3,
      currentVolunteers: 1,
      requirements: 'Customer service experience preferred',
      taskRole: 'Client Services',
      description: 'Assist clients with check-in and questions',
    },
    {
      id: 3,
      shiftDate: '2023-12-17',
      startTime: '9:00 AM',
      endTime: '12:00 PM',
      location: 'Warehouse',
      capacity: 4,
      currentVolunteers: 0,
      requirements: 'Must be able to lift 50 lbs',
      taskRole: 'Inventory Management',
      description: 'Organize and restock inventory shelves',
    },
    {
      id: 4,
      shiftDate: '2023-12-18',
      startTime: '1:00 PM',
      endTime: '5:00 PM',
      location: 'Main Distribution Center',
      capacity: 6,
      currentVolunteers: 4,
      requirements: 'Attention to detail',
      taskRole: 'Donation Processing',
      description: 'Sort and process incoming donations',
    },
    {
      id: 5,
      shiftDate: '2023-12-19',
      startTime: '3:00 PM',
      endTime: '7:00 PM',
      location: 'Main Distribution Center',
      capacity: 8,
      currentVolunteers: 3,
      requirements: 'No specific requirements',
      taskRole: 'General Support',
      description: 'Various tasks as needed during busy hours',
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [signUpStatus, setSignUpStatus] = useState({});
  const [pageError, setPageError] = useState('');

  React.useEffect(() => {
    const loadShifts = async () => {
      try {
        const response = await volunteersAPI.getShifts();
        if (Array.isArray(response.data?.data) && response.data.data.length > 0) {
          setShifts(response.data.data);
        }
      } catch (error) {
        setPageError(error.response?.data?.message || 'Unable to load shifts.');
      }
    };
    loadShifts();
  }, []);

  const handleSignUp = async (shiftId) => {
    setSignUpStatus(prev => ({ ...prev, [shiftId]: 'signing' }));
    
    try {
      await volunteersAPI.signupForShift(shiftId);
      
      setSignUpStatus(prev => ({ ...prev, [shiftId]: 'signed' }));
      setShifts((prevShifts) =>
        prevShifts.map((shift) =>
          shift.id === shiftId || shift._id === shiftId
            ? { ...shift, currentVolunteers: (shift.currentVolunteers || 0) + 1 }
            : shift
        )
      );
      
      setTimeout(() => {
        setSignUpStatus(prev => ({ ...prev, [shiftId]: null }));
      }, 2000);
    } catch (error) {
      setPageError(error.response?.data?.message || 'Sign up failed.');
      setSignUpStatus(prev => ({ ...prev, [shiftId]: 'error' }));
    }
  };

  const filteredShifts = shifts.filter(shift => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'available') return shift.currentVolunteers < shift.capacity;
    if (selectedFilter === 'full') return shift.currentVolunteers >= shift.capacity;
    return true;
  });

  const getAvailabilityColor = (current, capacity) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 100) return 'text-red-600 bg-red-100';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Shifts</h1>
        <p className="text-gray-600 mt-2">Browse and sign up for volunteer shifts.</p>
        {pageError && (
          <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-700">
            {pageError}
          </div>
        )}
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Filter Shifts</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg ${selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All Shifts ({shifts.length})
            </button>
            <button
              onClick={() => setSelectedFilter('available')}
              className={`px-4 py-2 rounded-lg ${selectedFilter === 'available' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Available ({shifts.filter(s => s.currentVolunteers < s.capacity).length})
            </button>
            <button
              onClick={() => setSelectedFilter('full')}
              className={`px-4 py-2 rounded-lg ${selectedFilter === 'full' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Full ({shifts.filter(s => s.currentVolunteers >= s.capacity).length})
            </button>
          </div>
        </div>
      </div>

      {/* Shifts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredShifts.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No shifts found matching the selected filter.</p>
          </div>
        ) : (
          filteredShifts.map(shift => (
            <div key={shift.id || shift._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {shift.taskRole}
                  </h3>
                  <p className="text-gray-600 text-sm">{shift.location}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(shift.currentVolunteers, shift.capacity)}`}>
                  {shift.currentVolunteers}/{shift.capacity} filled
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {new Date(shift.shiftDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {shift.startTime} - {shift.endTime}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {shift.location}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-2">{shift.description}</p>
                <div className="bg-blue-50 p-2 rounded">
                  <p className="text-xs text-blue-800">
                    <strong>Requirements:</strong> {shift.requirements}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Spots Available</span>
                  <span>{shift.capacity - shift.currentVolunteers} remaining</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(shift.currentVolunteers / shift.capacity) * 100}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => handleSignUp(shift.id || shift._id)}
                disabled={shift.currentVolunteers >= shift.capacity || signUpStatus[shift.id || shift._id]}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  shift.currentVolunteers >= shift.capacity
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : signUpStatus[shift.id || shift._id] === 'signing'
                    ? 'bg-yellow-600 text-white'
                    : signUpStatus[shift.id || shift._id] === 'signed'
                    ? 'bg-green-600 text-white'
                    : signUpStatus[shift.id || shift._id] === 'error'
                    ? 'bg-red-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {signUpStatus[shift.id || shift._id] === 'signing' ? 'Signing Up...' :
                 signUpStatus[shift.id || shift._id] === 'signed' ? 'Signed Up!' :
                 signUpStatus[shift.id || shift._id] === 'error' ? 'Error - Try Again' :
                 shift.currentVolunteers >= shift.capacity ? 'Full' :
                 'Sign Up'}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Volunteer Tips</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <span className="mr-2">·</span>
            <span>Arrive 15 minutes early for your shift to check in and receive instructions</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">·</span>
            <span>Wear comfortable clothing and closed-toe shoes</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">·</span>
            <span>Bring a water bottle and any necessary medications</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">·</span>
            <span>If you need to cancel, please do so at least 24 hours in advance</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AvailableShifts;

import React, { useState } from 'react';

const VolunteerHistory = () => {
  const [history] = useState([
    {
      id: 1,
      shiftDate: '2023-12-10',
      startTime: '10:00 AM',
      endTime: '2:00 PM',
      taskRole: 'Inventory Management',
      location: 'Warehouse',
      hoursWorked: 4.25,
      status: 'completed',
      supervisor: 'Sarah Johnson',
      notes: 'Excellent work organizing the canned goods section',
      skills: ['inventory_management'],
    },
    {
      id: 2,
      shiftDate: '2023-12-08',
      startTime: '1:00 PM',
      endTime: '5:00 PM',
      taskRole: 'Donation Processing',
      location: 'Main Distribution Center',
      hoursWorked: 4.17,
      status: 'completed',
      supervisor: 'Mike Chen',
      notes: 'Very efficient at sorting donations',
      skills: ['donation_processing'],
    },
    {
      id: 3,
      shiftDate: '2023-12-01',
      startTime: '2:00 PM',
      endTime: '6:00 PM',
      taskRole: 'Food Distribution',
      location: 'Main Distribution Center',
      hoursWorked: 4.0,
      status: 'completed',
      supervisor: 'Sarah Johnson',
      notes: 'Great with clients, very helpful',
      skills: ['food_distribution', 'client_services'],
    },
    {
      id: 4,
      shiftDate: '2023-11-24',
      startTime: '9:00 AM',
      endTime: '1:00 PM',
      taskRole: 'Client Services',
      location: 'Main Distribution Center',
      hoursWorked: 4.5,
      status: 'completed',
      supervisor: 'Mike Chen',
      notes: 'Handled check-in process smoothly',
      skills: ['client_services'],
    },
    {
      id: 5,
      shiftDate: '2023-11-17',
      startTime: '3:00 PM',
      endTime: '7:00 PM',
      taskRole: 'General Support',
      location: 'Main Distribution Center',
      hoursWorked: 4.0,
      status: 'completed',
      supervisor: 'Sarah Johnson',
      notes: 'Flexible and helped with multiple tasks',
      skills: ['food_distribution', 'inventory_management'],
    },
  ]);

  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('all');

  const months = ['all', ...Array.from(new Set(history.map(h => 
    new Date(h.shiftDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  )))];

  const skills = ['all', ...Array.from(new Set(history.flatMap(h => h.skills)))];

  const filteredHistory = history.filter(record => {
    const monthMatch = selectedMonth === 'all' || 
      new Date(record.shiftDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) === selectedMonth;
    
    const skillMatch = selectedSkill === 'all' || record.skills.includes(selectedSkill);
    
    return monthMatch && skillMatch;
  });

  const totalHours = filteredHistory.reduce((sum, record) => sum + record.hoursWorked, 0);
  const averageHours = filteredHistory.length > 0 ? totalHours / filteredHistory.length : 0;
  const skillCounts = {};
  filteredHistory.forEach(record => {
    record.skills.forEach(skill => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Volunteer History</h1>
        <p className="text-gray-600 mt-2">Review your volunteer work history and achievements.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Shifts</h3>
          <div className="text-3xl font-bold text-blue-600">{filteredHistory.length}</div>
          <p className="text-sm text-gray-600 mt-2">Completed</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Hours</h3>
          <div className="text-3xl font-bold text-green-600">{totalHours.toFixed(1)}</div>
          <p className="text-sm text-gray-600 mt-2">Volunteered</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Hours</h3>
          <div className="text-3xl font-bold text-purple-600">{averageHours.toFixed(1)}</div>
          <p className="text-sm text-gray-600 mt-2">Per shift</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills Used</h3>
          <div className="text-3xl font-bold text-orange-600">{Object.keys(skillCounts).length}</div>
          <p className="text-sm text-gray-600 mt-2">Different skills</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {months.map(month => (
                <option key={month} value={month}>
                  {month === 'all' ? 'All Months' : month}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Skill
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {skills.map(skill => (
                <option key={skill} value={skill}>
                  {skill === 'all' ? 'All Skills' : skill.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(skillCounts).map(([skill, count]) => (
            <div key={skill} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{count}</div>
              <div className="text-sm text-gray-600">
                {skill.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Shift History</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shift Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supervisor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    No volunteer history found matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredHistory.map(record => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(record.shiftDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.startTime} - {record.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.taskRole}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.hoursWorked}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.supervisor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex flex-wrap gap-1">
                        {record.skills.map(skill => (
                          <span key={skill} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                            {skill.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs truncate" title={record.notes}>
                        {record.notes}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Download Options */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Download History</h3>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Download as PDF
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Download as Excel
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Email History
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerHistory;

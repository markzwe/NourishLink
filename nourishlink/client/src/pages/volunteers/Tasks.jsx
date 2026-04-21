import React, { useState } from 'react';

const Tasks = () => {
  const [tasks] = useState([
    {
      id: 1,
      title: 'Restock canned goods shelf',
      description: 'Move canned goods from storage to main distribution area',
      priority: 'high',
      assignedShift: '2023-12-15 2:00 PM',
      status: 'pending',
      estimatedTime: '45 minutes',
      location: 'Warehouse A',
      assignedBy: 'Sarah Johnson',
    },
    {
      id: 2,
      title: 'Assist clients with bagging',
      description: 'Help clients bag their selected food items',
      priority: 'medium',
      assignedShift: '2023-12-15 2:00 PM',
      status: 'in_progress',
      estimatedTime: '2 hours',
      location: 'Main Distribution',
      assignedBy: 'Mike Chen',
    },
    {
      id: 3,
      title: 'Clean donation sorting area',
      description: 'Clean and organize the donation processing area',
      priority: 'low',
      assignedShift: '2023-12-10 10:00 AM',
      status: 'completed',
      estimatedTime: '30 minutes',
      location: 'Warehouse B',
      assignedBy: 'Sarah Johnson',
    },
    {
      id: 4,
      title: 'Set up client check-in station',
      description: 'Prepare check-in area for afternoon shift',
      priority: 'high',
      assignedShift: '2023-12-20 9:00 AM',
      status: 'pending',
      estimatedTime: '20 minutes',
      location: 'Main Distribution',
      assignedBy: 'Mike Chen',
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [actionStatus, setActionStatus] = useState({});

  const handleStartTask = async (taskId) => {
    setActionStatus(prev => ({ ...prev, [taskId]: 'starting' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActionStatus(prev => ({ ...prev, [taskId]: 'started' }));
      
      // Update task status in local state
      const taskIndex = tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex].status = 'in_progress';
      }
      
      setTimeout(() => setActionStatus(prev => ({ ...prev, [taskId]: null })), 2000);
    } catch (error) {
      console.error('Start task error:', error);
      setActionStatus(prev => ({ ...prev, [taskId]: 'error' }));
    }
  };

  const handleCompleteTask = async (taskId) => {
    setActionStatus(prev => ({ ...prev, [taskId]: 'completing' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActionStatus(prev => ({ ...prev, [taskId]: 'completed' }));
      
      // Update task status in local state
      const taskIndex = tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex].status = 'completed';
      }
      
      setTimeout(() => setActionStatus(prev => ({ ...prev, [taskId]: null })), 2000);
    } catch (error) {
      console.error('Complete task error:', error);
      setActionStatus(prev => ({ ...prev, [taskId]: 'error' }));
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (selectedFilter === 'all') return true;
    return task.status === selectedFilter;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-gray-600 bg-gray-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-600 mt-2">View and manage your assigned volunteer tasks.</p>
      </div>

      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Tasks</h3>
          <div className="text-3xl font-bold text-blue-600">{tasks.length}</div>
          <p className="text-sm text-gray-600 mt-2">Assigned</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending</h3>
          <div className="text-3xl font-bold text-gray-600">{tasks.filter(t => t.status === 'pending').length}</div>
          <p className="text-sm text-gray-600 mt-2">To start</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">In Progress</h3>
          <div className="text-3xl font-bold text-yellow-600">{tasks.filter(t => t.status === 'in_progress').length}</div>
          <p className="text-sm text-gray-600 mt-2">Active</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed</h3>
          <div className="text-3xl font-bold text-green-600">{tasks.filter(t => t.status === 'completed').length}</div>
          <p className="text-sm text-gray-600 mt-2">Done</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Filter Tasks</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg ${selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All ({tasks.length})
            </button>
            <button
              onClick={() => setSelectedFilter('pending')}
              className={`px-4 py-2 rounded-lg ${selectedFilter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Pending ({tasks.filter(t => t.status === 'pending').length})
            </button>
            <button
              onClick={() => setSelectedFilter('in_progress')}
              className={`px-4 py-2 rounded-lg ${selectedFilter === 'in_progress' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              In Progress ({tasks.filter(t => t.status === 'in_progress').length})
            </button>
            <button
              onClick={() => setSelectedFilter('completed')}
              className={`px-4 py-2 rounded-lg ${selectedFilter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Completed ({tasks.filter(t => t.status === 'completed').length})
            </button>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No tasks found matching the selected filter.</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority} priority
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{task.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-900">Assigned Shift</p>
                      <p className="text-gray-600">{task.assignedShift}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">Estimated Time</p>
                      <p className="text-gray-600">{task.estimatedTime}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">{task.location}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm">
                    <p className="font-medium text-gray-900">Assigned by</p>
                    <p className="text-gray-600">{task.assignedBy}</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                {task.status === 'pending' && (
                  <button
                    onClick={() => handleStartTask(task.id)}
                    disabled={actionStatus[task.id]}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {actionStatus[task.id] === 'starting' ? 'Starting...' : 
                     actionStatus[task.id] === 'started' ? 'Started!' :
                     actionStatus[task.id] === 'error' ? 'Error' :
                     'Start Task'}
                  </button>
                )}
                
                {task.status === 'in_progress' && (
                  <button
                    onClick={() => handleCompleteTask(task.id)}
                    disabled={actionStatus[task.id]}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {actionStatus[task.id] === 'completing' ? 'Completing...' : 
                     actionStatus[task.id] === 'completed' ? 'Completed!' :
                     actionStatus[task.id] === 'error' ? 'Error' :
                     'Mark Complete'}
                  </button>
                )}
                
                {task.status === 'completed' && (
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Task Guidelines</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <span className="mr-2">·</span>
            <span>Start tasks only when you're ready to work on them during your assigned shift</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">·</span>
            <span>If you need help with a task, ask your shift supervisor or staff member</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">·</span>
            <span>Mark tasks as complete only when you've finished all requirements</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">·</span>
            <span>High priority tasks should be completed first when possible</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tasks;

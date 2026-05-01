import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ isMobile, sidebarOpen, onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const userRole = user?.role;
  const userName = user ? `${user.firstName} ${user.lastName}` : null;

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            {userRole && isMobile && (
              <button
                onClick={onToggleSidebar}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
                aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              >
                <span className="material-icons">
                  {sidebarOpen ? 'close' : 'menu'}
                </span>
              </button>
            )}

            <Link to="/" className="text-2xl font-bold text-blue-600">
              NourishLink
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {!userRole && (
              <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
            )}
            {!userRole && (
              <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Get Started
              </Link>
            )}
          </nav>

          {userRole && (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {userName}</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{userRole}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-700 hover:text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

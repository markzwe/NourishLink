import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ userRole, isOpen, isMobile, onClose }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  const clientLinks = [
    { path: '/client/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/client/register', label: 'Registration', icon: 'person_add' },
    { path: '/client/upload-documents', label: 'Upload Documents', icon: 'upload_file' },
    { path: '/client/appointments', label: 'My Appointments', icon: 'calendar_today' },
    { path: '/client/profile', label: 'Update Profile', icon: 'edit' },
  ];

  const donorLinks = [
    { path: '/donor/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/donor/log-donation', label: 'Log Donation', icon: 'volunteer_activism' },
    { path: '/donor/history', label: 'Donation History', icon: 'history' },
    { path: '/donor/schedule-dropoff', label: 'Schedule Drop-off', icon: 'schedule' },
    { path: '/donor/receipts', label: 'Receipts', icon: 'receipt' },
    { path: '/donor/contact', label: 'Contact Staff', icon: 'contact_mail' },
  ];

  const volunteerLinks = [
    { path: '/volunteer/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/volunteer/shifts', label: 'Available Shifts', icon: 'schedule' },
    { path: '/volunteer/my-shifts', label: 'My Shifts', icon: 'event_available' },
    { path: '/volunteer/tasks', label: 'Tasks', icon: 'assignment' },
    { path: '/volunteer/history', label: 'Volunteer History', icon: 'history' },
  ];

  const staffLinks = [
    { path: '/staff/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/staff/applications', label: 'Pending Applications', icon: 'pending_actions' },
    { path: '/staff/inventory/categories', label: 'Inventory Categories', icon: 'category' },
    { path: '/staff/inventory/audit', label: 'Inventory Audit', icon: 'fact_check' },
    { path: '/staff/donations', label: 'Incoming Donations', icon: 'inventory' },
    { path: '/staff/volunteers', label: 'Volunteer Assignments', icon: 'people' },
    { path: '/staff/reports', label: 'Reports Center', icon: 'assessment' },
  ];

  const getLinks = () => {
    switch (userRole) {
      case 'client':
        return clientLinks;
      case 'donor':
        return donorLinks;
      case 'volunteer':
        return volunteerLinks;
      case 'staff':
        return staffLinks;
      default:
        return [];
    }
  };

  const links = getLinks();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sidebarTransform = isMobile
    ? isOpen
      ? 'translate-x-0'
      : '-translate-x-full'
    : 'translate-y-0';

  return (
    <aside
      className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 overflow-y-auto bg-white transition-transform duration-300 ease-in-out ${sidebarTransform} ${isScrolled ? 'shadow-xl bg-white/95' : 'shadow-md'}`}
    >
      <nav className="mt-8">
        <div className="px-4 space-y-2 pb-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => {
                if (isMobile && onClose) {
                  onClose();
                }
              }}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive(link.path)
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <span className="material-icons mr-3 text-lg align-middle">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

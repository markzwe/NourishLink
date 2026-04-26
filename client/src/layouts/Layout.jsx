import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        {userRole && <Sidebar userRole={userRole} />}
        <main className={`flex-1 ${userRole ? 'ml-64' : ''}`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

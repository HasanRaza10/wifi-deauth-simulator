import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import TopBar from './TopBar';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  
  // Simple auth check - in a real app, this would be more sophisticated
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

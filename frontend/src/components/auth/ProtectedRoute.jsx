import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // If still checking authentication status, show a loading indicator
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-purple-600 border-t-transparent animate-spin mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // In UI-only mode, we always render the protected content
  // since we're always "authenticated" with mock data
  return children;
};

export default ProtectedRoute;
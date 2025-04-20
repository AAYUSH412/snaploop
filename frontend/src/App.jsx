import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

// Layout
import AppLayout from './components/layout/AppLayout';

// Pages
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import SettingsPage from './pages/SettingsPage';
import ExplorePage from './pages/ExplorePage';
import VideoFeedPage from './pages/VideoFeedPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Auth
import ProtectedRoute from './components/auth/ProtectedRoute';

// Create router with nested routes
const router = createBrowserRouter([
  // Auth routes (outside main layout)
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  // Main app routes (with AppLayout)
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> }, // Home page accessible to everyone
      { path: 'explore', element: <ExplorePage /> }, // Explore page accessible to everyone
      // Protected routes
      { 
        path: 'upload', 
        element: <ProtectedRoute><UploadPage /></ProtectedRoute> 
      },
      { 
        path: 'profile', 
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute> 
      },
      { 
        path: 'edit-profile', 
        element: <ProtectedRoute><EditProfilePage /></ProtectedRoute> 
      },
      { 
        path: 'settings', 
        element: <ProtectedRoute><SettingsPage /></ProtectedRoute> 
      },
      {
        path: 'feed',
        element: <ProtectedRoute><VideoFeedPage /></ProtectedRoute>
      },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
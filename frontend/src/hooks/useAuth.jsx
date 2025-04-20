import { useState, createContext, useContext } from 'react';

// Create auth context
const AuthContext = createContext(null);

// Mock user data to simulate a logged-in user
const mockUser = {
  id: 'user123',
  username: '@aayushv',
  displayName: 'Aayush Vaghela',
  email: 'aayush@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?u=u1',
  avatarInitial: 'A',
  isPro: true
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(mockUser); // Default to mock user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock login function - Just UI, no actual authentication
  const login = async (credentials) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Always succeed and "login" as the mock user
      setCurrentUser(mockUser);
      setError(null);
      return mockUser;
    } catch (err) {
      setError('Login functionality disabled in UI-only mode');
      throw new Error('Login functionality disabled in UI-only mode');
    } finally {
      setLoading(false);
    }
  };

  // Mock register function - Just UI, no actual registration
  const register = async (userData) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Always succeed and "register" as the mock user
      setCurrentUser({
        ...mockUser,
        displayName: userData.displayName,
        username: userData.username,
        email: userData.email
      });
      setError(null);
      return mockUser;
    } catch (err) {
      setError('Registration functionality disabled in UI-only mode');
      throw new Error('Registration functionality disabled in UI-only mode');
    } finally {
      setLoading(false);
    }
  };

  // Mock logout function - Just UI
  const logout = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // "Logout" by setting to null, but we'll set it back to mock user
      // after a brief delay to simulate the UI flow
      setCurrentUser(null);
      
      // Reset to mock user after a short delay to maintain UI showcase
      setTimeout(() => {
        setCurrentUser(mockUser);
      }, 2000);
    } catch (err) {
      setError('Logout functionality disabled in UI-only mode');
    } finally {
      setLoading(false);
    }
  };

  // Mock profile update function
  const updateProfile = async (userData) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Update mock user with new data
      const updatedUser = {
        ...mockUser,
        ...userData
      };
      
      setCurrentUser(updatedUser);
      setError(null);
      return updatedUser;
    } catch (err) {
      setError('Profile update functionality disabled in UI-only mode');
      throw new Error('Profile update functionality disabled in UI-only mode');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
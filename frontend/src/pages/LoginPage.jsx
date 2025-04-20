import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, LogIn, AlertCircle, UserPlus, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error: authError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isNewUser, setIsNewUser] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Check for redirect message (e.g., from protected routes)
  useEffect(() => {
    const message = location.state?.message;
    if (message) {
      setFormError(message);
    }
  }, [location]);
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear field error when user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear form error and new user state when user types
    if (formError) setFormError('');
    if (isNewUser) setIsNewUser(false);
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setIsNewUser(false);
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Call our mock login function that will always succeed
      await login({
        email: formData.email.trim(),
        password: formData.password,
        rememberMe
      });
      
      // Redirect to home page or intended route after successful login
      const intendedPath = location.state?.from || '/';
      navigate(intendedPath);
    } catch (err) {
      // In UI-only mode, this won't happen, but keeping this for visual completeness
      setFormError('UI-only mode: Login functionality is disabled, but the UI flow is preserved.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0A0A0A]">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>
      
      <motion.div 
        className="w-full max-w-md"
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        {/* Logo and Title */}
        <motion.div 
          className="flex flex-col items-center mb-8"
          variants={itemVariants}
        >
          <motion.div 
            className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4 shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/logo.png" alt="SnapLoop Logo" className="w-15 h-15 object-contain border rounded-4xl" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 text-center mt-2">
            Sign in to continue to SnapLoop
          </p>
        </motion.div>
        
        {/* Error Message */}
        {(formError || (authError && !Object.values(fieldErrors).filter(Boolean).length)) && (
          <motion.div 
            className={`${isNewUser ? 'bg-blue-500/20 border-blue-500/50' : 'bg-red-500/20 border-red-500/50'} rounded-lg p-4 mb-6 flex items-start border`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className={`${isNewUser ? 'text-blue-400' : 'text-red-400'} mr-3 flex-shrink-0 mt-0.5`} size={18} />
            <p className={`${isNewUser ? 'text-blue-400' : 'text-red-400'} text-sm flex-1`}>{formError || authError}</p>
            
            {isNewUser && (
              <motion.button
                onClick={() => navigate('/register')}
                className="flex items-center text-sm text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md ml-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserPlus size={14} className="mr-1" />
                Sign Up
              </motion.button>
            )}
          </motion.div>
        )}
        
        {/* Login Form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="bg-[#121212] rounded-2xl p-6 shadow-xl border border-gray-800/50 backdrop-blur-sm"
          variants={itemVariants}
        >
          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border ${
                  fieldErrors.email ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="your@email.com"
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
              )}
            </div>
            
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-white font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 border ${
                    fieldErrors.password ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="••••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
              )}
            </div>
            
            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  id="remember" 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded bg-gray-800"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                Forgot password?
              </Link>
            </div>
            
            {/* Submit Button */}
            <motion.button
              type="submit"
              className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all transform hover:-translate-y-0.5 ${
                isLoading ? 'bg-purple-700' : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600'
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <LogIn size={20} className="mr-2" />
                  Sign In
                </>
              )}
            </motion.button>
          </div>
          
          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium">
                Sign Up
              </Link>
            </p>
          </div>

          {isNewUser && (
            <motion.div
              className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex-1">
                <h3 className="text-blue-400 font-medium mb-1">New to SnapLoop?</h3>
                <p className="text-sm text-gray-300">Create an account to start sharing your creative content.</p>
              </div>
              <motion.button
                onClick={() => navigate('/register')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center whitespace-nowrap ml-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up <ArrowRight size={16} className="ml-1" />
              </motion.button>
            </motion.div>
          )}
        </motion.form>
        
        {/* Footer */}
        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SnapLoop. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
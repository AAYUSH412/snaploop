import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, error } = useAuth();
  
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [step, setStep] = useState(1); // Step 1: Basic info, Step 2: Password
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
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
  
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear specific field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: '' 
      }));
    }
    
    if (name === 'username') {
      // Remove @ if user types it and any spaces
      const formattedValue = value.replace('@', '').replace(/\s/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear form error when user starts typing
    if (formError) setFormError('');
    if (termsError && name === 'acceptTerms') setTermsError(false);
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    // Username should be 3-20 characters, alphanumeric, underscores allowed
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };
  
  const validateFirstStep = () => {
    const errors = {};
    
    if (!formData.displayName.trim()) {
      errors.displayName = 'Display name is required';
    } else if (formData.displayName.trim().length < 2) {
      errors.displayName = 'Display name must be at least 2 characters';
    }
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (!validateUsername(formData.username.trim())) {
      errors.username = 'Username must be 3-20 characters, only letters, numbers, and underscores allowed';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    setFieldErrors(errors);
    
    return Object.keys(errors).length === 0;
  };
  
  const handleNextStep = (e) => {
    e.preventDefault();
    setFormError('');
    // Skip validation and directly proceed to step 2
    setStep(2);
  };
  
  const handlePreviousStep = () => {
    setStep(1);
    setFieldErrors({});
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFieldErrors({});
    
    // Check terms acceptance
    if (!acceptedTerms) {
      setTermsError(true);
      return;
    }
    
    // Password validation
    const errors = {};
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Format username
      const formattedUsername = formData.username.trim();
      
      // Call our mock register function
      await register({
        displayName: formData.displayName.trim(),
        username: formattedUsername,
        email: formData.email.trim(),
        password: formData.password
      });
      
      setSubmitSuccess(true);
      
      // Show success message briefly before redirecting
      setTimeout(() => {
        navigate('/'); // Redirect to home page after successful registration
      }, 1500);
    } catch (err) {
      // In UI-only mode, this won't happen, but we'll keep it for visual completeness
      setFormError('UI-only mode: Registration functionality is disabled, but the UI flow is preserved.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Password strength indicator
  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return { strength: 0, text: '', color: 'bg-gray-700' };
    
    if (password.length < 6) {
      return { strength: 25, text: 'Weak', color: 'bg-red-500' };
    }
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    if (strength <= 25) {
      return { strength, text: 'Weak', color: 'bg-red-500' };
    } else if (strength <= 50) {
      return { strength, text: 'Fair', color: 'bg-yellow-500' };
    } else if (strength <= 75) {
      return { strength, text: 'Good', color: 'bg-blue-500' };
    } else {
      return { strength, text: 'Strong', color: 'bg-green-500' };
    }
  };
  
  const passwordStrength = getPasswordStrength();
  
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#0A0A0A]">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>
      
      {submitSuccess ? (
        <motion.div 
          className="w-full max-w-md bg-[#121212] rounded-2xl p-8 shadow-xl border border-gray-800/50 backdrop-blur-sm text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-6 mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <img src="/logo.png" alt="SnapLoop Logo" className="w-15 h-15 object-contain border rounded-4xl" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-4">Registration Successful!</h2>
          <p className="text-gray-300 mb-6">
            Your account has been created successfully. Redirecting you to the home page...
          </p>
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      ) : (
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
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-gray-400 text-center mt-2">
              Join the SnapLoop community
            </p>
          </motion.div>
          
          {/* Step Indicator */}
          <motion.div 
            className="flex justify-center mb-6"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 1 ? 'bg-gradient-to-r from-purple-600 to-blue-500' : 'bg-purple-600'} text-white`}>
                1
              </div>
              <div className={`w-10 h-1 ${step === 1 ? 'bg-gray-700' : 'bg-gradient-to-r from-purple-600 to-blue-500'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 2 ? 'bg-gradient-to-r from-purple-600 to-blue-500' : 'bg-gray-700'} text-white`}>
                2
              </div>
            </div>
          </motion.div>
          
          {/* Error Message */}
          {(formError || (error && !Object.values(fieldErrors).filter(Boolean).length)) && (
            <motion.div 
              className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="text-red-400 mr-3 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-red-400 text-sm">{formError || error}</p>
            </motion.div>
          )}
          
          {/* Registration Form */}
          <motion.div 
            className="bg-[#121212] rounded-2xl p-6 shadow-xl border border-gray-800/50 backdrop-blur-sm"
            variants={itemVariants}
          >
            <form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
              {step === 1 ? (
                <motion.div 
                  className="space-y-5"
                  initial={{ x: -500, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 500, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {/* Display Name Field */}
                  <div>
                    <label htmlFor="displayName" className="block text-white font-medium mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className={`w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border ${
                        fieldErrors.displayName ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="John Doe"
                    />
                    {fieldErrors.displayName && (
                      <p className="text-red-400 text-sm mt-1">{fieldErrors.displayName}</p>
                    )}
                  </div>
                  
                  {/* Username Field */}
                  <div>
                    <label htmlFor="username" className="block text-white font-medium mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-400">@</span>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`w-full bg-[#1A1A1A] text-white rounded-lg px-4 pl-8 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border ${
                          fieldErrors.username ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="username"
                      />
                    </div>
                    {fieldErrors.username && (
                      <p className="text-red-400 text-sm mt-1">{fieldErrors.username}</p>
                    )}
                  </div>
                  
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
                      <p className="text-red-400 text-sm mt-1">{fieldErrors.email}</p>
                    )}
                  </div>
                  
                  {/* Next Button */}
                  <motion.button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all transform hover:-translate-y-0.5"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Continue
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div 
                  className="space-y-5"
                  initial={{ x: 500, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -500, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
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
                    
                    {fieldErrors.password ? (
                      <p className="text-red-400 text-sm mt-1">{fieldErrors.password}</p>
                    ) : (
                      /* Password strength meter */
                      formData.password && (
                        <div className="mt-2">
                          <div className="flex justify-between items-center mb-1">
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${passwordStrength.color}`} 
                                style={{ width: `${passwordStrength.strength}%` }}
                              ></div>
                            </div>
                            <span className="ml-3 text-xs text-gray-400">{passwordStrength.text}</span>
                          </div>
                          <p className="text-gray-500 text-xs mt-1">Use at least 8 characters, including uppercase, digits & symbols</p>
                        </div>
                      )
                    )}
                  </div>
                  
                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-white font-medium mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 border ${
                          fieldErrors.confirmPassword ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="••••••••••"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    
                    {fieldErrors.confirmPassword ? (
                      <p className="text-red-400 text-sm mt-1">{fieldErrors.confirmPassword}</p>
                    ) : (
                      /* Password match indicator */
                      formData.confirmPassword && (
                        <div className="flex items-center mt-2">
                          {formData.password === formData.confirmPassword ? (
                            <>
                              <CheckCircle size={16} className="text-green-500 mr-2" />
                              <span className="text-green-500 text-xs">Passwords match</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle size={16} className="text-red-500 mr-2" />
                              <span className="text-red-500 text-xs">Passwords do not match</span>
                            </>
                          )}
                        </div>
                      )
                    )}
                  </div>
                  
                  {/* Terms and Conditions */}
                  <div className="flex items-start">
                    <input 
                      id="terms" 
                      type="checkbox" 
                      className={`h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded bg-gray-800 mt-1 ${
                        termsError ? 'ring-2 ring-red-500' : ''
                      }`}
                      checked={acceptedTerms}
                      onChange={() => setAcceptedTerms(!acceptedTerms)}
                    />
                    <label 
                      htmlFor="terms" 
                      className={`ml-2 block text-sm ${termsError ? 'text-red-400' : 'text-gray-300'}`}
                    >
                      I agree to the <Link to="/terms" className="text-purple-400 hover:text-purple-300">Terms of Service</Link> and <Link to="/privacy" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>
                    </label>
                  </div>
                  {termsError && (
                    <div className="flex items-center text-red-400 text-xs">
                      <AlertTriangle size={14} className="mr-1" />
                      <span>You must accept the terms and conditions</span>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      type="button"
                      onClick={handlePreviousStep}
                      className="w-1/3 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      Back
                    </motion.button>
                    
                    <motion.button
                      type="submit"
                      className={`w-2/3 flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all transform hover:-translate-y-0.5 ${
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
                          <UserPlus size={20} className="mr-2" />
                          Create Account
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </form>
            
            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center"
            variants={itemVariants}
          >
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} SnapLoop. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default RegisterPage;
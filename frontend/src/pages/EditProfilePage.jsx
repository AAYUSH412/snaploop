import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Check, X } from 'lucide-react';
import { userData } from '../mock';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: userData.displayName,
    username: userData.username,
    bio: userData.bio,
    website: userData.website,
    location: userData.location
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file uploads
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'avatar') {
        setAvatar(URL.createObjectURL(file));
      } else {
        setCoverImage(URL.createObjectURL(file));
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!formData.displayName.trim()) newErrors.displayName = 'Display name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // TODO: Implement API call to update profile
    console.log('Profile updated', formData);
    
    // Navigate back to profile
    navigate('/profile');
  };

  return (
    <div className="pb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <motion.button
            onClick={() => navigate('/profile')}
            className="mr-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={18} className="text-white" />
          </motion.button>
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
        </div>
        
        <motion.button
          onClick={handleSubmit}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Check size={18} />
          <span>Save Changes</span>
        </motion.button>
      </div>
      
      <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl overflow-hidden shadow-lg mb-8">
        {/* Cover Image Section */}
        <div className="h-40 bg-gradient-to-r from-purple-600/50 to-blue-500/50 relative">
          {coverImage && (
            <img 
              src={coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover" 
            />
          )}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <label className="cursor-pointer p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'cover')}
              />
              <Camera size={24} className="text-white" />
            </label>
          </div>
        </div>
        
        {/* Avatar Edit Section */}
        <div className="px-6 py-5 relative">
          <div className="absolute -top-12 left-6 w-24 h-24 rounded-full bg-[#121212] p-1 group">
            <div className="relative w-full h-full overflow-hidden">
              {avatar ? (
                <img 
                  src={avatar} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full object-cover" 
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {userData.displayName.charAt(0)}
                  </span>
                </div>
              )}
              
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'avatar')}
                />
                <Camera size={20} className="text-white" />
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="bg-[#121212] rounded-2xl p-6 shadow-lg space-y-6">
          {/* Display Name */}
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
                errors.displayName ? 'border-red-500' : 'border-gray-700'
              }`}
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>
            )}
          </div>
          
          {/* Username */}
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
                value={formData.username.replace('@', '')}
                onChange={handleChange}
                className={`w-full bg-[#1A1A1A] text-white rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border ${
                  errors.username ? 'border-red-500' : 'border-gray-700'
                }`}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          
          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-white font-medium mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700 min-h-24 resize-none"
              placeholder="Tell the world about yourself"
              maxLength={160}
            />
            <div className="flex justify-end mt-1">
              <span className="text-gray-500 text-sm">{formData.bio.length}/160</span>
            </div>
          </div>
          
          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-white font-medium mb-2">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
              placeholder="https://example.com"
            />
          </div>
          
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-white font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
              placeholder="City, Country"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
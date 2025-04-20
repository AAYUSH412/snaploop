import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Shield, Bell, Moon, Monitor, Lock, Eye, 
  HardDrive, LogOut, Save, Trash2, Globe, User
} from 'lucide-react';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');

  // Settings states
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [dataDownloaded, setDataDownloaded] = useState(false);

  // Handle settings save
  const handleSave = () => {
    // TODO: Implement API call to save settings
    console.log('Settings saved');
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
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>
        
        <motion.button
          onClick={handleSave}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Save size={18} />
          <span>Save Changes</span>
        </motion.button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-[#121212] rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'account' 
                  ? 'bg-purple-500/10 text-purple-400' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <User size={18} />
              <span>Account</span>
            </button>
            
            <button
              onClick={() => setActiveTab('privacy')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'privacy' 
                  ? 'bg-purple-500/10 text-purple-400' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Shield size={18} />
              <span>Privacy & Security</span>
            </button>
            
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'notifications' 
                  ? 'bg-purple-500/10 text-purple-400' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Bell size={18} />
              <span>Notifications</span>
            </button>
            
            <button
              onClick={() => setActiveTab('appearance')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'appearance' 
                  ? 'bg-purple-500/10 text-purple-400' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Monitor size={18} />
              <span>Appearance</span>
            </button>
            
            <button
              onClick={() => setActiveTab('data')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'data' 
                  ? 'bg-purple-500/10 text-purple-400' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <HardDrive size={18} />
              <span>Your Data</span>
            </button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 flex items-center justify-center space-x-2 py-3 px-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </motion.button>
        </div>
        
        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-[#121212] rounded-2xl p-6 shadow-lg">
            {activeTab === 'account' && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold text-white mb-4">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value="user@example.com"
                      readOnly
                      className="w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 focus:outline-none border border-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Change Password</label>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                      Update Password
                    </button>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-800">
                    <h3 className="text-white font-medium mb-2">Deactivate Account</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Temporarily disable your account. You can reactivate it anytime.
                    </p>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                      Deactivate Account
                    </button>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-800">
                    <h3 className="text-red-400 font-medium mb-2">Delete Account</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Permanently delete your account and all your data. This action cannot be undone.
                    </p>
                    <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors flex items-center space-x-2">
                      <Trash2 size={16} />
                      <span>Delete Account</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'privacy' && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold text-white mb-4">Privacy & Security</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Private Account</h3>
                      <p className="text-gray-400 text-sm">
                        When enabled, only approved followers can see your content.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={privateAccount}
                        onChange={() => setPrivateAccount(!privateAccount)}
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div>
                      <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                      <p className="text-gray-400 text-sm">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={twoFactorAuth}
                        onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-800">
                    <h3 className="text-white font-medium mb-2">Account Privacy</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="public" name="privacy" className="text-purple-600 focus:ring-purple-500" />
                        <label htmlFor="public" className="text-white">
                          <div className="font-medium">Public</div>
                          <div className="text-gray-400 text-sm">Anyone can view your profile</div>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="private" name="privacy" className="text-purple-600 focus:ring-purple-500" />
                        <label htmlFor="private" className="text-white">
                          <div className="font-medium">Private</div>
                          <div className="text-gray-400 text-sm">Only approved followers can view</div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-800">
                    <h3 className="text-white font-medium mb-2">Login Activity</h3>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2">
                      <Eye size={16} />
                      <span>View Login Activity</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold text-white mb-4">Notification Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Push Notifications</h3>
                      <p className="text-gray-400 text-sm">
                        Receive notifications when you're not using the app.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationsEnabled}
                        onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-800">
                    <h3 className="text-white font-medium mb-3">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">New followers</span>
                        <input type="checkbox" className="toggle toggle-sm toggle-purple" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Likes on your content</span>
                        <input type="checkbox" className="toggle toggle-sm toggle-purple" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Comments on your content</span>
                        <input type="checkbox" className="toggle toggle-sm toggle-purple" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">New features and updates</span>
                        <input type="checkbox" className="toggle toggle-sm toggle-purple" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'appearance' && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold text-white mb-4">Appearance Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Dark Mode</h3>
                      <p className="text-gray-400 text-sm">
                        Use dark theme for SnapLoop interface.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div>
                      <h3 className="text-white font-medium">Auto-play Videos</h3>
                      <p className="text-gray-400 text-sm">
                        Videos will play automatically when scrolling.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={autoplay}
                        onChange={() => setAutoplay(!autoplay)}
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-800">
                    <h3 className="text-white font-medium mb-3">Language</h3>
                    <select className="w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 focus:outline-none border border-gray-700">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese (Simplified)</option>
                      <option>Japanese</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'data' && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold text-white mb-4">Your Data</h2>
                
                <div className="space-y-6">
                  <div className="pt-2">
                    <h3 className="text-white font-medium mb-2">Download Your Data</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Get a copy of all your SnapLoop data, including videos, comments, and account information.
                    </p>
                    <button 
                      className={`px-4 py-2 ${
                        dataDownloaded ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 hover:bg-gray-600 text-white'
                      } rounded-lg transition-colors flex items-center space-x-2`}
                      onClick={() => setDataDownloaded(true)}
                    >
                      <HardDrive size={16} />
                      <span>{dataDownloaded ? 'Download Ready' : 'Request Download'}</span>
                    </button>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-800">
                    <h3 className="text-white font-medium mb-2">Data Sharing</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Control how your data is used and shared.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Share usage data to improve SnapLoop</span>
                        <input type="checkbox" className="toggle toggle-sm toggle-purple" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Personalized ads</span>
                        <input type="checkbox" className="toggle toggle-sm toggle-purple" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
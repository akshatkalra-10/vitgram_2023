import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Shield, Bell, Moon, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function Settings() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-dark min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-dark p-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-600 dark:text-dark-secondary"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold dark:text-dark">Settings</h1>
      </div>
      
      {/* Settings list */}
      <div className="divide-y divide-gray-200 dark:divide-dark">
        <Link
          to="/edit-profile"
          className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-dark-surface"
        >
          <div className="flex items-center">
            <User className="w-5 h-5 text-gray-600 dark:text-dark-secondary mr-3" />
            <span className="dark:text-dark">Edit Profile</span>
          </div>
          <span className="text-gray-400 dark:text-dark-secondary">&gt;</span>
        </Link>
        
        <Link
          to="/privacy"
          className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-dark-surface"
        >
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-gray-600 dark:text-dark-secondary mr-3" />
            <span className="dark:text-dark">Privacy & Security</span>
          </div>
          <span className="text-gray-400 dark:text-dark-secondary">&gt;</span>
        </Link>
        
        <Link
          to="/notifications-settings"
          className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-dark-surface"
        >
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-gray-600 dark:text-dark-secondary mr-3" />
            <span className="dark:text-dark">Notifications</span>
          </div>
          <span className="text-gray-400 dark:text-dark-secondary">&gt;</span>
        </Link>
        
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-dark-surface">
          <div className="flex items-center">
            <Moon className="w-5 h-5 text-gray-600 dark:text-dark-secondary mr-3" />
            <span className="dark:text-dark">Dark Mode</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
          </label>
        </div>
        
        <Link
          to="/help-support"
          className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-dark-surface"
        >
          <div className="flex items-center">
            <HelpCircle className="w-5 h-5 text-gray-600 dark:text-dark-secondary mr-3" />
            <span className="dark:text-dark">Help & Support</span>
          </div>
          <span className="text-gray-400 dark:text-dark-secondary">&gt;</span>
        </Link>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-4 hover:bg-gray-50 dark:hover:bg-dark-surface text-left text-red-500"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Log Out</span>
        </button>
        
        <div className="p-4 text-center text-gray-500 dark:text-dark-secondary text-sm">
          <p>VITgram</p>
          <p className="mt-1">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
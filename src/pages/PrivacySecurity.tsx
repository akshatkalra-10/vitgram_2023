import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, UserMinus, Globe, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function PrivacySecurity() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    privateAccount: false,
    showActivityStatus: true,
    showReadReceipts: true,
    allowTagging: true,
    allowMentions: true,
    allowMessages: true,
    showOnlineStatus: true,
    showLastSeen: true,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-dark min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-600 dark:text-gray-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold dark:text-white">Privacy & Security</h1>
      </div>

      {/* Settings list */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Account Privacy */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">Account Privacy</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Lock className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
                <div>
                  <div className="font-medium dark:text-white">Private Account</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Only approved followers can see your posts</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.privateAccount}
                  onChange={() => handleToggle('privateAccount')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Activity Status */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">Activity Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
                <div>
                  <div className="font-medium dark:text-white">Show Activity Status</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Let others see when you're active</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.showActivityStatus}
                  onChange={() => handleToggle('showActivityStatus')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Interactions */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">Interactions</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
                <div>
                  <div className="font-medium dark:text-white">Allow Tagging</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Let others tag you in posts</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.allowTagging}
                  onChange={() => handleToggle('allowTagging')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
                <div>
                  <div className="font-medium dark:text-white">Allow Messages</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Let others send you messages</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.allowMessages}
                  onChange={() => handleToggle('allowMessages')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">Account Security</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center p-3 hover:bg-gray-50 dark:hover:bg-dark-surface rounded-lg transition-colors">
              <Shield className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
              <div className="flex-1 text-left">
                <div className="font-medium dark:text-white">Two-Factor Authentication</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</div>
              </div>
              <span className="text-gray-400 dark:text-gray-500">&gt;</span>
            </button>

            <button className="w-full flex items-center p-3 hover:bg-gray-50 dark:hover:bg-dark-surface rounded-lg transition-colors">
              <UserMinus className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
              <div className="flex-1 text-left">
                <div className="font-medium dark:text-white">Blocked Accounts</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Manage blocked accounts</div>
              </div>
              <span className="text-gray-400 dark:text-gray-500">&gt;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacySecurity; 
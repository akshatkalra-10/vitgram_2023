import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Heart, MessageCircle, UserPlus, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function NotificationsSettings() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    likes: true,
    comments: true,
    follows: true,
    messages: true,
    mentions: true,
    liveVideos: true,
    emailNotifications: true,
    pushNotifications: true,
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
        <h1 className="text-lg font-semibold dark:text-white">Notifications</h1>
      </div>

      {/* Settings list */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Push Notifications */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">Push Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
                <div>
                  <div className="font-medium dark:text-white">Push Notifications</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Receive notifications on your device</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.pushNotifications}
                  onChange={() => handleToggle('pushNotifications')}
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
                <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
                <div>
                  <div className="font-medium dark:text-white">Likes</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">When someone likes your post</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.likes}
                  onChange={() => handleToggle('likes')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
                <div>
                  <div className="font-medium dark:text-white">Comments</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">When someone comments on your post</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.comments}
                  onChange={() => handleToggle('comments')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <UserPlus className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
                <div>
                  <div className="font-medium dark:text-white">Follows</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">When someone follows you</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.follows}
                  onChange={() => handleToggle('follows')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
                <div>
                  <div className="font-medium dark:text-white">Messages</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">When someone sends you a message</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.messages}
                  onChange={() => handleToggle('messages')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Other Notifications */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">Other Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
                <div>
                  <div className="font-medium dark:text-white">Mentions</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">When someone mentions you</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.mentions}
                  onChange={() => handleToggle('mentions')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
                <div>
                  <div className="font-medium dark:text-white">Live Videos</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">When someone you follow goes live</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.liveVideos}
                  onChange={() => handleToggle('liveVideos')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsSettings; 
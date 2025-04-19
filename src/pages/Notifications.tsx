import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, UserPlus, AtSign, Tag, Loader2 } from 'lucide-react';
import { Notification, useNotificationStore } from '../store/notificationStore';
import { useTheme } from '../context/ThemeContext';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../context/AuthContext';

function Notifications() {
  const { user } = useAuth();
  const { notifications, isLoading, unreadCount, fetchNotifications, markAllAsRead } = useNotificationStore();
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  
  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };
  
  const renderNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'mention':
        return <AtSign className="w-5 h-5 text-purple-500" />;
      case 'tag':
        return <Tag className="w-5 h-5 text-orange-500" />;
      default:
        return <Heart className="w-5 h-5 text-gray-500" />;
    }
  };
  
  const renderNotificationContent = (notification: Notification) => {
    const { type, username, content } = notification;
    
    switch (type) {
      case 'like':
        return (
          <span>
            <span className="font-semibold">{username}</span> liked your post
          </span>
        );
      case 'comment':
        return (
          <span>
            <span className="font-semibold">{username}</span> commented: {content}
          </span>
        );
      case 'follow':
        return (
          <span>
            <span className="font-semibold">{username}</span> started following you
          </span>
        );
      case 'mention':
        return (
          <span>
            <span className="font-semibold">{username}</span> mentioned you in a comment: {content}
          </span>
        );
      case 'tag':
        return (
          <span>
            <span className="font-semibold">{username}</span> tagged you in a post
          </span>
        );
      default:
        return null;
    }
  };
  
  if (isLoading && notifications.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-dark min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold dark:text-white">Notifications</h1>
        
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-purple-600 font-semibold"
          >
            Mark all as read
          </button>
        )}
      </div>
      
      {/* Notification list */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
          >
            <div className="relative mr-3 flex-shrink-0">
              <img
                src={notification.userAvatar}
                alt={notification.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm dark:text-white">
                {renderNotificationContent(notification)}
              </p>
              
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
              </span>
            </div>
            
            {!notification.isRead && (
              <span className="ml-2 flex-shrink-0 bg-red-500 text-white text-xs rounded-full h-2 w-2" />
            )}
          </div>
        ))}
        
        {notifications.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No notifications yet.</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">When someone interacts with your posts, you'll see it here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
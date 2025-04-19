import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { useMessageStore } from '../store/messageStore';
import { useTheme } from '../context/ThemeContext';

function Messages() {
  const { user } = useAuth();
  const { chats, isLoading, fetchChats } = useMessageStore();
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);
  
  if (isLoading && chats.length === 0) {
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
        <h1 className="text-lg font-semibold dark:text-white">{user?.username}</h1>
        <button className="text-gray-600 dark:text-gray-300">
          <Edit className="w-5 h-5" />
        </button>
      </div>
      
      {/* Chat list */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {chats.map(chat => (
          <Link
            key={chat.id}
            to={`/messages/${chat.id}`}
            className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
          >
            <div className="relative mr-3 flex-shrink-0">
              <img
                src={chat.user.avatar}
                alt={chat.user.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              {chat.user.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-dark" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between">
                <h2 className="text-sm font-semibold truncate dark:text-white">
                  {chat.user.username}
                </h2>
                
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                  {chat.lastMessage?.formattedTime}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'font-semibold dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                  {chat.lastMessage?.senderId === user?.id 
                    ? `You: ${chat.lastMessage?.text || ''}`
                    : chat.lastMessage?.text || ''}
                </p>
                
                {chat.unreadCount > 0 && (
                  <span className="ml-2 flex-shrink-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
        
        {chats.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No messages yet.</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Start a conversation with someone!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
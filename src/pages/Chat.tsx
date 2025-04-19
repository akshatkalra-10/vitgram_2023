import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, Smile, Image, Send, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMessageStore, Message } from '../store/messageStore';
import { useTheme } from '../context/ThemeContext';

function Chat() {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { activeChat, isLoading, fetchChat, sendMessage } = useMessageStore();
  const { isDarkMode } = useTheme();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chatId) {
      fetchChat(chatId);
    }
  }, [chatId, fetchChat]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatId && newMessage.trim()) {
      sendMessage(chatId, newMessage);
      setNewMessage('');
    }
  };
  
  if (isLoading && !activeChat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-spin" />
      </div>
    );
  }
  
  if (!activeChat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Conversation not found.</p>
      </div>
    );
  }
  
  const isCurrentUserMessage = (message: Message) => message.senderId === user?.id;
  
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-dark">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => navigate('/messages')}
          className="mr-2 text-gray-600 dark:text-gray-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="flex items-center flex-1">
          <img
            src={activeChat.user.avatar}
            alt={activeChat.user.username}
            className="w-8 h-8 rounded-full object-cover mr-3"
          />
          
          <div>
            <h2 className="font-semibold dark:text-white">{activeChat.user.username}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {activeChat.user.isOnline ? 'Active now' : 'Offline'}
            </p>
          </div>
        </div>
        
        <button className="text-gray-600 dark:text-gray-300">
          <Info className="w-6 h-6" />
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-dark-surface">
        <div className="space-y-4">
          {activeChat.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${isCurrentUserMessage(message) ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl p-3 ${
                  isCurrentUserMessage(message)
                    ? 'bg-purple-500 text-white rounded-tr-none'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tl-none'
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${isCurrentUserMessage(message) ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {message.formattedTime}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 dark:border-gray-700 p-4 flex items-center bg-white dark:bg-dark">
        <button type="button" className="text-gray-500 dark:text-gray-400 mr-2">
          <Smile className="w-6 h-6" />
        </button>
        
        <input
          type="text"
          placeholder="Message..."
          className="flex-1 border-none focus:ring-0 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        
        <button type="button" className="text-gray-500 dark:text-gray-400 mx-2">
          <Image className="w-6 h-6" />
        </button>
        
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className={`text-purple-500 ${!newMessage.trim() && 'opacity-50'}`}
        >
          <Send className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
}

export default Chat;
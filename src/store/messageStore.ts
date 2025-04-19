import { create } from 'zustand';
import { formatDistanceToNow } from 'date-fns';

export interface MessageUser {
  id: string;
  username: string;
  avatar: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
  formattedTime?: string;
  isRead: boolean;
}

export interface Chat {
  id: string;
  user: MessageUser;
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

interface MessageStore {
  chats: Chat[];
  activeChat: Chat | null;
  isLoading: boolean;
  fetchChats: () => Promise<void>;
  fetchChat: (chatId: string) => Promise<void>;
  sendMessage: (chatId: string, text: string) => void;
  markChatAsRead: (chatId: string) => void;
}

// Demo users for messages
const MESSAGE_USERS: MessageUser[] = [
  {
    id: '2',
    username: 'Akshat',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    isOnline: true
  },
  {
    id: '3',
    username: 'Akash',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300',
    isOnline: false
  },
  {
    id: '4',
    username: 'Vedant',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=300',
    isOnline: true
  },
  {
    id: '5',
    username: 'Rohan',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
    isOnline: false
  }
];

// Demo chats
const DEMO_CHATS: Chat[] = [
  {
    id: 'chat1',
    user: MESSAGE_USERS[0],
    messages: [
      {
        id: 'm1',
        senderId: MESSAGE_USERS[0].id,
        text: 'Hey there!?',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        isRead: true
      },
      {
        id: 'm2',
        senderId: '1', // Current user
        text: 'Hi, How are you?',
        createdAt: new Date(Date.now() - 3300000).toISOString(),
        isRead: true
      },
      {
        id: 'm3',
        senderId: MESSAGE_USERS[0].id,
        text: 'I am fine, what about you?',
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        isRead: false
      }
    ],
    unreadCount: 1
  },
  {
    id: 'chat2',
    user: MESSAGE_USERS[1],
    messages: [
      {
        id: 'm4',
        senderId: '1', // Current user
        text: 'Hey Yash, did you see my latest post?',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        isRead: true
      },
      {
        id: 'm5',
        senderId: MESSAGE_USERS[1].id,
        text: 'Yes!',
        createdAt: new Date(Date.now() - 82800000).toISOString(),
        isRead: true
      }
    ],
    unreadCount: 0
  },
  {
    id: 'chat3',
    user: MESSAGE_USERS[2],
    messages: [
      {
        id: 'm6',
        senderId: MESSAGE_USERS[2].id,
        text: 'Are we still meeting for coffee tomorrow?',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        isRead: true
      },
      {
        id: 'm7',
        senderId: '1', // Current user
        text: 'Absolutely! 10am at the usual place?',
        createdAt: new Date(Date.now() - 169200000).toISOString(),
        isRead: true
      },
      {
        id: 'm8',
        senderId: MESSAGE_USERS[2].id,
        text: 'Perfect, see you then!',
        createdAt: new Date(Date.now() - 165600000).toISOString(),
        isRead: true
      }
    ],
    unreadCount: 0
  },
  {
    id: 'chat4',
    user: MESSAGE_USERS[3],
    messages: [
      {
        id: 'm9',
        senderId: '1', // Current user
        text: 'Hey Mike, I thought your presentation yesterday was great!',
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        isRead: true
      },
      {
        id: 'm10',
        senderId: MESSAGE_USERS[3].id,
        text: 'Thanks! I was pretty nervous but it went well.',
        createdAt: new Date(Date.now() - 255600000).toISOString(),
        isRead: true
      },
      {
        id: 'm11',
        senderId: '1', // Current user
        text: 'Not at all, you looked confident! We should collaborate on a project sometime.',
        createdAt: new Date(Date.now() - 252000000).toISOString(),
        isRead: true
      },
      {
        id: 'm12',
        senderId: MESSAGE_USERS[3].id,
        text: 'That would be awesome! Let\'s discuss it over lunch next week.',
        createdAt: new Date(Date.now() - 248400000).toISOString(),
        isRead: false
      },
      {
        id: 'm13',
        senderId: MESSAGE_USERS[3].id,
        text: 'How does Tuesday work for you?',
        createdAt: new Date(Date.now() - 244800000).toISOString(),
        isRead: false
      }
    ],
    unreadCount: 2
  }
];

// Process chats to add last message
const processChats = (chats: Chat[]): Chat[] => {
  return chats.map(chat => {
    const sortedMessages = [...chat.messages].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    const lastMessage = sortedMessages[0];
    
    return {
      ...chat,
      messages: chat.messages.map(message => ({
        ...message,
        formattedTime: formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })
      })),
      lastMessage: lastMessage ? {
        ...lastMessage,
        formattedTime: formatDistanceToNow(new Date(lastMessage.createdAt), { addSuffix: true })
      } : undefined
    };
  });
};

export const useMessageStore = create<MessageStore>((set, get) => ({
  chats: [],
  activeChat: null,
  isLoading: false,
  
  fetchChats: async () => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    set({ 
      chats: processChats(DEMO_CHATS),
      isLoading: false 
    });
  },
  
  fetchChat: async (chatId: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const chats = processChats(DEMO_CHATS);
    const chat = chats.find(c => c.id === chatId) || null;
    
    set({ 
      activeChat: chat,
      isLoading: false 
    });
    
    // Mark as read
    if (chat) {
      get().markChatAsRead(chatId);
    }
  },
  
  sendMessage: (chatId: string, text: string) => {
    const { chats, activeChat } = get();
    
    if (!text.trim()) return;
    
    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: '1', // Current user
      text,
      createdAt: new Date().toISOString(),
      formattedTime: 'just now',
      isRead: true
    };
    
    // Update chats
    const updatedChats = chats.map(chat => 
      chat.id === chatId 
        ? { ...chat, messages: [...chat.messages, newMessage], lastMessage: newMessage } 
        : chat
    );
    
    // Update active chat if it's the current one
    const updatedActiveChat = activeChat && activeChat.id === chatId 
      ? { ...activeChat, messages: [...activeChat.messages, newMessage] }
      : activeChat;
    
    set({ 
      chats: updatedChats,
      activeChat: updatedActiveChat
    });
  },
  
  markChatAsRead: (chatId: string) => {
    const { chats } = get();
    
    const updatedChats = chats.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            messages: chat.messages.map(msg => ({ ...msg, isRead: true })),
            unreadCount: 0
          } 
        : chat
    );
    
    set({ chats: updatedChats });
  }
}));
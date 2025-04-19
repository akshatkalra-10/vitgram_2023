import { create } from 'zustand';
import { formatDistanceToNow } from 'date-fns';
import { DEMO_USERS } from '../data/demoUsers';

export type NotificationType = 'like' | 'comment' | 'follow' | 'mention' | 'tag';

export interface Notification {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  type: NotificationType;
  content?: string;
  postId?: string;
  postImage?: string;
  createdAt: string;
  formattedTime?: string;
  isRead: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  isLoading: boolean;
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
}

// Demo notifications
const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    userId: DEMO_USERS['janedoe'].id,
    username: DEMO_USERS['janedoe'].username,
    userAvatar: DEMO_USERS['janedoe'].avatar,
    type: 'like',
    postId: '1',
    postImage: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    isRead: false
  },
  {
    id: 'n2',
    userId: DEMO_USERS['alexsmith'].id,
    username: DEMO_USERS['alexsmith'].username,
    userAvatar: DEMO_USERS['alexsmith'].avatar,
    type: 'comment',
    content: 'Great photo!',
    postId: '2',
    postImage: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    isRead: false
  },
  {
    id: 'n3',
    userId: DEMO_USERS['sarahparker'].id,
    username: DEMO_USERS['sarahparker'].username,
    userAvatar: DEMO_USERS['sarahparker'].avatar,
    type: 'follow',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    isRead: true
  },
  {
    id: 'n4',
    userId: DEMO_USERS['johndoe'].id,
    username: DEMO_USERS['johndoe'].username,
    userAvatar: DEMO_USERS['johndoe'].avatar,
    type: 'mention',
    content: 'Check out this amazing sunset!',
    postId: '3',
    postImage: 'https://images.pexels.com/photos/3098970/pexels-photo-3098970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    isRead: false
  }
];

// Process notifications to add formatted time
const processNotifications = (notifications: Notification[]): Notification[] => {
  return notifications.map(notification => ({
    ...notification,
    formattedTime: formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })
  }));
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  isLoading: false,
  unreadCount: 0,
  
  fetchNotifications: async () => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const processedNotifications = processNotifications(DEMO_NOTIFICATIONS);
    const unreadCount = processedNotifications.filter(n => !n.isRead).length;
    
    set({ 
      notifications: processedNotifications,
      unreadCount,
      isLoading: false 
    });
  },
  
  markAsRead: (notificationId: string) => {
    const { notifications } = get();
    
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isRead: true } 
        : notification
    );
    
    const unreadCount = updatedNotifications.filter(n => !n.isRead).length;
    
    set({ 
      notifications: updatedNotifications,
      unreadCount
    });
  },
  
  markAllAsRead: () => {
    const { notifications } = get();
    
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      isRead: true
    }));
    
    set({ 
      notifications: updatedNotifications,
      unreadCount: 0
    });
  }
}));
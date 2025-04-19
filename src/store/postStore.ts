import { create } from 'zustand';
import { formatDistanceToNow } from 'date-fns';
import { DEMO_USERS } from '../data/demoUsers';

export interface User {
  id: string;
  username: string;
  avatar: string;
  fullName?: string;
  bio?: string;
  followers?: number;
  following?: number;
  posts?: number;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  createdAt: string;
  formattedTime?: string;
}

export interface Post {
  id: string;
  user: User;
  image: string;
  caption: string;
  likes: number;
  hasLiked: boolean;
  comments: Comment[];
  createdAt: string;
  formattedTime?: string;
}

interface PostStore {
  posts: Post[];
  explorePosts: Post[];
  isLoading: boolean;
  fetchPosts: () => Promise<void>;
  fetchExplorePosts: () => Promise<void>;
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  createPost: (image: string, caption: string) => Promise<void>;
}

// Sample posts
const DEMO_POSTS = [
  {
    id: '1',
    user: {
      id: DEMO_USERS['johndoe'].id,
      username: DEMO_USERS['johndoe'].username,
      avatar: DEMO_USERS['johndoe'].avatar
    },
    image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Beautiful sunset at the beach! 🌅 #sunset #beach #summer',
    likes: 124,
    hasLiked: false,
    comments: [
      {
        id: 'c1',
        user: {
          id: DEMO_USERS['janedoe'].id,
          username: DEMO_USERS['janedoe'].username,
          avatar: DEMO_USERS['janedoe'].avatar
        },
        text: 'Amazing view! Where is this?',
        createdAt: new Date(Date.now() - 3600000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: '2',
    user: {
      id: DEMO_USERS['janedoe'].id,
      username: DEMO_USERS['janedoe'].username,
      avatar: DEMO_USERS['janedoe'].avatar
    },
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Breakfast of champions 🍳 #foodie #breakfast',
    likes: 87,
    hasLiked: true,
    comments: [
      {
        id: 'c2',
        user: {
          id: DEMO_USERS['johndoe'].id,
          username: DEMO_USERS['johndoe'].username,
          avatar: DEMO_USERS['johndoe'].avatar
        },
        text: 'Looks delicious!',
        createdAt: new Date(Date.now() - 1800000).toISOString()
      },
      {
        id: 'c3',
        user: {
          id: DEMO_USERS['mikebrown'].id,
          username: DEMO_USERS['mikebrown'].username,
          avatar: DEMO_USERS['mikebrown'].avatar
        },
        text: 'I want the recipe!',
        createdAt: new Date(Date.now() - 900000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 5400000).toISOString()
  },
  {
    id: '3',
    user: {
      id: DEMO_USERS['mikebrown'].id,
      username: DEMO_USERS['mikebrown'].username,
      avatar: DEMO_USERS['mikebrown'].avatar
    },
    image: 'https://images.pexels.com/photos/3098970/pexels-photo-3098970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Working from my favorite café today ☕ #worklife #remotework',
    likes: 56,
    hasLiked: false,
    comments: [],
    createdAt: new Date(Date.now() - 10800000).toISOString()
  }
];

// Sample explore posts
const DEMO_EXPLORE_POSTS = [
  {
    id: 'e1',
    user: {
      id: DEMO_USERS['mikebrown'].id,
      username: DEMO_USERS['mikebrown'].username,
      avatar: DEMO_USERS['mikebrown'].avatar
    },
    image: 'https://images.pexels.com/photos/3225529/pexels-photo-3225529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Mountain adventure #hiking #nature',
    likes: 324,
    hasLiked: false,
    comments: [],
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'e2',
    user: {
      id: DEMO_USERS['sarahparker'].id,
      username: DEMO_USERS['sarahparker'].username,
      avatar: DEMO_USERS['sarahparker'].avatar
    },
    image: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'City lights 🌃 #nightphotography',
    likes: 218,
    hasLiked: false,
    comments: [],
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: 'e3',
    user: {
      id: DEMO_USERS['janedoe'].id,
      username: DEMO_USERS['janedoe'].username,
      avatar: DEMO_USERS['janedoe'].avatar
    },
    image: 'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Perfect day for a picnic 🧺 #weekend',
    likes: 189,
    hasLiked: false,
    comments: [],
    createdAt: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: 'e4',
    user: {
      id: DEMO_USERS['johndoe'].id,
      username: DEMO_USERS['johndoe'].username,
      avatar: DEMO_USERS['johndoe'].avatar
    },
    image: 'https://images.pexels.com/photos/2277653/pexels-photo-2277653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Coffee time ☕ #coffeelover',
    likes: 145,
    hasLiked: false,
    comments: [],
    createdAt: new Date(Date.now() - 345600000).toISOString()
  },
  {
    id: 'e5',
    user: {
      id: DEMO_USERS['sarahparker'].id,
      username: DEMO_USERS['sarahparker'].username,
      avatar: DEMO_USERS['sarahparker'].avatar
    },
    image: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Architecture photography 📷 #architecture',
    likes: 278,
    hasLiked: false,
    comments: [],
    createdAt: new Date(Date.now() - 432000000).toISOString()
  },
  {
    id: 'e6',
    user: {
      id: DEMO_USERS['mikebrown'].id,
      username: DEMO_USERS['mikebrown'].username,
      avatar: DEMO_USERS['mikebrown'].avatar
    },
    image: 'https://images.pexels.com/photos/2258536/pexels-photo-2258536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Beach day 🏖️ #summer',
    likes: 312,
    hasLiked: false,
    comments: [],
    createdAt: new Date(Date.now() - 518400000).toISOString()
  }
];

// Format the time for display
const formatPostDates = (posts: Post[]): Post[] => {
  return posts.map(post => ({
    ...post,
    formattedTime: formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }),
    comments: post.comments.map(comment => ({
      ...comment,
      formattedTime: formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })
    }))
  }));
};

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  explorePosts: [],
  isLoading: false,
  
  fetchPosts: async () => {
    set({ isLoading: true });
    
    // Get existing posts
    const { posts } = get();
    
    // Only fetch demo posts if there are no existing posts
    if (posts.length === 0) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ 
        posts: formatPostDates(DEMO_POSTS),
        isLoading: false 
      });
    } else {
      set({ isLoading: false });
    }
  },
  
  fetchExplorePosts: async () => {
    set({ isLoading: true });
    
    // Get existing explore posts
    const { explorePosts } = get();
    
    // Only fetch demo explore posts if there are no existing posts
    if (explorePosts.length === 0) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ 
        explorePosts: formatPostDates(DEMO_EXPLORE_POSTS),
        isLoading: false 
      });
    } else {
      set({ isLoading: false });
    }
  },
  
  likePost: (postId: string) => {
    const { posts, explorePosts } = get();
    
    // Update in main feed
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1, hasLiked: true } 
        : post
    );
    
    // Update in explore feed
    const updatedExplorePosts = explorePosts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1, hasLiked: true } 
        : post
    );
    
    set({ posts: updatedPosts, explorePosts: updatedExplorePosts });
  },
  
  unlikePost: (postId: string) => {
    const { posts, explorePosts } = get();
    
    // Update in main feed
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes - 1, hasLiked: false } 
        : post
    );
    
    // Update in explore feed
    const updatedExplorePosts = explorePosts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes - 1, hasLiked: false } 
        : post
    );
    
    set({ posts: updatedPosts, explorePosts: updatedExplorePosts });
  },
  
  addComment: (postId: string, text: string) => {
    const { posts, explorePosts } = get();
    
    // Get current user from local storage
    const savedUser = localStorage.getItem('instagram_user');
    const currentUser = savedUser ? JSON.parse(savedUser) : DEMO_USERS[0];
    
    const newComment: Comment = {
      id: `c${Date.now()}`,
      user: {
        id: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar
      },
      text,
      createdAt: new Date().toISOString(),
      formattedTime: 'just now'
    };
    
    // Update in main feed
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] } 
        : post
    );
    
    // Update in explore feed
    const updatedExplorePosts = explorePosts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] } 
        : post
    );
    
    set({ posts: updatedPosts, explorePosts: updatedExplorePosts });
  },
  
  createPost: async (image: string, caption: string) => {
    // Get current user from local storage
    const savedUser = localStorage.getItem('instagram_user');
    const currentUser = savedUser ? JSON.parse(savedUser) : DEMO_USERS['johndoe'];
    
    const newPost: Post = {
      id: `p${Date.now()}`,
      user: {
        id: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        fullName: currentUser.fullName
      },
      image,
      caption,
      likes: 0,
      hasLiked: false,
      comments: [],
      createdAt: new Date().toISOString(),
      formattedTime: 'just now'
    };
    
    // Format the new post
    const formattedPost = formatPostDates([newPost])[0];
    
    // Add to main feed and explore posts
    set(state => ({
      posts: [formattedPost, ...state.posts],
      explorePosts: [formattedPost, ...state.explorePosts]
    }));
    
    // Update user's post count in localStorage
    if (savedUser) {
      const updatedUser = {
        ...currentUser,
        posts: (currentUser.posts || 0) + 1
      };
      localStorage.setItem('instagram_user', JSON.stringify(updatedUser));
      
      // Dispatch event to update user data in components
      window.dispatchEvent(new CustomEvent('userUpdated', { detail: updatedUser }));
    }
    
    return Promise.resolve();
  }
}));
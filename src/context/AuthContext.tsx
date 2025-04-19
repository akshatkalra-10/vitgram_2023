import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  posts: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Sample user data
const DEMO_USER: User = {
  id: '1',
  username: 'johndoe',
  fullName: 'John Doe',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
  bio: 'Photography enthusiast | Travel lover | Web developer',
  followers: 1024,
  following: 342,
  posts: 24
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for saved auth in localStorage
    const savedUser = localStorage.getItem('instagram_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    // Simulate API call for login
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo purposes, always succeed with demo user
    setUser(DEMO_USER);
    setIsAuthenticated(true);
    localStorage.setItem('instagram_user', JSON.stringify(DEMO_USER));
  };

  const register = async (username: string, email: string, password: string) => {
    // Simulate API call for registration
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo purposes, always succeed with demo user
    const newUser = {
      ...DEMO_USER,
      username,
      fullName: username, // Use username as full name initially
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('instagram_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('instagram_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      // Create a new user object with the updated data
      const updatedUser = { ...user, ...userData };
      
      // Update the state with the new user object
      setUser(updatedUser);
      
      // Update localStorage with the new user data
      localStorage.setItem('instagram_user', JSON.stringify(updatedUser));
      
      // Dispatch a custom event to notify all components about the user update
      window.dispatchEvent(new CustomEvent('userUpdated', { detail: updatedUser }));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
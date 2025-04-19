import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Home, Search, Compass, MessageCircle, Heart, 
  PlusSquare, User, Settings, LogOut, Camera 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isDarkMode } = useTheme();
  
  // Listen for user updates
  useEffect(() => {
    const handleUserUpdate = (event: CustomEvent) => {
      // Force a re-render when user data changes
      // This is a simple way to ensure the navbar updates with the latest user data
      setShowProfileMenu(false);
    };
    
    window.addEventListener('userUpdated', handleUserUpdate as EventListener);
    
    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate as EventListener);
    };
  }, []);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex fixed inset-y-0 left-0 flex-col w-20 lg:w-64 bg-white dark:bg-dark border-r border-gray-200 dark:border-dark">
        <div className="p-4 h-16 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-purple-600" />
            <span className="hidden lg:inline-block font-semibold text-xl dark:text-white">VITgram</span>
          </Link>
        </div>
        
        <nav className="flex-1 pt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`flex items-center px-4 py-3 lg:py-2 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors ${
                  isActive('/') ? 'font-semibold' : ''
                }`}
              >
                <Home className={`h-6 w-6 ${isActive('/') ? 'text-purple-600' : 'text-gray-700 dark:text-gray-300'}`} />
                <span className="hidden lg:inline-block ml-4 dark:text-white">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                className={`flex items-center px-4 py-3 lg:py-2 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors ${
                  isActive('/explore') ? 'font-semibold' : ''
                }`}
              >
                <Compass className={`h-6 w-6 ${isActive('/explore') ? 'text-purple-600' : 'text-gray-700 dark:text-gray-300'}`} />
                <span className="hidden lg:inline-block ml-4 dark:text-white">Explore</span>
              </Link>
            </li>
            <li>
              <Link
                to="/messages"
                className={`flex items-center px-4 py-3 lg:py-2 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors ${
                  isActive('/messages') ? 'font-semibold' : ''
                }`}
              >
                <MessageCircle className={`h-6 w-6 ${isActive('/messages') ? 'text-purple-600' : 'text-gray-700 dark:text-gray-300'}`} />
                <span className="hidden lg:inline-block ml-4 dark:text-white">Messages</span>
              </Link>
            </li>
            <li>
              <Link
                to="/notifications"
                className={`flex items-center px-4 py-3 lg:py-2 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors ${
                  isActive('/notifications') ? 'font-semibold' : ''
                }`}
              >
                <Heart className={`h-6 w-6 ${isActive('/notifications') ? 'text-purple-600' : 'text-gray-700 dark:text-gray-300'}`} />
                <span className="hidden lg:inline-block ml-4 dark:text-white">Notifications</span>
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className={`flex items-center px-4 py-3 lg:py-2 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors ${
                  isActive('/create') ? 'font-semibold' : ''
                }`}
              >
                <PlusSquare className={`h-6 w-6 ${isActive('/create') ? 'text-purple-600' : 'text-gray-700 dark:text-gray-300'}`} />
                <span className="hidden lg:inline-block ml-4 dark:text-white">Create</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/profile/${user?.username}`}
                className={`flex items-center px-4 py-3 lg:py-2 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors ${
                  location.pathname.includes('/profile') ? 'font-semibold' : ''
                }`}
              >
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.username} 
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                )}
                <span className="hidden lg:inline-block ml-4 dark:text-white">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={`flex items-center px-4 py-3 lg:py-2 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors ${
                  isActive('/settings') ? 'font-semibold' : ''
                }`}
              >
                <Settings className={`h-6 w-6 ${isActive('/settings') ? 'text-purple-600' : 'text-gray-700 dark:text-gray-300'}`} />
                <span className="hidden lg:inline-block ml-4 dark:text-white">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden lg:inline-block ml-4">Log Out</span>
          </button>
        </div>
      </div>
      
      {/* Mobile top navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-dark border-b border-gray-200 dark:border-dark flex items-center justify-between px-4 z-10">
        <Link to="/" className="flex items-center">
          <Camera className="h-8 w-8 text-purple-600" />
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/search">
            <Search className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </Link>
          
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center"
            >
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.username} 
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <User className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-surface rounded-md shadow-lg py-1 z-20">
                <Link
                  to={`/profile/${user?.username}`}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
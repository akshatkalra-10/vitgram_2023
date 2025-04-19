import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, PlusSquare, Heart, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';

function MobileNavbar() {
  const { user } = useAuth();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Listen for user updates
  useEffect(() => {
    const handleUserUpdate = (event: CustomEvent) => {
      // Force a re-render when user data changes
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('userUpdated', handleUserUpdate as EventListener);
    
    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate as EventListener);
    };
  }, []);
  
  const isActive = (path: string) => location.pathname === path;
  const isProfileActive = location.pathname.includes('/profile');
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-dark border-t border-gray-200 dark:border-dark flex items-center justify-around px-2 z-10">
      <Link
        to="/"
        className="flex flex-col items-center justify-center w-full h-full"
      >
        <Home className={`h-6 w-6 ${isActive('/') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-400'}`} />
      </Link>
      
      <Link
        to="/explore"
        className="flex flex-col items-center justify-center w-full h-full"
      >
        <Compass className={`h-6 w-6 ${isActive('/explore') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-400'}`} />
      </Link>
      
      <Link
        to="/create"
        className="flex flex-col items-center justify-center w-full h-full"
      >
        <PlusSquare className={`h-6 w-6 ${isActive('/create') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-400'}`} />
      </Link>
      
      <Link
        to="/notifications"
        className="flex flex-col items-center justify-center w-full h-full"
      >
        <Heart className={`h-6 w-6 ${isActive('/notifications') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-400'}`} />
      </Link>
      
      <Link
        to={`/profile/${user?.username}`}
        className="flex flex-col items-center justify-center w-full h-full"
      >
        {user?.avatar ? (
          <div className={`h-6 w-6 rounded-full overflow-hidden border-2 ${isProfileActive ? 'border-purple-600 dark:border-purple-400' : 'border-transparent'}`}>
            <img 
              src={user.avatar} 
              alt={user.username} 
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <User className={`h-6 w-6 ${isProfileActive ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-400'}`} />
        )}
      </Link>
    </nav>
  );
}

export default MobileNavbar;
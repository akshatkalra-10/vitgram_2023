import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { DEMO_USERS } from '../../data/demoUsers';

// Demo stories data with consistent user data
const DEMO_STORIES = [
  {
    id: '1',
    username: 'shivansh',
    avatar: DEMO_USERS['johndoe'].avatar,
    hasUnseenStory: true
  },
  {
    id: '2',
    username: 'akshat',
    avatar: DEMO_USERS['janedoe'].avatar,
    hasUnseenStory: true
  },
  {
    id: '3',
    username: 'akash',
    avatar: DEMO_USERS['mikebrown'].avatar,
    hasUnseenStory: false
  },
  {
    id: '4',
    username: 'ayush',
    avatar: DEMO_USERS['sarahparker'].avatar,
    hasUnseenStory: true
  },
  {
    id: '5',
    username: 'vedant',
    avatar: DEMO_USERS['alexsmith'].avatar,
    hasUnseenStory: false
  }
];

function Stories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scroll('left')}
          className="p-1 rounded-full bg-white dark:bg-dark-surface shadow-md hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex space-x-4 p-4 overflow-x-auto scrollbar-hide"
      >
        {DEMO_STORIES.map(story => (
          <Link
            key={story.id}
            to={`/stories/${story.id}`}
            className="flex flex-col items-center space-y-1"
          >
            <div className="relative">
              <div className={`w-16 h-16 rounded-full p-[2px] ${
                story.hasUnseenStory 
                  ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                <img
                  src={story.avatar}
                  alt={story.username}
                  className="w-full h-full rounded-full object-cover border-2 border-white dark:border-dark"
                />
              </div>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300 truncate max-w-[4rem]">
              {story.username}
            </span>
          </Link>
        ))}
      </div>
      
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scroll('right')}
          className="p-1 rounded-full bg-white dark:bg-dark-surface shadow-md hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}

export default Stories;
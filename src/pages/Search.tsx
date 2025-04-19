import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import { usePostStore } from '../store/postStore';
import { useTheme } from '../context/ThemeContext';

function Search() {
  const { explorePosts, isLoading, fetchExplorePosts } = usePostStore();
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(explorePosts);
  
  useEffect(() => {
    fetchExplorePosts();
  }, [fetchExplorePosts]);
  
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = explorePosts.filter(post => 
        post.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.caption.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(explorePosts);
    }
  }, [searchQuery, explorePosts]);
  
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-dark min-h-screen">
      {/* Search bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-dark border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>
      
      {/* Results */}
      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1">
            {filteredPosts.map(post => (
              <Link
                key={post.id}
                to={`/p/${post.id}`}
                className="aspect-square relative group"
              >
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                  <div className="hidden group-hover:flex items-center space-x-4 text-white">
                    <span className="flex items-center space-x-1">
                      <span className="font-semibold">{post.likes}</span>
                      <span>likes</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="font-semibold">{post.comments.length}</span>
                      <span>comments</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {!isLoading && filteredPosts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No results found.</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Try searching for something else.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search; 
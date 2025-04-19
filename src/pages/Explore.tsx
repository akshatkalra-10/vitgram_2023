import { useEffect, useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import ExploreGrid from '../components/explore/ExploreGrid';
import { usePostStore } from '../store/postStore';

function Explore() {
  const { explorePosts, isLoading, fetchExplorePosts } = usePostStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetchExplorePosts();
  }, [fetchExplorePosts]);
  
  if (isLoading && explorePosts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Explore grid */}
      <ExploreGrid posts={explorePosts} />
      
      {explorePosts.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-500">No posts to explore.</p>
        </div>
      )}
    </div>
  );
}

export default Explore;
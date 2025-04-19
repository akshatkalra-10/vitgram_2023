import { useEffect } from 'react';
import { usePostStore } from '../store/postStore';
import Post from '../components/feed/Post';
import Stories from '../components/feed/Stories';
import { useTheme } from '../context/ThemeContext';

function Home() {
  const { posts, isLoading, fetchPosts } = usePostStore();
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-dark min-h-screen">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <Stories />
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
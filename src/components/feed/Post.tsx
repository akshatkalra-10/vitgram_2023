import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark, Send, MoreHorizontal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Post as PostType, usePostStore } from '../../store/postStore';
import { useTheme } from '../../context/ThemeContext';

interface PostProps {
  post: PostType
}

function Post({ post }: PostProps) {
  const { user } = useAuth();
  const { likePost, unlikePost, addComment } = usePostStore();
  const { isDarkMode } = useTheme();
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const doubleClickTimer = useRef<NodeJS.Timeout | null>(null);
  const [lastTap, setLastTap] = useState<number>(0);
  
  const handleLike = () => {
    if (post.hasLiked) {
      unlikePost(post.id);
    } else {
      likePost(post.id);
      animateLike();
    }
  };
  
  const handleDoubleTap = () => {
    // For mobile touch events
    const now = Date.now();
    if (now - lastTap < 300) {
      if (!post.hasLiked) {
        likePost(post.id);
        animateLike();
      }
    }
    setLastTap(now);
  };
  
  const handleDoubleClick = () => {
    if (doubleClickTimer.current) {
      clearTimeout(doubleClickTimer.current);
      doubleClickTimer.current = null;
      if (!post.hasLiked) {
        likePost(post.id);
        animateLike();
      }
    } else {
      doubleClickTimer.current = setTimeout(() => {
        doubleClickTimer.current = null;
      }, 300);
    }
  };
  
  const animateLike = () => {
    setShowLikeAnimation(true);
    setTimeout(() => {
      setShowLikeAnimation(false);
    }, 1000);
  };
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      addComment(post.id, comment);
      setComment('');
    }
  };
  
  return (
    <article className="card mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-dark">
      {/* Post header */}
      <div className="p-4 flex items-center justify-between">
        <Link to={`/profile/${post.user.username}`} className="flex items-center space-x-2">
          <img
            src={post.user.avatar}
            alt={post.user.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold dark:text-white">{post.user.username}</span>
        </Link>
        <button className="text-gray-600 dark:text-gray-300">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      {/* Post image */}
      <div 
        className="relative"
        onClick={handleDoubleClick}
        onTouchStart={handleDoubleTap}
      >
        <img
          src={post.image}
          alt={post.caption}
          className="w-full object-cover max-h-[calc(100vh-12rem)]"
        />
        {showLikeAnimation && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="w-24 h-24 text-white fill-white animate-like" />
          </div>
        )}
      </div>
      
      {/* Post actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="focus:outline-none"
            >
              <Heart
                className={`w-6 h-6 ${
                  post.hasLiked ? 'text-red-500 fill-red-500' : 'text-gray-800 dark:text-gray-200'
                } transition-colors`}
              />
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="focus:outline-none"
            >
              <MessageCircle className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            </button>
            <button className="focus:outline-none">
              <Send className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            </button>
          </div>
          <button className="focus:outline-none">
            <Bookmark className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </button>
        </div>
        
        {/* Likes count */}
        <div className="font-semibold mb-1 dark:text-white">{post.likes} likes</div>
        
        {/* Caption */}
        <div className="mb-2">
          <span className="font-semibold mr-2 dark:text-white">{post.user.username}</span>
          <span className="dark:text-gray-200">{post.caption}</span>
        </div>
        
        {/* View all comments button/timestamp */}
        <div className="flex flex-col space-y-1">
          {post.comments.length > 0 && !showComments && (
            <button
              onClick={() => setShowComments(true)}
              className="text-gray-500 dark:text-gray-400 text-sm"
            >
              View all {post.comments.length} comments
            </button>
          )}
          <span className="text-gray-500 dark:text-gray-400 text-xs">{post.formattedTime}</span>
        </div>
      </div>
      
      {/* Comments */}
      {showComments && (
        <div className="px-4 pb-2 max-h-40 overflow-y-auto">
          {post.comments.map(comment => (
            <div key={comment.id} className="mb-2">
              <Link to={`/profile/${comment.user.username}`} className="font-semibold mr-2 dark:text-white">
                {comment.user.username}
              </Link>
              <span className="dark:text-gray-200">{comment.text}</span>
              <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{comment.formattedTime}</div>
            </div>
          ))}
        </div>
      )}
      
      {/* Comment input */}
      <form onSubmit={handleCommentSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4 flex items-center">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 border-none focus:ring-0 outline-none text-sm bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {comment.trim() && (
          <button 
            type="submit"
            className="text-blue-500 dark:text-blue-400 font-semibold ml-2 text-sm"
          >
            Post
          </button>
        )}
      </form>
    </article>
  );
}

export default Post;
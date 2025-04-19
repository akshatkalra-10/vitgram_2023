import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Image } from 'lucide-react';
import { Post, usePostStore } from '../../store/postStore';

interface ExploreGridProps {
  posts: Post[];
}

function ExploreGrid({ posts }: ExploreGridProps) {
  const { likePost } = usePostStore();
  const [hoverPost, setHoverPost] = useState<string | null>(null);
  
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4">
      {posts.map(post => (
        <div
          key={post.id}
          className="relative aspect-square"
          onMouseEnter={() => setHoverPost(post.id)}
          onMouseLeave={() => setHoverPost(null)}
        >
          <Link to={`/post/${post.id}`}>
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover"
            />
            
            {/* Hover overlay with stats */}
            {(hoverPost === post.id) && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center space-x-6 text-white">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 fill-white mr-2" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            )}
            
            {/* Multi-image indicator if needed */}
            {false && (
              <div className="absolute top-2 right-2">
                <Image className="w-5 h-5 text-white" />
              </div>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ExploreGrid;
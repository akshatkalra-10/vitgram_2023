import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, Bookmark, Tag, Settings, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Post, usePostStore } from '../store/postStore';
import ExploreGrid from '../components/explore/ExploreGrid';
import { DEMO_USERS } from '../data/demoUsers';

function Profile() {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const { explorePosts, fetchExplorePosts } = usePostStore();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Function to update user posts
  const updateUserPosts = (userData: User) => {
    const filteredPosts = explorePosts.filter(post => post.user.username === userData.username);
    setUserPosts(filteredPosts);
  };
  
  // Function to fetch user data based on username
  const fetchUserData = () => {
    setIsLoading(true);
    
    // In a real app, this would be an API call to fetch user data by username
    // For demo purposes, we'll use predefined demo users or create a new one
    setTimeout(() => {
      let userData: User;
      
      // If the username matches the current user, use the current user data
      if (username === user?.username) {
        userData = user;
      } else if (username && DEMO_USERS[username]) {
        // If the username matches a predefined demo user, use that data
        userData = DEMO_USERS[username];
      } else {
        // Otherwise, create a demo user with the requested username
        // In a real app, this would be fetched from an API
        userData = {
          id: '5',
          username: username || 'unknown',
          fullName: username ? username.charAt(0).toUpperCase() + username.slice(1) : 'Unknown User',
          avatar: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000)}/pexels-photo-${Math.floor(Math.random() * 1000)}.jpeg?auto=compress&cs=tinysrgb&w=300`,
          bio: 'Demo user profile',
          followers: 500,
          following: 300,
          posts: 15
        };
      }
      
      setProfileUser(userData);
      
      // Only fetch posts if there are none
      if (explorePosts.length === 0) {
        fetchExplorePosts().then(() => {
          updateUserPosts(userData);
          setIsLoading(false);
        });
      } else {
        updateUserPosts(userData);
        setIsLoading(false);
      }
    }, 500);
  };
  
  // Effect to fetch initial data
  useEffect(() => {
    fetchUserData();
  }, [username, user]);
  
  // Effect to update posts when explorePosts changes
  useEffect(() => {
    if (profileUser) {
      updateUserPosts(profileUser);
    }
  }, [explorePosts]);
  
  // Listen for user updates
  useEffect(() => {
    const handleUserUpdate = (event: CustomEvent) => {
      // Only update if the profile is for the current user
      if (username === user?.username) {
        const updatedUser = event.detail;
        setProfileUser(updatedUser);
        updateUserPosts(updatedUser);
      }
    };
    
    window.addEventListener('userUpdated', handleUserUpdate as EventListener);
    
    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate as EventListener);
    };
  }, [username, user]);
  
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
      </div>
    );
  }
  
  const isCurrentUser = profileUser?.username === user?.username;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile header */}
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-8">
          <img
            src={profileUser?.avatar}
            alt={profileUser?.username}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-4">
            <h1 className="text-xl md:text-2xl font-semibold mb-2 md:mb-0">{profileUser?.username}</h1>
            
            <div className="flex items-center space-x-2">
              {isCurrentUser ? (
                <>
                  <Link
                    to="/edit-profile"
                    className="px-4 py-1 border border-gray-300 rounded font-semibold text-sm"
                  >
                    Edit Profile
                  </Link>
                  <Link to="/settings" className="text-gray-600">
                    <Settings className="w-5 h-5" />
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleFollowToggle}
                  className={`px-4 py-1 rounded font-semibold text-sm ${
                    isFollowing
                      ? 'border border-gray-300 bg-white text-gray-900'
                      : 'bg-purple-600 text-white'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>
          </div>
          
          <div className="flex space-x-6 mb-4">
            <div>
              <span className="font-semibold">{userPosts.length}</span> posts
            </div>
            <div>
              <span className="font-semibold">{profileUser?.followers}</span> followers
            </div>
            <div>
              <span className="font-semibold">{profileUser?.following}</span> following
            </div>
          </div>
          
          <div>
            <h2 className="font-semibold">{profileUser?.fullName}</h2>
            <p className="mt-1">{profileUser?.bio}</p>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-t border-gray-200">
        <div className="flex justify-around">
          <button
            className={`p-4 flex items-center space-x-1 ${
              activeTab === 'posts'
                ? 'border-t-2 border-purple-500 text-purple-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            <Grid className="w-4 h-4" />
            <span className="text-xs uppercase font-semibold">Posts</span>
          </button>
          
          {isCurrentUser && (
            <button
              className={`p-4 flex items-center space-x-1 ${
                activeTab === 'saved'
                  ? 'border-t-2 border-purple-500 text-purple-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('saved')}
            >
              <Bookmark className="w-4 h-4" />
              <span className="text-xs uppercase font-semibold">Saved</span>
            </button>
          )}
          
          <button
            className={`p-4 flex items-center space-x-1 ${
              activeTab === 'tagged'
                ? 'border-t-2 border-purple-500 text-purple-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('tagged')}
          >
            <Tag className="w-4 h-4" />
            <span className="text-xs uppercase font-semibold">Tagged</span>
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="mt-4">
        {activeTab === 'posts' && (
          userPosts.length > 0 ? (
            <ExploreGrid posts={userPosts} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No posts yet.</p>
            </div>
          )
        )}
        
        {activeTab === 'saved' && (
          <div className="text-center py-8">
            <p className="text-gray-500">No saved posts yet.</p>
          </div>
        )}
        
        {activeTab === 'tagged' && (
          <div className="text-center py-8">
            <p className="text-gray-500">No posts you've been tagged in yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function EditProfile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [username, setUsername] = useState(user?.username || '');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(user?.avatar || '');
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      updateUser({
        username,
        fullName,
        bio,
        avatar
      });
      
      navigate(`/profile/${username}`);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-dark min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold dark:text-white">Edit Profile</h1>
        </div>
        
        <button
          form="profile-form"
          type="submit"
          disabled={isLoading}
          className="text-purple-600 dark:text-purple-400 font-semibold"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Save'
          )}
        </button>
      </div>
      
      {/* Profile image */}
      <div className="flex flex-col items-center mt-6 mb-8">
        <div className="relative">
          <img
            src={avatar}
            alt={user?.username}
            className="w-20 h-20 rounded-full object-cover"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-1"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 text-purple-600 dark:text-purple-400 font-semibold text-sm"
        >
          Change Profile Photo
        </button>
      </div>
      
      {/* Form */}
      <form id="profile-form" onSubmit={handleSubmit} className="px-4">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="input-field dark:bg-dark-surface dark:text-white dark:border-gray-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            id="fullName"
            type="text"
            className="input-field dark:bg-dark-surface dark:text-white dark:border-gray-700"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            rows={4}
            className="input-field dark:bg-dark-surface dark:text-white dark:border-gray-700"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
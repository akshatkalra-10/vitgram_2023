import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Loader2 } from 'lucide-react';
import { usePostStore } from '../store/postStore';
import { useTheme } from '../context/ThemeContext';

function Create() {
  const navigate = useNavigate();
  const { createPost } = usePostStore();
  const { isDarkMode } = useTheme();
  const [image, setImage] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !caption.trim()) return;
    
    setIsLoading(true);
    try {
      await createPost(image, caption);
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-dark min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-6 dark:text-white">Create Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Image
          </label>
          
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg bg-gray-50 dark:bg-dark-surface">
            <div className="space-y-1 text-center">
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="mx-auto h-64 w-auto object-cover rounded-lg"
                />
              ) : (
                <Image className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              )}
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  htmlFor="image-upload"
                  className="relative cursor-pointer bg-white dark:bg-dark rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="image-upload"
                    name="image-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="caption" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Caption
          </label>
          <div className="mt-1">
            <textarea
              id="caption"
              name="caption"
              rows={3}
              className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-dark-surface dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!image || !caption.trim() || isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-dark"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Post'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create; 
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Image, Camera, Loader2 } from 'lucide-react';
import { usePostStore } from '../store/postStore';

function PostCreator() {
  const navigate = useNavigate();
  const { createPost } = usePostStore();
  const [step, setStep] = useState<'select' | 'edit'>('select');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setStep('edit');
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const activateCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };
  
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the current video frame to canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL('image/jpeg');
        setSelectedImage(dataUrl);
        
        // Stop camera stream
        stopCamera();
        
        // Move to edit step
        setStep('edit');
      }
    }
  };
  
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsCameraActive(false);
    }
  };
  
  const handlePost = async () => {
    if (!selectedImage) return;
    
    try {
      setIsProcessing(true);
      await createPost(selectedImage, caption);
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleClose = () => {
    stopCamera();
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 h-14 flex items-center justify-between px-4">
        <button
          onClick={handleClose}
          className="text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h1 className="text-lg font-semibold">Create New Post</h1>
        
        <div className="w-6" />
      </div>
      
      {/* Main content */}
      <div className="max-w-lg mx-auto p-4">
        {step === 'select' && (
          <div className="flex flex-col items-center justify-center space-y-6 mt-10">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Create New Post</h2>
              <p className="text-gray-600">Share a photo with your followers</p>
            </div>
            
            <div className="flex flex-col items-center space-y-4 w-full">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-primary w-full max-w-sm flex items-center justify-center"
              >
                <Image className="w-5 h-5 mr-2" />
                Select from Gallery
              </button>
              
              <button
                onClick={activateCamera}
                className="btn btn-secondary w-full max-w-sm flex items-center justify-center"
              >
                <Camera className="w-5 h-5 mr-2" />
                Take a Photo
              </button>
              
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            
            {isCameraActive && (
              <div className="relative mt-4 w-full max-w-md">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-auto rounded-lg"
                />
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <button
                    onClick={takePhoto}
                    className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-gray-200"
                  >
                    <div className="h-12 w-12 rounded-full bg-white border-2 border-gray-400" />
                  </button>
                </div>
                
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}
          </div>
        )}
        
        {step === 'edit' && selectedImage && (
          <div className="mt-6">
            <div className="mb-6">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-1">
                Caption
              </label>
              <textarea
                id="caption"
                rows={4}
                placeholder="Write a caption..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setStep('select')}
                className="btn btn-secondary mr-2"
              >
                Back
              </button>
              
              <button
                onClick={handlePost}
                disabled={isProcessing}
                className="btn btn-primary flex items-center"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  'Share'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCreator;
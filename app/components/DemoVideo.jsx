'use client';

import { useState, useRef, useEffect } from 'react';

const DemoVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [hasViewed, setHasViewed] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const videoRef = useRef(null);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Load view count from localStorage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem('mcp-demo-views');
    if (savedCount) {
      setViewCount(parseInt(savedCount));
    }
  }, []);

  // Track video views
  const handlePlay = () => {
    setIsPlaying(true);
    
    // Only count as view if user hasn't viewed before in this session
    if (!hasViewed) {
      const newCount = viewCount + 1;
      setViewCount(newCount);
      localStorage.setItem('mcp-demo-views', newCount.toString());
      setHasViewed(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleSpeedChange = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackRate(speed);
      setShowSpeedMenu(false);
    }
  };

  return (
    <section className="w-full px-[12%] py-16 scroll-mt-20" id="demo">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-lg font-Ovo mb-2">
            See It In Action
          </h2>
          <h3 className="text-5xl font-Ovo mb-6">
            MCP Demo
          </h3>
          <p className="text-center max-w-2xl mx-auto font-Ovo text-gray-700 dark:text-gray-300">
            Watch this demonstration showcasing the Model Context Protocol implementation
            and its practical applications.
          </p>
        </header>

        <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
          {/* Video Container */}
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              onPlay={handlePlay}
              onPause={handlePause}
              poster="/video-poster.jpg" // You can add a poster image
              aria-label="MCP Demo Video"
            >
              <source src="/mcp-demo.mp4" type="video/mp4" />
              <source src="/mcp-demo.webm" type="video/webm" />
              <source src="/mcp-demo.mov" type="video/quicktime" />
              <p className="text-white p-8 text-center">
                Your browser doesn&apos;t support video playback. 
                <a 
                  href="/mcp-demo.mov" 
                  download
                  className="text-blue-400 hover:text-blue-300 underline ml-1"
                >
                  Download the video instead
                </a>
              </p>
            </video>

            {/* Loading overlay */}
            {isPlaying && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300">
                <div className="text-white text-lg">Loading...</div>
              </div>
            )}
          </div>

          {/* Video Stats */}
          <div className="bg-gray-800 px-6 py-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm text-gray-300">{viewCount} views</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Speed Control */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-1"
                  aria-label="Playback Speed"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm">{playbackRate}x</span>
                </button>
                
                {showSpeedMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg shadow-lg py-2 min-w-[80px]">
                    {speedOptions.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-700 transition-colors ${
                          playbackRate === speed ? 'text-blue-400 bg-gray-700' : 'text-gray-300'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  if (videoRef.current) {
                    if (videoRef.current.requestFullscreen) {
                      videoRef.current.requestFullscreen();
                    }
                  }
                }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Fullscreen"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            💡 For the best experience, use headphones and watch in fullscreen
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;
'use client';

import { useEffect, useState } from 'react';

const DemoVideo = () => {
  const [viewCount, setViewCount] = useState(0);
  const [hasViewed, setHasViewed] = useState(false);

  // Load view count from localStorage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem('mcp-demo-views');
    if (savedCount) {
      setViewCount(parseInt(savedCount));
    }
  }, []);

  // Track video views when iframe loads
  useEffect(() => {
    if (!hasViewed) {
      const newCount = viewCount + 1;
      setViewCount(newCount);
      localStorage.setItem('mcp-demo-views', newCount.toString());
      setHasViewed(true);
    }
  }, [hasViewed, viewCount]);

  return (
    <section className="w-full px-[12%] py-16 scroll-mt-20" id="demo">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-lg font-Ovo mb-2">See It In Action</h2>
          <h3 className="text-5xl font-Ovo mb-6">MCP Demo</h3>
          <p className="text-center max-w-2xl mx-auto font-Ovo text-gray-700 dark:text-gray-300">
            Watch this demonstration showcasing the Model Context Protocol
            implementation and its practical applications.
          </p>
        </header>

        <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
          {/* Vimeo Embed Container */}
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/1091986156?badge=0&autopause=0&player_id=0&app_id=58479"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              allowFullScreen
              title="mcp-demo"
            />
          </div>

          {/* Video Stats */}
          <div className="bg-gray-800 px-6 py-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-300">
                  {viewCount} local views
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="https://vimeo.com/1091986156"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-1"
                aria-label="Watch on Vimeo"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                <span>Watch on Vimeo</span>
              </a>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            💡 For the best experience, watch at 1.5x speed in fullscreen with
            headphones
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;

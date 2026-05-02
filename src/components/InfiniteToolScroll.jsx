// src/components/InfiniteToolScroll.jsx
import React, { useState, useEffect, useCallback } from 'react';
import ToolCard from './ToolCard';
import { fetchTools } from '../data/ToolData';

const PAGE_SIZE = 4; // Number of cards to load at once
const SCROLL_THRESHOLD = 200; // Distance from the bottom (in pixels) to trigger the next load

const InfiniteToolScroll = () => {
  const [tools, setTools] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Function to load the next page of tools
  const loadTools = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const result = await fetchTools(page, PAGE_SIZE);
      setTools((prevTools) => [...prevTools, ...result.tools]);
      setHasMore(result.hasMore);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Failed to fetch tools:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // useEffect to handle initial load
  useEffect(() => {
    loadTools();
  }, []); // Empty dependency array for initial load only

  // useEffect for the infinite scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // Check if the user is near the bottom of the page
      const isNearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - SCROLL_THRESHOLD;

      if (isNearBottom) {
        loadTools();
      }
    };

    // Attach the event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadTools]);

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
          LinkShrinky Technology Stack 🛠️
        </h2>

        {/* The Grid of Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            // Using index as key is okay here because the list is only appended, never reordered
            <ToolCard key={`${tool.id}-${index}`} tool={tool} />
          ))}
        </div>

        {/* Loading Indicator */}
        <div className="flex justify-center mt-8">
          {loading && (
            <div className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
              Loading more tools...
            </div>
          )}
          {!loading && !hasMore && tools.length > 0 && (
            <div className="text-lg font-medium text-gray-500 dark:text-gray-500">
              You've seen all the technologies!
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default InfiniteToolScroll;
// src/components/ToolCard.jsx
import React from 'react';

const ToolCard = ({ tool }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.02] border border-gray-100 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-4">
        {/* Placeholder for the Image */}
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center p-1">
          <img
            src={tool.imageUrl}
            alt={`${tool.name} logo`}
            className="object-contain w-full h-full"
            onError={(e) => { e.target.onerror = null; e.target.src = "/images/default-tool.png" }} // Fallback image
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tool.name}</h3>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{tool.category}</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {tool.description}
      </p>
    </div>
  );
};

export default ToolCard;
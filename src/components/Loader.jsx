import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

function Loader() {
  return (
    // FIX 1: Use theme-aware background color (bg-app-bg) for the full screen loader
    <div className="flex justify-center items-center w-full min-h-[calc(100vh-64px)] bg-app-bg transition-colors duration-500">
      
      <div className="flex flex-col items-center gap-2">
        
        {/* FIX 2: Use a theme-aware color for the spinner. 
           We use a fixed hex value that closely matches btnColor for the component 
           (since react-loader-spinner takes hex/named colors, not Tailwind classes).
        */}
        <RotatingLines
          visible={true}
          height="80" // Slightly larger for better visual impact
          width="80"
          color="#3b82f6" // Placeholder for your btnColor (Blue-500)
          strokeWidth="4" // Slightly thinner stroke for elegance
          animationDuration="0.75"
          ariaLabel="loading-data"
        />
        
        {/* Optional: Add a subtle loading text */}
        <p className="text-app-text/80 text-lg mt-4 transition-colors duration-500">
            Loading data...
        </p>
      </div>
    </div>
  )
}

export default Loader
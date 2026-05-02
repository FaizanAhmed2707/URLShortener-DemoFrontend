// src/components/HorizontalMarquee.jsx
import React from 'react';
import { TOOLS } from '../data/ToolData'; 
// NOTE: You don't need to import the icons here, as they are already imported in ToolData.js

// --- Marquee Brick Component (Updated to use tool.logo) ---
const MarqueeBrick = ({ tool }) => {
    // Dynamically assign the React Icon component
    const IconComponent = tool.logo; 

    return (
        <div 
            className="flex-shrink-0 w-48 h-24 bg-blue-600 dark:bg-blue-800 rounded-lg shadow-xl border-b-4 border-blue-800 dark:border-blue-900 mx-4 transition-transform duration-300 hover:scale-[1.05] flex items-center justify-center p-3 cursor-pointer"
            title={tool.description}
        >
            <div className="flex flex-col items-center space-y-1">
                {/* --- ICON RENDERING HERE --- */}
                {IconComponent && (
                    <IconComponent className="w-8 h-8 text-white" />
                )}
                {/* --------------------------- */}
                
                <h3 className="text-sm font-extrabold text-white text-center tracking-wider uppercase whitespace-normal leading-tight">
                    {tool.name}
                </h3>
            </div>
        </div>
    );
};
// -----------------------------

const HorizontalMarquee = () => {
    // 1. Divide the single TOOLS array into two rows for staggering
    const ROW_SIZE_A = 8;
    const rowA = TOOLS.slice(0, ROW_SIZE_A); // 8 tools
    const rowB = TOOLS.slice(ROW_SIZE_A);     // 7 tools

    // 2. Duplicate each row for the seamless infinite loop
    const doubledRowA = [...rowA, ...rowA];
    const doubledRowB = [...rowB, ...rowB];

    return (
        <div className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
                Technology Stack & Foundation 
            </h2>
            
            <div className="relative w-full">
                <div className="overflow-hidden space-y-4"> 
                    
                    {/* --- ROW 1: Animates Left-to-Right --- */}
                    <div className="inline-flex space-x-8 animate-marquee-rowA hover:pause pb-4">
                        {doubledRowA.map((tool, index) => (
                            <MarqueeBrick key={`A-${index}`} tool={tool} />
                        ))}
                    </div>

                    {/* --- ROW 2: Animates Right-to-Left for a dynamic effect --- */}
                    <div className="inline-flex space-x-8 animate-marquee-rowB hover:pause pb-4">
                        {doubledRowB.map((tool, index) => (
                            <MarqueeBrick key={`B-${index}`} tool={tool} />
                        ))}
                    </div>

                </div>
            </div>
            
            <p className="text-center text-gray-500 dark:text-gray-400 mt-6 text-sm">
                *The full-stack LinkShrinky service is built upon these core technologies.*
            </p>
        </div>
    );
};

export default HorizontalMarquee;
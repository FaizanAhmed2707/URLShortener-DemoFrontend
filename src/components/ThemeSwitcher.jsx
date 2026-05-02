import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';
// Import your custom hook from the file you created in step 1 of the last fix
import { useTheme } from '../contextApi/ThemeContext'; 

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Motion variant for a satisfying tap/click effect
  const iconVariants = {
    initial: { scale: 1 },
    tap: { scale: 0.85, rotate: theme === 'light' ? -30 : 30 },
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 
                 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
      whileTap="tap"
      variants={iconVariants}
    >
      {/* Icon changes based on the current theme */}
      {theme === 'light' ? (
        <FaMoon className="text-xl text-gray-700 transition-colors duration-300" 
                title="Switch to Dark Mode" />
      ) : (
        <FaSun className="text-xl text-yellow-500 transition-colors duration-300" 
               title="Switch to Light Mode" />
      )}
    </motion.button>
  );
};

export default ThemeSwitcher;
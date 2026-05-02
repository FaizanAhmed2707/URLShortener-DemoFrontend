import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Utility function to get the theme from localStorage or default
const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }
    // Check system preference (optional)
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light'; // Default theme
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  // Effect to update the DOM (html tag class) and localStorage when the theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    // 1. Update the 'dark' class on the HTML tag
    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(isDark ? 'dark' : 'light');

    // 2. Save preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy consumption in components
export const useTheme = () => useContext(ThemeContext);
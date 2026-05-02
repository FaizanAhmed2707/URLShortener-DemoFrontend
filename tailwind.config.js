/** @type {import('tailwindcss').Config} */
export default {
  // CRITICAL: Enables the use of the 'dark:' prefix for CSS changes when 
  // the 'dark' class is present on the HTML element.
  darkMode: 'class', 

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  
  theme: {
    extend: {
      animation: {
        // Row 1: Moves at a standard speed (Left-to-Right)
        'marquee-rowA': 'marquee-left 70s linear infinite', 
        // Row 2: Moves at a slightly different speed (Right-to-Left)
        'marquee-rowB': 'marquee-right 65s linear infinite', 
      },
      keyframes: {
        // Animation for Row A (Moves left-to-right)
        'marquee-left': {
          '0%': { transform: 'translateX(-50%)' }, // Start from the duplicate content side
          '100%': { transform: 'translateX(0%)' }, // End when the original content is visible
        },
        // Animation for Row B (Moves right-to-left)
        'marquee-right': {
          '0%': { transform: 'translateX(0%)' }, // Standard marquee start
          '100%': { transform: 'translateX(-50%)' }, // Standard marquee end
        }
      },
      // Ensure this is still present if you want the hover pause feature
      animationPlayState: {
        pause: 'paused',
      },
      // --- THEME-AWARE COLORS using CSS Variables ---
      // These link Tailwind classes (e.g., bg-app-bg) to CSS variables 
      // which change based on the 'dark' class on the root element.
      colors: {
        // Theme-Aware variables (assuming you define --color-X-light and --color-X-dark in your CSS)
        'app-bg': 'var(--color-app-bg)', 
        'app-text': 'var(--color-app-text)', 
        'comp-bg': 'var(--color-comp-bg)', 
        'comp-text': 'var(--color-comp-text)',
        'btnColor': 'var(--color-btnColor)',
        
        // Static colors can remain here
        'linkColor': "#2a5bd7",
      },

      // --- Custom Gradients ---
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #3b82f6, #9333ea)",
        "custom-gradient-2": "linear-gradient(to left, #3b82f6, #f43f5e)",
        "card-gradient": "linear-gradient(to right, #38b2ac, #4299e1)",
        "dark-bg-gradient": "radial-gradient(at 0% 0%, #172554 0px, transparent 50%), radial-gradient(at 100% 100%, #1e40af 0px, transparent 50%)",
      },
      
      // --- Custom Shadows ---
      boxShadow: {
        custom: "0 0 15px rgba(0, 0, 0, 0.3)",
        right: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)",
        'dark-card': '0 4px 15px rgba(59, 130, 246, 0.3)',
      },
      
      // --- Custom Fonts ---
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat"],
        righteous: ['Righteous', 'cursive'],
        lobster: ['Lobster', 'cursive'],  
      },
    },
  },

  plugins: [],
};

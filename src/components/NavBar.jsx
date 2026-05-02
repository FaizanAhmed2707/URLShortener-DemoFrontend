import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaUserCircle, FaHome } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { useStoreContext } from "../contextApi/ContextApi";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "../contextApi/ThemeContext"; 

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken, currentUser } = useStoreContext(); // Assuming currentUser has name, email, etc.
    const path = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [isHoveringLogout, setIsHoveringLogout] = useState(false); 
    // const { theme } = useTheme(); // Removed as per best practice (Theme applied at root HTML)

    const onLogOutHandler = () => {
        setToken(null);
        localStorage.removeItem("JWT_TOKEN");
        navigate("/login");
    };

    // --- PERFECTED LINK STYLING LOGIC ---
    const getLinkClasses = (linkPath) => {
        // Base classes: Use theme variable for text color (text-app-text)
        const baseClasses = "text-app-text/90 transition-colors duration-300 py-2 px-3 rounded-md font-medium text-base hover:text-btnColor w-full";
        
        // Active classes: Use theme variable for text and border color (text-btnColor, border-btnColor)
        const activeClasses = "text-btnColor font-bold border-b-2 border-btnColor";

        const isActive = path === linkPath;

        return `${baseClasses} sm:border-b-0 ${isActive ? activeClasses : ''}`;
    };

    // --- MOBILE MENU & ICON VISUALS ---
    // Only use custom theme colors.
    const mobileMenuClasses = "bg-comp-bg shadow-2xl border-b border-gray-200 dark:border-gray-700";
    const mobileIconColor = "text-btnColor"; // Removed redundant 'dark:text-blue-400'

    // Simple user display: Show name if logged in
    const userDisplayName = currentUser?.name || currentUser?.username || (currentUser?.email ? currentUser.email.split('@')[0] : "User");

    return (
        // Header Container: Uses bg-comp-bg (which resolves to correct light/dark color)
        <div className="h-16 bg-comp-bg shadow-xl dark:shadow-slate-950/70 
                         z-50 flex items-center sticky top-0 transition-colors duration-500 border-b border-gray-100 dark:border-gray-800/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 w-full flex justify-between">
                
                {/* Logo/Brand */}
                <Link to="/" className="flex items-center group">
                    <h1 className="font-righteous font-extrabold text-3xl text-btnColor transition-colors duration-500 group-hover:opacity-90">
                        LinkShrinky
                    </h1>
                </Link>
                
                {/* Navigation and Actions Wrapper */}
                <div className="flex items-center">

                    {/* --- PRIMARY NAVIGATION LINKS (UL - Desktop & Mobile) --- */}
                    <ul
                        className={`
                            flex sm:gap-6 lg:gap-8 sm:items-center transition-all duration-300 ease-in-out
                            sm:static absolute left-0 top-16 sm:shadow-none sm:h-fit sm:w-fit sm:flex-row flex-col
                            w-full px-4 sm:px-0 py-3 sm:py-0
                            ${navbarOpen ? "h-fit " + mobileMenuClasses : "h-0 overflow-hidden"} 
                        `}
                    >
                        
                        {/* Home Link */}
                        <li className="p-1 sm:p-0">
                            <Link to="/" onClick={() => setNavbarOpen(false)} className={getLinkClasses("/")}>
                                <span className="flex items-center gap-3"> <FaHome className={`text-xl sm:text-lg ${mobileIconColor}`} /> Home </span>
                            </Link>
                        </li>
                        
                        {/* About Link */}
                        <li className="p-1 sm:p-0">
                            <Link to="/about" onClick={() => setNavbarOpen(false)} className={getLinkClasses("/about")}>
                                <span className="flex items-center gap-3"> <FaCircleInfo className={`text-xl sm:text-lg ${mobileIconColor}`} /> About </span>
                            </Link>
                        </li>
                        
                        {/* Dashboard Link (Conditional) */}
                        {token && (
                            <li className="p-1 sm:p-0">
                                <Link to="/dashboard" onClick={() => setNavbarOpen(false)} className={getLinkClasses("/dashboard")}>
                                    <span className="flex items-center gap-3"> <FaUserCircle className={`text-xl sm:text-lg ${mobileIconColor}`} /> Dashboard </span>
                                </Link>
                            </li>
                        )}
                        
                        {/* Authentication Actions (Logged Out/In) */}
                        <li className="mt-3 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200 dark:border-gray-700 w-full">
                            {!token ? (
                                // Sign Up Button: Uses bg-btnColor for primary action
                                <Link to="/register" onClick={() => setNavbarOpen(false)} className="
                                    bg-btnColor text-white font-semibold px-5 py-2 rounded-full shadow-lg 
                                    hover:bg-blue-700 dark:hover:bg-blue-500 transition-all duration-300 w-full block text-center transform hover:scale-[1.01]
                                ">
                                    Sign Up
                                </Link>
                            ) : (
                                // Personalized Logout Button: Shows user name on desktop, hover to logout
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                                    {/* User Details Display (Mobile: Inline, Desktop: Next to button) */}
                                    <div className="sm:hidden flex items-center gap-3 py-2 px-3 bg-comp-bg-hover rounded-md">
                                        <FaUserCircle className="text-2xl text-btnColor" />
                                        <div>
                                            <p className="font-bold text-app-text">{userDisplayName}</p>
                                            {currentUser?.email && <p className="text-sm text-app-text/60">{currentUser.email}</p>}
                                        </div>
                                    </div>
                                    <div className="hidden sm:flex items-center gap-2 text-app-text">
                                        <FaUserCircle className="text-lg" />
                                        <span className="font-medium">{userDisplayName}</span>
                                    </div>
                                    <button
                                        onClick={onLogOutHandler}
                                        onMouseEnter={() => setIsHoveringLogout(true)}
                                        onMouseLeave={() => setIsHoveringLogout(false)}
                                        className={`
                                            text-white font-semibold px-5 py-2 rounded-full shadow-lg transition-all duration-300
                                            ${isHoveringLogout 
                                                ? 'bg-rose-600 hover:bg-rose-700' 
                                                : 'bg-green-600 hover:bg-green-700' 
                                            } transform hover:scale-[1.01] w-full sm:w-auto
                                        `}
                                    >
                                        {isHoveringLogout ? 'Log Out' : 'Logged In'} 
                                    </button>
                                </div>
                            )}
                        </li>
                        
                    </ul>

                    {/* --- UTILITIES: THEME SWITCHER & MOBILE TOGGLE --- */}
                    <div className="flex items-center gap-2 sm:ml-4">
                        
                        {/* Theme Switcher */}
                        <ThemeSwitcher /> 

                        {/* Mobile Menu Toggle */}
                        <button
                            // Use theme-aware text for the icon
                            className="sm:hidden text-app-text text-3xl p-1 transition-colors duration-300 hover:text-btnColor"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                            aria-label="Toggle navigation menu"
                        >
                            {navbarOpen ? <RxCross2 /> : <IoIosMenu />}
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Navbar;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaUserCircle, FaHome } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { useStoreContext } from "../contextApi/ContextApi";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  
  // New State: Track if the mouse is hovering over the LogOut button
  const [isHoveringLogout, setIsHoveringLogout] = useState(false); 

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  return (
    <div className="h-16 bg-custom-gradient z-50 flex items-center sticky top-0 ">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
        <Link to="/">
          <h1 className="font-bold text-3xl text-white italic sm:mt-0 mt-2">
            LinkShrinky
          </h1>
        </Link>
        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center sm:mt-1 sm:pt-0 pt-3 text-slate-800 sm:static absolute left-0 top-[62px] sm:shadow-none shadow-md ${
            navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          } transition-all duration-100 sm:h-fit sm:bg-none bg-custom-gradient sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}
        >
          {/* Home Link with FaHome Icon */}
          <li className="flex items-center gap-1 hover:text-btnColor font-[500] transition-all duration-150">
            <FaHome className="text-white text-xl sm:text-lg" />
            <Link
              className={`${
                path === "/" ? "text-white font-semibold" : "text-gray-200"
              }`}
              to="/"
            >
              Home
            </Link>
          </li>
          
          {/* About Link with FaCircleInfo Icon */}
          <li className="flex items-center gap-1 hover:text-btnColor font-[500] transition-all duration-150">
            <FaCircleInfo className="text-white text-xl sm:text-lg" />
            <Link
              className={`${
                path === "/about" ? "text-white font-semibold" : "text-gray-200"
              }`}
              to="/about"
            >
              About
            </Link>
          </li>
          
          {/* Dashboard Link and User Icon (Conditionally Rendered) */}
          {token && (
            <li className="flex items-center gap-1 hover:text-btnColor font-[500] transition-all duration-150">
                <FaUserCircle className="text-white text-xl sm:text-lg" /> 
                <Link
                    className={`${
                        path === "/dashboard" ? "text-white font-semibold" : "text-gray-200"
                    }`}
                    to="/dashboard"
                >
                    Dashboard
                </Link>
            </li>
          )}
          
          {!token && (
            <Link to="/register">
              <li className="
                  sm:ml-0 -ml-1 
                  bg-white text-gray-800 
                  cursor-pointer w-24 text-center 
                  font-bold px-3 py-1.5 rounded-full 
                  shadow-md 
                  transition-all duration-300 
                  hover:bg-gray-100 hover:text-indigo-600 hover:shadow-lg
              ">
                  SignUp
              </li>
            </Link>
          )}

          {/* DYNAMIC LOGOUT BUTTON */}
          {token && (
            <button
              onClick={onLogOutHandler}
              // Set state on mouse enter/leave
              onMouseEnter={() => setIsHoveringLogout(true)}
              onMouseLeave={() => setIsHoveringLogout(false)}
              
              // Apply dynamic class names based on hover state
              className={`
                sm:ml-0 -ml-1 text-white cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md transition-colors duration-200
                ${isHoveringLogout 
                  ? 'bg-rose-700 hover:bg-rose-800' // Red when hovering
                  : 'bg-green-600' // Green normally
                }
              `}
            >
              {/* Dynamic Button Text */}
              {isHoveringLogout ? 'Log Out' : 'Logged In'} 
            </button>
          )}
          
        </ul>
        {/* ... (Mobile menu button) */}
      </div>
    </div>
  );
};

export default Navbar;
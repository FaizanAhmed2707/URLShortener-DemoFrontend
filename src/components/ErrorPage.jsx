import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ErrorPage = ({ message }) => {
    const navigate = useNavigate();
    
    // Use theme text color for main elements
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-6 text-app-text transition-colors duration-500">
            
            {/* High contrast, branded icon */}
            <FaExclamationTriangle className='text-7xl text-red-600 dark:text-red-400 mb-6' />
            
            {/* Heading */}
            <h1 className='text-4xl font-extrabold mb-3 text-app-text transition-colors duration-500'>
                Oops! Something went wrong.
            </h1>
            
            {/* Error Message */}
            <p className='text-app-text/70 text-lg mb-8 text-center transition-colors duration-500 max-w-md'>
                {message ? message : "We couldn't find the page you were looking for, or an unexpected error has occurred."}
            </p>
            
            {/* CTA Button */}
            <button onClick={() => {
                navigate("/");
            }}
            className='px-6 py-3 bg-btnColor text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-500 transition-all duration-300 transform hover:scale-[1.05]'
            >
                Go back to safety (Home)
            </button>
        </div>
    )
}

export default ErrorPage
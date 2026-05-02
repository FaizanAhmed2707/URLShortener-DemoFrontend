import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from './TextField'; // Assuming this component is available
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast'; // Used for success/failure feedback
import { useStoreContext } from '../contextApi/ContextApi';
import { FaSignInAlt, FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'; // Added FaLock and FaUser
import { RotatingLines } from 'react-loader-spinner';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { setToken, setCurrentUser } = useStoreContext(); 

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid } 
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
            rememberMe: false,
        },
        mode: "onTouched",
    });

    const loginHandler = async (data) => {
        setLoader(true);
        try {
            const { data: response } = await api.post("/api/auth/public/login", data);
            
            // Extract and store user details
            const { token, id, username, email } = response;
            const userDetails = {
                id: id,
                username: username,
                email: email
            };
            
            // Set context and storage
            setToken(token);
            setCurrentUser(userDetails); 

            const storage = data.rememberMe ? localStorage : sessionStorage;
            const oppositeStorage = data.rememberMe ? sessionStorage : localStorage;

            storage.setItem("JWT_TOKEN", JSON.stringify(token));
            storage.setItem("USER_DETAILS", JSON.stringify(userDetails));

            oppositeStorage.removeItem("JWT_TOKEN");
            oppositeStorage.removeItem("USER_DETAILS"); 
            
            // Amazing Toast Feedback (Using a more specific variant)
            toast.success("Welcome back, " + username + "! Login Successful.", {
                icon: '👋', // Use a friendly icon
                duration: 3000,
            });
            
            reset();
            navigate("/dashboard");

        } catch (error) {
            console.error("Login Error:", error);
            const message = error.response?.data?.message || "Login Failed! Please check your credentials.";
            toast.error(message); 
        } finally {
            setLoader(false);
        }
    };

    // --- Framer Motion Variants for Staggered Input Appearance ---
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1, // Stagger the appearance of children
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 100 }
        },
    };

    // --- Render Component ---
    return (
        <div className='min-h-[calc(100vh-64px)] flex justify-center items-center transition-colors duration-500 p-4 bg-page-bg'>
            
            <motion.form 
                onSubmit={handleSubmit(loginHandler)}
                // Use containerVariants for the initial animation
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-sm md:max-w-md bg-comp-bg dark:bg-gray-800 shadow-2xl dark:shadow-dark-card py-10 sm:px-12 px-6 rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors duration-500"
            >
                <motion.div variants={itemVariants} className="flex flex-col items-center mb-6">
                    <FaSignInAlt className="text-5xl text-btnColor mb-4"/>
                    <h1 className="font-montserrat text-app-text font-extrabold text-3xl transition-colors duration-500">
                        Welcome Back
                    </h1>
                    <p className='text-sm text-app-text/60 mt-1'>Sign in to manage your links.</p>
                </motion.div>

                <hr className='mt-2 mb-8 border-gray-300 dark:border-gray-600'/>

                <div className="flex flex-col gap-6">
                    <motion.div variants={itemVariants}>
                        <TextField
                            label="Username or Email" // Improved Label
                            required
                            id="username"
                            type="text"
                            icon={<FaUser />} // Added Icon for better UX
                            placeholder="Your username"
                            register={register}
                            errors={errors}
                        />
                    </motion.div>
                    
                    {/* Password Field with Toggle (Improved Spacing and Icons) */}
                    <motion.div variants={itemVariants} className="relative">
                        <TextField
                            label="Password"
                            required
                            id="password"
                            icon={<FaLock />} // Added Icon for better UX
                            type={showPassword ? "text" : "password"} 
                            placeholder="Secure password"
                            register={register}
                            errors={errors}
                            min={6}
                        />
                        {/* Visibility Toggle Button: Positioned more cleanly */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute top-1/2 -translate-y-1/2 right-3 mt-2 text-app-text/60 hover:text-btnColor transition-colors duration-200"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                        </button>
                    </motion.div>
                </div>

                {/* "Remember Me" Checkbox and Forgot Password Link (Improved Layout) */}
                <motion.div variants={itemVariants} className="flex justify-between items-center mt-4 mb-8 text-sm">
                    <div className="flex items-center">
                        <input
                            id="rememberMe"
                            type="checkbox"
                            {...register("rememberMe")}
                            className="h-4 w-4 text-btnColor rounded border-gray-300 dark:border-gray-600 focus:ring-btnColor bg-comp-bg dark:bg-gray-700 transition-colors duration-200"
                        />
                        <label htmlFor="rememberMe" className="ml-2 text-app-text/90 dark:text-gray-300 cursor-pointer">
                            Keep me logged in
                        </label>
                    </div>
                    
                    {/* Placeholder for future Forgot Password link */}
                    <Link to="#" className="text-btnColor/80 hover:text-btnColor transition-colors duration-200 font-medium">
                        Forgot Password?
                    </Link>
                </motion.div>

                {/* Submit Button (Motion and Loader integration) */}
                <motion.button
                    variants={itemVariants}
                    disabled={loader || !isValid} 
                    type='submit'
                    className={`
                        bg-btnColor font-semibold text-white w-full py-3 rounded-lg shadow-xl hover:shadow-btnColor/50 
                        transition-all duration-300 flex justify-center items-center gap-2
                        ${loader || !isValid 
                            ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                            : 'hover:bg-blue-700 dark:hover:bg-blue-500 transform hover:scale-[1.02]' // Subtle hover scale
                        }
                    `}>
                    {loader ? (
                        <>
                            <RotatingLines width="20" strokeWidth="5" animationDuration="0.75" strokeColor="white" />
                            Authenticating...
                        </>
                    ) : (
                        <span className='flex items-center gap-2'>
                            <FaSignInAlt /> Login
                        </span>
                    )}
                </motion.button>

                {/* Footer Link (Framer Motion) */}
                <motion.p variants={itemVariants} className='text-center text-sm text-app-text/70 mt-6 transition-colors duration-500'>
                    New to LinkShrinky?
                    <Link to="/register" className='font-bold ml-1 hover:underline'>
                        <span className='text-btnColor hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-200'> Create Account</span>
                    </Link>
                </motion.p>
            </motion.form>
        </div>
    );
};

export default LoginPage;
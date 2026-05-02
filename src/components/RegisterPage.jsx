import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { FaUserPlus, FaUser, FaLock, FaEnvelope } from 'react-icons/fa'; // Added FaUser, FaLock, FaEnvelope
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; 
import { RotatingLines } from 'react-loader-spinner';
import { motion } from 'framer-motion';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 

    const {
        register,
        handleSubmit,
        watch, 
        reset,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onTouched",
    });

    const password = watch("password", ""); 

    const registerHandler = async (data) => {
        setLoader(true);
        try {
            const apiData = {
                username: data.username,
                email: data.email,
                password: data.password,
            };

            await api.post("/api/auth/public/register", apiData);
            
            reset();
            
            // --- Enhanced Toast Feedback ---
            toast.success(`Success! Account created for ${data.username}. Please log in now.`, {
                icon: '🎉',
                duration: 3500,
            });
            
            navigate("/login");
        } catch (error) {
            console.error("Registration Error:", error);
            const message = error.response?.data?.message || "Registration failed. This username or email may already be taken.";
            toast.error(message);
        } finally {
            setLoader(false);
        }
    };
    
    // Toggle function
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    // Determine the input type dynamically
    const passwordInputType = showPassword ? "text" : "password";

    // --- Framer Motion Variants ---
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

    return (
        <div className='min-h-[calc(100vh-64px)] flex justify-center items-center transition-colors duration-500 p-4 bg-page-bg'>
            
            <motion.form 
                onSubmit={handleSubmit(registerHandler)}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-sm md:max-w-md bg-comp-bg dark:bg-gray-800 shadow-2xl dark:shadow-dark-card py-10 sm:px-12 px-6 rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors duration-500"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="flex flex-col items-center mb-6">
                    <FaUserPlus className="text-5xl text-btnColor mb-4"/>
                    <h1 className="font-montserrat text-app-text font-extrabold text-3xl transition-colors duration-500">
                        Join LinkShrinky
                    </h1>
                    <p className='text-sm text-app-text/60 mt-1'>Create your secure account below.</p>
                </motion.div>

                <hr className='mt-2 mb-8 border-gray-300 dark:border-gray-600'/>

                {/* Input Fields */}
                <div className="flex flex-col gap-6">
                    
                    <motion.div variants={itemVariants}>
                        <TextField
                            label="Username"
                            required
                            id="username"
                            type="text"
                            icon={<FaUser />} // Added Icon
                            placeholder="Choose a unique username"
                            register={register}
                            errors={errors}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <TextField
                            label="Email"
                            required
                            id="email"
                            type="email"
                            icon={<FaEnvelope />} // Added Icon
                            placeholder="Enter your email"
                            register={register}
                            errors={errors}
                        />
                    </motion.div>

                    {/* Password Field */}
                    <motion.div variants={itemVariants} className="relative">
                        <TextField
                            label="Password"
                            required
                            id="password"
                            icon={<FaLock />} // Added Icon
                            type={passwordInputType} 
                            placeholder="Set a strong password"
                            register={register}
                            errors={errors}
                            min={6}
                        />
                        {/* Visibility Toggle Button */}
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 -translate-y-1/2 mt-2 text-app-text/60 hover:text-btnColor transition-colors duration-200"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                        </button>
                    </motion.div>

                    {/* Password Confirmation Field */}
                    <motion.div variants={itemVariants} className="relative">
                        <TextField
                            label="Confirm Password"
                            required
                            id="confirmPassword"
                            icon={<FaLock />} // Added Icon
                            type={passwordInputType} 
                            placeholder="Re-enter password"
                            register={register}
                            errors={errors}
                            validate={(value) => value === password || "Passwords do not match"}
                        />
                        {/* Visibility Toggle Button (Same logic) */}
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 -translate-y-1/2 mt-2 text-app-text/60 hover:text-btnColor transition-colors duration-200"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                        </button>
                    </motion.div>
                </div>

                {/* Submit Button */}
                <motion.button
                    variants={itemVariants}
                    disabled={loader || !isValid} 
                    type='submit'
                    className={`
                        bg-btnColor font-semibold text-white w-full py-3 rounded-lg shadow-xl hover:shadow-btnColor/50 
                        transition-all duration-300 flex justify-center items-center gap-2 mt-8 mb-4
                        ${loader || !isValid 
                            ? 'bg-gray-400 cursor-not-allowed shadow-none'
                            : 'hover:bg-blue-700 dark:hover:bg-blue-500 transform hover:scale-[1.02]'
                        }
                    `}>
                    {loader ? (
                        <>
                            <RotatingLines width="20" strokeWidth="5" animationDuration="0.75" strokeColor="white" />
                            Registering...
                        </>
                    ) : (
                        <span className='flex items-center gap-2'>
                            <FaUserPlus /> Register
                        </span>
                    )}
                </motion.button>

                {/* Footer Link */}
                <motion.p variants={itemVariants} className='text-center text-sm text-app-text/70 mt-4 transition-colors duration-500'>
                    Already have an account? 
                    <Link to="/login" className='font-bold ml-1 hover:underline'>
                        <span className='text-btnColor hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-200'> Login</span>
                    </Link>
                </motion.p>
            </motion.form>
        </div>
    );
};

export default RegisterPage;
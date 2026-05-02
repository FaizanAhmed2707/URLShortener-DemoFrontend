// src/pages/AboutPage.jsx

import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaLock, FaStar, FaHeart, FaArrowRight } from "react-icons/fa"; // Simplified imports

// --- ADD this new import ---
import HorizontalMarquee from "../components/HorizontalMarquee";

// ---------------------------------

// --- Core Values Data (Unchanged) ---
const values = [
    { icon: FaRocket, title: "Blazing Fast", description: "Our infrastructure is built for speed and reliability, ensuring your links load instantly, anywhere in the world." },
    { icon: FaLock, title: "Secure & Private", description: "We prioritize link integrity and data protection with robust measures, so your data remains safe and secure." },
    { icon: FaHeart, title: "Built with Passion", description: "LinkShrinky is a community project driven by the desire to provide great tools—and it always will be." },
    { icon: FaStar, title: "Simply Reliable", description: "Experience the ease of use with professional-grade uptime and zero unnecessary complexities." },
];

const itemVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const containerVariant = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const AboutPage = () => {
    return (
        <div className="min-h-screen">
            
            {/* -------------------- 1. PERSONAL HERO / MISSION SECTION (NO CHANGE) -------------------- */}
            <div className="bg-comp-bg dark:bg-gray-900 py-16 sm:py-24 border-b border-gray-200 dark:border-gray-800 transition-colors duration-500">
                 {/* ... content remains the same ... */}
                 <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col md:flex-row items-center md:text-left text-center max-w-4xl mx-auto gap-10"
                    >
                        {/* ... founder content ... */}
                         <div className="w-36 h-36 md:w-48 md:h-48 flex-shrink-0 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden shadow-2xl border-4 border-btnColor/30">
                            <img 
                                src={"/images/FounderPhoto2.jpeg"} 
                                alt="Photo of Syed Faizan Ahmed, Founder of LinkShrinky" 
                                className="w-full h-full object-cover" 
                            />
                        </div>

                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-app-text mb-2 transition-colors duration-500">
                                Built by a Developer, <span className="text-blue-600">for Everyone who Values Simplicity.</span>
                            </h1>
                            <p className="text-xl text-app-text/80 transition-colors duration-500">
                                "LinkShrinky exists because the alternatives felt sluggish and over-engineered. I built this tool for speed, simplicity, and zero frustration, and I'm sharing my tool with anyone who feels the same way."
                            </p>
                            <p className="text-lg font-semibold text-btnColor mt-3">— Syed Faizan Ahmed, Founder of LinkShrinky</p>
                            <motion.a
                                href="https://www.linkedin.com/in/faizan-ahmed2707/" 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mt-6 inline-flex items-center gap-2.5 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg 
                                            hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 
                                            transition-all duration-300 ease-in-out"
                            >
                                Connect with me
                                <FaArrowRight className="w-4 h-4" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* -------------------- 2. THE ORIGIN STORY (LinkedIn Inspiration) - REMOVED MOTION WRAPPER -------------------- */}
            {/* The content will now be visible immediately below section 1 */}
            <section className="max-w-7xl mx-auto py-20 px-4 sm:px-8">
                {/* REMOVED: <motion.div initial="hidden" whileInView="visible" ... > */}
                
                <h2 className="text-4xl font-bold text-app-text mb-4 text-center transition-colors duration-500">
                    The <span className="text-blue-600">LinkedIn</span> Inspiration
                </h2>
                <p className="text-app-text/70 text-lg mb-12 text-center max-w-3xl mx-auto transition-colors duration-500">
                    This project was born out of observing professional communication and realizing an essential missing piece.
                </p>
                
                <div className="flex flex-col md:flex-row items-center gap-10 bg-comp-bg dark:bg-gray-800 p-8 rounded-xl shadow-2xl dark:shadow-dark-card border border-gray-100 dark:border-gray-700">
                    
                    <div className="md:w-1/2">
                        <h3 className="text-3xl font-bold text-btnColor mb-4">From Idea to Essential Tool</h3>
                        <p className="text-app-text/90 text-lg mb-4 leading-relaxed transition-colors duration-500">
                            The idea for LinkShrinky actually came to me while scrolling through <strong>LinkedIn.</strong> I noticed how professional posts always feature clean, short links, even when the original URL was massive. It immediately highlighted a problem I, and every other professional, faced: we constantly need that seamless, beautiful link transformation.
                        </p>
                        <p className="text-app-text/90 text-lg mb-4 leading-relaxed transition-colors duration-500">
                            Existing shorteners are often slow, clunky, or lock basic features like <strong>analytics</strong> behind a paywall. I realized I could use my skills in <strong>Spring Boot</strong> and <strong>React</strong> to build a better tool.
                        </p>
                        <p className="text-app-text/90 text-lg leading-relaxed transition-colors duration-500">
                            The goal became simple: create the <strong>fastest, most reliable link shortener available</strong>, offer the core features for <strong>absolutely free</strong>, and make it easy for anyone to sign up and instantly get professional, trackable assets. I built it for my own portfolio, but now I'm sharing it with the world.
                        </p>
                    </div>
                    
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src="/images/LinkShortener2.png" 
                            alt="Illustration of long link going into scanner"
                            className="w-full max-w-sm rounded-lg shadow-xl"
                        />
                    </div>
                </div>
                {/* REMOVED: </motion.div> */}
            </section>
            
            {/* -------------------- 3. ABSOLUTELY FREE HIGHLIGHT - REMOVED MOTION WRAPPER -------------------- */}
            <section className="bg-blue-600 dark:bg-blue-900/50 py-16 transition-colors duration-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
                    <h3 className="text-4xl font-extrabold text-white mb-3">
                        Yes, It's <span className="underline decoration-yellow-300 decoration-4">ABSOLUTELY FREE</span>.
                    </h3>
                    <p className="text-xl text-white/90 mb-6">
                        LinkShrinky is and will remain free for all core link shortening and analytics features. You just need to <strong>sign up or log in</strong>.
                    </p>
                    <p className="text-xl text-white/90 mb-6">
                        No hidden fees, no credit card required.
                    </p>
                </div>
            </section>

            {/* -------------------- 4. CORE VALUES GRID (Motion Kept for Animation) -------------------- */}
            <section className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-8">
                <h2 className="text-4xl font-bold text-app-text mb-12 text-center transition-colors duration-500">
                    Our Promise to You
                </h2>
                
                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="hidden"
                    whileInView="visible" // Animation is fine here, as it's lower down
                    viewport={{ once: true }}
                    variants={containerVariant}
                >
                    {values.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariant}
                            className="bg-comp-bg dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition duration-300 transform hover:scale-[1.02]"
                        >
                            <item.icon className={`text-6xl mx-auto mb-4 text-blue-600`} />
                            <h3 className="text-xl font-bold text-app-text mb-2 transition-colors duration-500">{item.title}</h3>
                            <p className="text-app-text/70 text-sm transition-colors duration-500">{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
            
            {/* -------------------- 5. TECHNOLOGY STACK & FOUNDATION (Motion Kept for Animation) -------------------- */}
            <motion.div
                initial="hidden"
                whileInView="visible" // Animation is fine here, as it's the final section
                viewport={{ once: true, amount: 0.1 }}
                variants={itemVariant}
            >
                <HorizontalMarquee />
            </motion.div>
            {/* -------------------------------------------------------------------------------------- */}

        </div>
    );
};

export default AboutPage;
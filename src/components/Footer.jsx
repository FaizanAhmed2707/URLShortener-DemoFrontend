import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    
    // Define external social links once
    const socialLinks = [
        { icon: FaGithub, href: "https://github.com/FaizanAhmed2707", label: "GitHub" },
        { icon: FaLinkedin, href: "https://www.linkedin.com/in/faizan-ahmed2707/", label: "LinkedIn" },
    ];

    return (
        // Container: Uses theme background, subtle top border, padding, and smooth transition
        <footer className="bg-comp-bg text-app-text/90 py-10 z-40 relative 
                           transition-colors duration-500 border-t border-gray-200 dark:border-gray-700">
            
            <div className="max-w-7xl mx-auto px-6 lg:px-14 flex flex-col items-center gap-6">
                
                {/* Branding & Mission */}
                <div className="text-center space-y-2">
                    <h2 className="font-montserrat text-3xl font-extrabold text-btnColor transition-colors duration-500">
                        LinkShrinky
                    </h2>
                    <p className="text-app-text/70 text-sm max-w-md">
                        Simplifying URL management with powerful tools and a focus on speed and privacy.
                    </p>
                </div>

                {/* --- Primary Navigation & Utility Links --- */}
                <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
                    <Link to="/about" className="text-app-text/70 hover:text-btnColor transition-colors duration-200">
                        About Us
                    </Link>
                    <Link to="/dashboard" className="text-app-text/70 hover:text-btnColor transition-colors duration-200">
                        Dashboard
                    </Link>
                </nav>

                {/* --- Social Icons --- */}
                <div className="flex space-x-6 pt-2">
                    {socialLinks.map((item, index) => (
                        <a 
                            key={index}
                            href={item.href} 
                            className="text-app-text/60 hover:text-btnColor transition-colors duration-300" 
                            aria-label={item.label}
                        >
                            <item.icon size={24} />
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <p className="pt-4 text-gray-500 text-xs">
                    &copy; {new Date().getFullYear()} LinkShrinky. All rights reserved.
                </p>

            </div>
        </footer>
    );
};

export default Footer;
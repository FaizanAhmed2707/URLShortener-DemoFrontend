import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLink, FaChartBar, FaShieldAlt, FaRocket, FaCopy, FaCheck } from "react-icons/fa";
import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import api from '../api/api';
import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";
import { RotatingLines } from "react-loader-spinner";

const features = [
  { icon: FaLink, title: "Instant Shortening", desc: "Generate concise, professional, and memorable URLs in milliseconds. Simplify your sharing process across all platforms." },
  { icon: FaChartBar, title: "Powerful Analytics", desc: "Gain deep insights into your link performance. Track clicks, geographical data, and referral sources effortlessly." },
  { icon: FaShieldAlt, title: "Robust Security", desc: "Rest easy knowing your links are safe. We employ advanced security measures to protect your data and ensure reliable redirects." },
  { icon: FaRocket, title: "Ultimate Reliability", desc: "Enjoy lightning-fast redirects and guaranteed high uptime with our globally distributed, redundant infrastructure." },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState(''); 
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false); 
  
  // CRITICAL FIX: Base URL is the FE address (e.g., localhost:5173)
  // Dynamically pull the correct domain from the browser
  const baseFrontEndUrl = window.location.origin;

  // --- API CALL HANDLER ---
  const handleShorten = async (e) => {
    e.preventDefault();
    if (!longUrl || loading) return;

    setLoading(true);
    setShortUrl('');
    setIsCopied(false);

    try {
      const response = await api.post("/api/urls/shorten", {
        originalUrl: longUrl
      });
      
      // FIX 1: Assemble the final clickable URL using the correct FE domain
      const newShortUrl = `${baseFrontEndUrl}/s/${response.data.shortUrl}`;
      setShortUrl(newShortUrl);
      toast.success("URL Shortened successfully!");
      
    } catch (error) {
      console.error("Shortening Error:", error);
      // Display specific error message to user if available
      const message = error.response?.data?.message || "Error: Failed to shorten URL. Please check server status or URL format.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (e) => {
    setLongUrl(e.target.value);
    setShortUrl(''); 
    setIsCopied(false);
  };

  const handleCtaClick = () => {
    navigate(token ? "/dashboard" : "/login");
  };

  const onCopyHandler = () => {
    setIsCopied(true);
    if (shortUrl) {
      toast.success("Short Link Copied to Clipboard!");
    }
    setTimeout(() => setIsCopied(false), 2000);
  };

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <div className="min-h-screen">
      {/* -------------------- 1. HERO SECTION (INTERACTIVE) -------------------- */}
      <motion.section
        // FIX 1: Reduced padding from lg:px-16 to lg:px-8 for responsiveness
        className="max-w-7xl mx-auto py-24 lg:py-32 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="lg:w-7/12 xl:w-6/12">
          {/* Main Headline */}
          <motion.h1
            // FIX 2: Added mobile-first text sizing (text-4xl sm:text-5xl)
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-app-text leading-tight mb-6 transition-colors duration-500 text-shadow-lg dark:text-shadow-none"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600">Shorten.</span> Analyze.
            <br className="hidden sm:inline" /> Share <span className="text-blue-600">Smarter.</span>
          </motion.h1>

          {/* Subtext (No Change) */}
          <motion.p
            className="text-xl text-app-text/80 mb-12 max-w-lg transition-colors duration-500"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transform long, unwieldy URLs into concise, <strong>trackable assets</strong> instantly. Try it now, absolutely free.
          </motion.p>
          
          {/* --- UPGRADED INTERACTIVE SHORTENING TOOL --- */}
          <motion.form 
            onSubmit={handleShorten}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-xl bg-comp-bg p-3 rounded-2xl shadow-xl dark:shadow-dark-card border border-gray-200 dark:border-gray-700 space-y-4"
          >
            {/* Input and Button Row */}
            {/* FIX 3: Added flex-col sm:flex-row to stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                required
                placeholder="Paste your long URL here (e.g., https://verylong.com/path/to/data)"
                value={longUrl}
                onChange={handleUrlChange}
                // FIX 4: Added min-w-0 to allow the input to shrink in the flex container
                className="flex-grow bg-white dark:bg-gray-700 text-app-text text-lg p-3 rounded-lg outline-none border border-gray-300 dark:border-gray-600 placeholder-app-text/50 focus:border-btnColor min-w-0"
              />
              
              <button
                type="submit"
                disabled={loading || !longUrl}
                // FIX 5: Added w-full (for mobile stack) but sm:w-auto (for desktop row)
                className={`
                  w-full sm:w-auto py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 flex items-center justify-center whitespace-nowrap
                  ${loading || !longUrl 
                    ? 'bg-gray-400 cursor-not-allowed opacity-80' 
                    : 'bg-btnColor hover:bg-blue-700 dark:hover:bg-blue-500'
                  }
                `}
              >
                {loading ? (
                  <RotatingLines width="20" strokeWidth="5" animationDuration="0.75" strokeColor="white" />
                ) : (
                  "Shorten"
                )}
              </button>
            </div>
            
            {/* SHORTENED RESULT DISPLAY */}
            {shortUrl && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mt-3 flex justify-between items-center shadow-inner border border-gray-200 dark:border-gray-600"
              >
                <a 
                    href={shortUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-btnColor font-mono font-semibold text-md md:text-lg truncate hover:underline mr-4"
                >
                  {shortUrl.replace(/^https?:\/\//, '')}
                </a>
                <CopyToClipboard text={shortUrl} onCopy={onCopyHandler}>
                  <button
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-white font-semibold transition-all duration-300 ${
                      isCopied ? 'bg-green-600' : 'bg-btnColor hover:bg-blue-700'
                    }`}
                  >
                    {isCopied ? <FaCheck /> : <FaCopy />}
                    {isCopied ? 'Copied' : 'Copy URL'}
                  </button>
                </CopyToClipboard>
              </motion.div>
            )}
            {/* --- END UPGRADED INTERACTIVE TOOL --- */}
          </motion.form>


          {/* CTA Buttons - Focus on Sign Up/Dashboard (No Change) */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              onClick={handleCtaClick}
              className="bg-btnColor hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-full shadow-xl transition duration-300 transform hover:scale-[1.02]"
            >
              {token ? "Go to Dashboard" : "Sign Up & Get Analytics"}
            </button>
          </motion.div>

        </div>

        {/* Hero Image / Illustration (No Change) */}
        <motion.div
          className="lg:w-5/12 xl:w-6/12 flex justify-center mt-10 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <img
            src={"/images/LinkShortener.png"} 
            alt="Link Shortening Dashboard Analytics Mockup"
            className="w-full max-w-xl rounded-xl shadow-2xl dark:shadow-blue-900/50"
          />
        </motion.div>
      </motion.section>
      
      {/* -------------------- 2. FEATURES SECTION -------------------- */}
      <section id="features" className="max-w-7xl mx-auto py-20 px-4 sm:px-8 lg:px-16 bg-comp-bg dark:bg-gray-900 shadow-inner dark:shadow-none transition-colors duration-500">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-app-text transition-colors duration-500">
            Why Choose <span className="text-blue-600">LinkShrinky</span>?
          </h2>
          <p className="text-lg text-app-text/70 mt-3 transition-colors duration-500 max-w-2xl mx-auto">
            Get the control, performance, and insights you need to maximize every link you share.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <Card key={index} title={feature.title} desc={feature.desc} icon={feature.icon} />
          ))}
        </div>
      </section>

      {/* -------------------- 3. FINAL CTA SECTION -------------------- */}
      <section className="bg-blue-600 py-24 mt-12">
        <div className="max-w-5xl mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Stop Sharing Clunky Links. Start Sharing Smarter.
          </motion.h2>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            onClick={handleCtaClick}
            className="bg-white text-blue-600 font-bold py-4 px-12 rounded-full text-lg hover:bg-gray-100 shadow-2xl transition duration-300 transform hover:scale-105"
          >
            Get Started Free
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
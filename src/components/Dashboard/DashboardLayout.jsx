import React, { useState } from 'react';
import Graph from './Graph';
import { useStoreContext } from '../../contextApi/ContextApi';
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery';
import ShortenPopUp from './ShortenPopUp';
import { FaLink, FaPlus, FaChartLine, FaClipboardList, FaExternalLinkAlt } from 'react-icons/fa'; 
import ShortenUrlList from './ShortenUrlList';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader'; 
import { motion } from 'framer-motion';

// --- NEW COMPONENT: Stat Card for the header ---
const StatCard = ({ icon: Icon, title, value }) => (
    <motion.div 
        className="bg-comp-bg p-5 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-colors duration-500"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
    >
        <div className="text-left">
            <p className="text-app-text/70 text-sm font-medium">{title}</p>
            <h3 className="text-3xl font-extrabold text-app-text">{value}</h3>
        </div>
        <Icon className="text-4xl text-btnColor/60 dark:text-btnColor/80" />
    </motion.div>
);

// --- UPDATED COMPONENT: DashboardLayout ---
const DashboardLayout = () => {
    const navigate = useNavigate();
    // Destructure currentUser along with token
    const { token, currentUser } = useStoreContext(); 
    const [shortenPopUp, setShortenPopUp] = useState(false);
    
    // --- IMPROVED USERNAME LOGIC ---
    let userName = 'User';
    if (currentUser?.name) {
        userName = currentUser.name;
    } else if (currentUser?.email) {
        // Use the part of the email before the '@' sign
        userName = currentUser.email.split('@')[0];
    }
    
    // State for dynamic chart range selection (New UX feature)
    const [dateRange, setDateRange] = useState('30days'); // '7days', '30days', 'all'

    // Fetch dashboard data. 
    const { isLoading: urlsLoading, data: myShortenUrls, refetch } = useFetchMyShortUrls(token, navigate);
    const { isLoading: clicksLoading, data: totalClicks } = useFetchTotalClicks(token, navigate, dateRange); // Pass date range

    const isLoading = urlsLoading || clicksLoading;

    // --- Derived State for Stat Cards ---
    const totalLinks = myShortenUrls?.length || 0;
    const totalGlobalClicks = totalClicks?.reduce((sum, item) => sum + (item.count || 0), 0) || 0; 

    const listVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.5, 
                staggerChildren: 0.1 
            } 
        },
    };

    function onError() {
      navigate("/error");
    }

    // --- Render Logic ---
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)] transition-colors duration-500">
            <div className="max-w-7xl mx-auto py-12 lg:py-16">
                
                {/* --- 0. Main Dashboard Header (Personalized) --- */}
                <header className="mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-app-text mb-2">
                        Welcome Back, <span className="text-btnColor">{userName}</span> 👋
                    </h1>
                    <p className="text-lg text-app-text/70">
                        Track your links, analyze performance, and create new short URLs instantly.
                    </p>
                </header>
                
                {/* --- 1. Quick Metrics Header --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <StatCard 
                        icon={FaExternalLinkAlt} 
                        title="Total Links Created" 
                        value={totalLinks} 
                    />
                    <StatCard 
                        icon={FaChartLine} 
                        value={totalGlobalClicks} 
                        title={`Total Clicks (${dateRange.toUpperCase()})`} 
                    />
                </div>
                
                {/* --- 2. Analytics Graph Section --- */}
                <motion.div 
                    className="bg-comp-bg p-6 rounded-xl shadow-xl dark:shadow-dark-card transition-colors duration-500 mb-10 border border-gray-100 dark:border-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                        <h2 className="text-2xl font-bold text-app-text flex items-center gap-2">
                            <FaChartLine className="text-btnColor"/> Click Trends
                        </h2>

                        {/* Chart Range Selector (Dynamic UX) */}
                        <select 
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="bg-comp-bg text-app-text border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:ring-btnColor focus:border-btnColor"
                        >
                            <option value="7days">Last 7 Days</option>
                            <option value="30days">Last 30 Days</option>
                            <option value="all">All Time</option>
                        </select>
                    </div>
                    
                    <div className="h-96 relative bg-comp-bg/80 rounded-lg p-4">
                        {totalClicks?.length === 0 ? (
                            <div className="absolute inset-0 flex flex-col justify-center items-center">
                                <FaChartLine className="text-6xl text-btnColor/50 mb-4" /> 
                                <h3 className="text-app-text/70 text-base text-center max-w-sm">
                                    No click data available for the selected period.
                                </h3>
                            </div>
                        ) : ( 
                            // Ensure Graph component can handle the array format: { clickDate: "...", count: N }
                            <Graph graphData={totalClicks} />
                        )}
                    </div>
                </motion.div>

                {/* --- 3. Link Management Header & CTA (Mobile Friendly Update) --- */}
                <div className='py-5 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border-b pb-4 mb-6 border-gray-200 dark:border-gray-700 gap-4'>
                    <h2 className="text-3xl font-bold text-app-text flex items-center gap-3">
                        <FaClipboardList className="text-btnColor"/> Link Management
                    </h2>
                    <motion.button
                        onClick={() => setShortenPopUp(true)}
                        className='
                            bg-btnColor hover:bg-blue-700 dark:hover:bg-blue-500 px-6 py-3 rounded-xl 
                            text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02]
                            w-full sm:w-auto text-center
                        '
                        whileTap={{ scale: 0.98 }}
                    >
                        <FaPlus className="inline me-2 text-lg" />
                        <span className='hidden sm:inline'>Click Here to Create a new Short Link</span>
                        <span className='sm:hidden'>Shorten New Link</span>
                    </motion.button>
                </div>

                {/* --- 4. URL List Section --- */}
                {myShortenUrls?.length === 0 ? (
                    <div className="flex justify-center pt-8">
                        <motion.div 
                            className="flex flex-col gap-4 items-center justify-center p-12 rounded-xl shadow-lg bg-comp-bg border-2 border-dashed border-btnColor/50"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <FaLink className="text-btnColor text-4xl" />
                            <h1 className="text-app-text font-montserrat text-lg font-semibold text-center max-w-xs">
                                No links found! Click 'Shorten New Link' above to get started.
                            </h1>
                        </motion.div>
                    </div>
                ) : (
                    <motion.div 
                        variants={listVariants} 
                        initial="hidden" 
                        animate="visible"
                    >
                        <ShortenUrlList data={myShortenUrls || []} refetchList={refetch} />
                    </motion.div>
                )}
            </div>

            {/* Modal remains unchanged, passing refetch correctly */}
            <ShortenPopUp
                refetch={refetch} 
                open={shortenPopUp}
                setOpen={setShortenPopUp}
            />
        </div>
    );
}

export default DashboardLayout;
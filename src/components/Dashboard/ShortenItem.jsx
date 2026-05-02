import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaExternalLinkAlt, FaRegCalendarAlt, FaChartLine } from 'react-icons/fa'; // Added FaChartLine
import { IoCopy } from 'react-icons/io5';
import { LiaCheckSolid } from 'react-icons/lia';
import { MdOutlineAdsClick } from 'react-icons/md';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../contextApi/ContextApi';
import { Hourglass } from 'react-loader-spinner';
import Graph from './Graph';
import toast from 'react-hot-toast'; // Ensure toast is imported

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate, refetchList }) => {
    const { token } = useStoreContext();
    const navigate = useNavigate();
    const [isCopied, setIsCopied] = useState(false);
    const [analyticToggle, setAnalyticToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [analyticsData, setAnalyticsData] = useState(null); // Changed to null for cleaner loading logic

     // --- ESSENTIAL FIX: Cleaned URL Construction ---
    // Ensure the base URL is reliably pulled from the VITE environment
    const baseFrontEndUrl = import.meta.env.VITE_REACT_FRONT_END_URL || 'http://localhost:5173';
    const baseDomain = baseFrontEndUrl.replace(/^https?:\/\//, '').replace(/\/+$/, '');
    const fullShortUrl = `${baseFrontEndUrl}/s/${shortUrl}`;

    // Reset copy state
    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    // --- FIXED ANALYTICS FETCH FUNCTION ---
    const fetchAnalyticsData = async () => {
        setLoader(true);
        try {
            // FIX 1: Set standard 30-day range
            const endDate = dayjs().format('YYYY-MM-DDTHH:mm:ss');
            const startDate = dayjs().subtract(30, 'days').format('YYYY-MM-DDTHH:mm:ss');
            // FIX 2: Send simplified ISO format (removes .msZ) for better Spring tolerance
            
            const url = `/api/urls/stats/${shortUrl}?startDate=${startDate}&endDate=${endDate}`;
            
            const { data } = await api.get(url, {
                headers: { Authorization: "Bearer " + token },
            });
            
            setAnalyticsData(data);
            
        } catch (error) {
            console.error("Analytics Fetch Error:", error.response || error);
            // Display error to user via toast, do not navigate for a 500 error
            toast.error("Analytics failed to load. The server returned an error (500)."); 
            setAnalyticsData([]); // Set to empty array to display "No Data" message
        } finally {
            setLoader(false);
        }
    }

    const handleAnalyticsToggle = () => {
        setAnalyticToggle(prev => {
            if (!prev && !analyticsData) {
                // Fetch data only if toggling open AND data hasn't been fetched yet
                fetchAnalyticsData();
            }
            return !prev;
        });
    }

    return (
        // --- PREMIUM THEME-AWARE CONTAINER ---
        <div className={`bg-comp-bg dark:bg-gray-800 shadow-xl dark:shadow-dark-card border border-gray-200 dark:border-gray-700 px-6 py-5 rounded-xl transition-all duration-300 hover:shadow-2xl`}>
            
            {/* --- Main Link/Stats Row --- */}
            <div className={`flex sm:flex-row flex-col justify-between w-full gap-5`}>
                
                {/* Link & Original URL Block */}
                <div className="flex-1 space-y-2 max-w-full overflow-hidden">
                    {/* Short URL Link */}
                    <div className="flex items-center gap-2">
                        <Link
                            target='_blank'
                            className='text-lg font-montserrat font-semibold text-linkColor hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200 truncate'
                            to={fullShortUrl}
                        >
                            {baseDomain}/s/{shortUrl} {/* Use the cleaned baseDomain for display */}
                        </Link>
                        <FaExternalLinkAlt className="text-linkColor text-sm" />
                    </div>

                    {/* Original URL (Subtle) */}
                    <h3 className="text-app-text/70 font-normal text-sm truncate">
                        {originalUrl}
                    </h3>

                    {/* Stats */}
                    <div className="flex items-center gap-8 pt-4 text-app-text/90">
                        <div className="flex gap-2 items-center font-semibold text-base">
                            <MdOutlineAdsClick className="text-xl text-green-600 me-1" />
                            <span className="text-xl font-bold">{clickCount}</span>
                            <span className="text-sm text-app-text/70">{clickCount === 1 ? "Click" : "Clicks"}</span>
                        </div>

                        <div className="flex items-center gap-2 font-semibold text-sm">
                            <FaRegCalendarAlt className="text-blue-600" />
                            <span>Created: {dayjs(createdDate).format("MMM DD, YYYY")}</span>
                        </div>
                    </div>
                </div>

                {/* Actions Block (Copy & Analytics) */}
                <div className="flex flex-col sm:flex-row sm:justify-end items-center gap-3 pt-2 sm:pt-0">
                    <CopyToClipboard
                        onCopy={() => setIsCopied(true)}
                        text={fullShortUrl}
                    >
                        {/* Copy Button */}
                        <div className={`flex cursor-pointer gap-2 items-center py-2 px-4 rounded-lg text-white font-semibold transition-all duration-200 shadow-md ${isCopied ? 'bg-green-600 hover:bg-green-700' : 'bg-btnColor hover:bg-blue-700 dark:hover:bg-blue-500'}`}>
                            <button className="w-16 text-center">{isCopied ? "Copied" : "Copy"}</button>
                            {isCopied ? (<LiaCheckSolid className="text-lg" />) : (<IoCopy className="text-lg" />)}
                        </div>
                    </CopyToClipboard>

                    {/* Analytics Toggle Button */}
                    <div
                        onClick={handleAnalyticsToggle}
                        className={`flex cursor-pointer gap-2 items-center py-2 px-4 rounded-lg text-white font-semibold transition-all duration-200 shadow-md ${analyticToggle ? 'bg-gray-500 hover:bg-gray-600' : 'bg-purple-600 hover:bg-purple-700'}`}
                    >
                        <button className="w-16 text-center">{analyticToggle ? "Close" : "Analytics"}</button>
                        <FaChartLine className="text-lg" /> {/* Use FaChartLine for better look */}
                    </div>
                </div>
            </div>

            {/* --- Analytics Graph Expansion --- */}
            <div className={`${analyticToggle ? "block" : "hidden"} pt-6 mt-6 border-t border-gray-200 dark:border-gray-700`}>
                <div className="min-h-80 w-full relative">
                    {loader ? (
                        <div className="absolute inset-0 flex justify-center items-center">
                            <Hourglass height="50" width="50" colors={['#3b82f6', '#9333ea']} ariaLabel="loading-analytics" />
                            <p className='text-app-text/70 ml-3'>Loading analytics...</p>
                        </div>
                    ) : analyticsData && analyticsData.length > 0 ? (
                        <Graph graphData={analyticsData} />
                    ) : (
                        <div className="absolute inset-0 flex flex-col justify-center items-center">
                            <FaChartLine className="text-5xl text-btnColor/50 mb-3" />
                            <h1 className="text-app-text font-bold text-xl mb-1">No Data Available</h1>
                            <p className="text-app-text/70 text-sm">No click data found for the last 30 days for this link.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShortenItem;
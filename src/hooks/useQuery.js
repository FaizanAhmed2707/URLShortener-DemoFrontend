import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import dayjs from 'dayjs'; // Assuming you have dayjs installed for date manipulation

// --- Utility function to calculate dynamic dates ---
const getDateRange = (range) => {
    const endDate = dayjs().format('YYYY-MM-DD');
    let startDate;

    if (range === 'all') {
        // Set a distant past date for "All Time"
        startDate = '2024-01-01'; 
    } else if (range === '7days') {
        startDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
    } else { // '30days' (default)
        startDate = dayjs().subtract(30, 'day').format('YYYY-MM-DD');
    }
    
    // Spring Boot expects ISO_LOCAL_DATE (YYYY-MM-DD)
    return { startDate, endDate };
};

// --- Hook 1: Fetch User's Shortened URLs ---
export const useFetchMyShortUrls = (token, navigate) => {
    return useQuery({
        // Updated queryKey for clarity
        queryKey: ["userUrls"], 
        queryFn: async () => {
            const response = await api.get(
                "/api/urls/myurls",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
            return response.data; // Return raw data array
        },
        // Select logic remains the same (sorting by date)
        select: (data) => {
            return data.sort(
                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
            );
        },
        onError: (error) => {
            // Use navigation prop passed from DashboardLayout
            if (error.response?.status === 401 || error.response?.status === 403) {
                 toast.error("Session expired. Please log in again.");
                 navigate("/login");
            } else {
                 navigate("/error");
            }
        },
        staleTime: 5000,
        // Only run if token exists
        enabled: !!token, 
    }); 
};

// --- Hook 2: Fetch Total Clicks (Dynamic Range) ---
// Now accepts the dateRange string from the selector
export const useFetchTotalClicks = (token, navigate, dateRange) => {
    
    const { startDate, endDate } = getDateRange(dateRange);

    return useQuery({
        // CRITICAL FIX: The queryKey must include the dynamic dateRange 
        // to ensure data refetches whenever the selector changes.
        queryKey: ["totalClicks", dateRange], 
        queryFn: async () => { 
            const url = `/api/urls/totalClicks?startDate=${startDate}&endDate=${endDate}`;
            
            const response = await api.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            return response.data;
        },
        // Transformation logic to convert the map { date: count } to an array of objects
        select: (data) => {
            // data.data => { "2024-01-01": 120, ... }
            const convertedData = Object.keys(data).map((key) => ({
                clickDate: key,
                count: data[key],
            }));
            
            // NOTE: The Graph component might expect an array structure like this:
            // [ { clickDate: "2024-01-01", count: 120 }, ... ]
            return convertedData; 
        },
        onError: (error) => {
            // Same error handling as above
            if (error.response?.status === 401 || error.response?.status === 403) {
                 toast.error("Session expired. Please log in again.");
                 navigate("/login");
            } else {
                 navigate("/error");
            }
        },
        staleTime: 5000,
        // Only run if token exists
        enabled: !!token, 
    }); 
};
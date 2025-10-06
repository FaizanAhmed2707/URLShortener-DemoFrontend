import { useQuery } from "@tanstack/react-query"
import api from "../api/api"

export const useFetchMyShortUrls = (token, onError) => {
    return useQuery({ // <--- START: Single configuration object
        queryKey: ["my-shortenurls"], // V5 requires queryKey as an array
        queryFn: async () => {        // V5 uses queryFn for the fetcher function
            return await api.get(
                "/api/urls/myurls",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
        },
        // Options are now merged into the same object
        select: (data) => {
            const sortedData = data.data.sort(
                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
            );
            return sortedData;
        },
        onError,
        staleTime: 5000
    }); // <--- END: Single configuration object
};

export const useFetchTotalClicks = (token, onError) => {
    return useQuery({ // <--- START: Single configuration object
        queryKey: ["url-totalclick"], // V5 requires queryKey as an array
        queryFn: async () => {         // V5 uses queryFn for the fetcher function
            return await api.get(
                "/api/urls/totalClicks?startDate=2024-01-01&endDate=2025-12-31",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
        },
        // Options are now merged into the same object
        select: (data) => {
            // data.data => { "2024-01-01": 120, ... }
            const convertToArray = Object.keys(data.data).map((key) => ({
                clickDate: key,
                count: data.data[key],
            }));
            // FINAL: [ { clickDate: "2024-01-01", count: 120 }, ... ]
            return convertToArray;
        },
        onError,
        staleTime: 5000
    }); // <--- END: Single configuration object
};
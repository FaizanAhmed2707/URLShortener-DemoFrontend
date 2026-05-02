import React, { useState } from 'react';
import { useStoreContext } from '../../contextApi/ContextApi';
import { useForm } from 'react-hook-form';
import TextField from '../TextField';
import { Tooltip } from '@mui/material';
import { RxCross2 } from 'react-icons/rx';
import api from '../../api/api';
import toast from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import { useQueryClient } from '@tanstack/react-query'; // <-- NEW IMPORT

// The component receives 'setOpen' and 'refetch' (or whatever prop triggers the refresh)
const CreateNewShorten = ({ setOpen, refetch }) => { 
    const { token } = useStoreContext();
    const [loading, setLoading] = useState(false);
    
    // Get the query client instance
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            originalUrl: "",
        },
        mode: "onTouched",
    });

    const createShortUrlHandler = async (data) => {
        setLoading(true);
        try {
            // Include Authorization header for logged-in users only
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
            };
            if (token) {
                headers.Authorization = "Bearer " + token;
            }

            const { data: res } = await api.post("/api/urls/shorten", data, { headers });

            const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${res.shortUrl}`;
            
            // 1. Invalidate cache to trigger real-time UI refresh
            // We assume the Dashboard fetches its data using a query key like 'userUrls'
            queryClient.invalidateQueries({ queryKey: ['userUrls'] });
            
            // 2. Success Feedback & Cleanup
            await navigator.clipboard.writeText(shortenUrl);
            toast.success("Short URL Copied to Clipboard!", { position: "bottom-center", className: "mb-5", duration: 3000 });

            reset();
            setOpen(false);

        } catch (error) {
            toast.error(error.response?.data?.message || "Create ShortURL Failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className=" flex justify-center items-center bg-comp-bg rounded-md">
            <form
                onSubmit={handleSubmit(createShortUrlHandler)}
                className="sm:w-[450px] w-[360px] relative bg-comp-bg shadow-2xl dark:shadow-dark-card pt-8 pb-5 sm:px-8 px-4 rounded-lg border border-gray-100 dark:border-gray-700"
            >

                <h1 className="font-montserrat sm:mt-0 mt-3 text-center font-bold sm:text-2xl text-[22px] text-app-text">
                    Create New Shorten Url
                </h1>

                <hr className="mt-2 sm:mb-5 mb-3 border-gray-300 dark:border-gray-600" />

                <div>
                    <TextField
                        label="Enter URL"
                        required
                        id="originalUrl"
                        placeholder="https://example.com"
                        type="url"
                        register={register}
                        errors={errors}
                    />
                </div>

                <button
                    className="bg-btnColor font-semibold text-white w-32 py-2 transition-colors rounded-md my-3 hover:bg-blue-700 dark:hover:bg-blue-500"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                         <RotatingLines width="20" strokeWidth="3" animationDuration="0.75" strokeColor="white" />
                    ) : (
                        "Create"
                    )}
                </button>

                {!loading && (
                    <Tooltip title="Close">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute right-2 top-2 text-app-text hover:text-red-500 transition-colors duration-300"
                            type="button" 
                        >
                            <RxCross2 className="text-3xl" />
                        </button>
                    </Tooltip>
                )}

            </form>
        </div>
    )
}

export default CreateNewShorten;


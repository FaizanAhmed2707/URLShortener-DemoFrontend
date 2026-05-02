import Modal from '@mui/material/Modal';
import React from 'react'
import CreateNewShorten from './CreateNewShorten';

const ShortenPopUp = ({ open, setOpen, refetch}) => {

    const handleClose = () => {
        if (!document.querySelector('button[disabled]')) { // Prevent closing if form is submitting
            setOpen(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="shorten-url-modal"
            aria-describedby="form-to-create-a-new-short-url"
        >
            {/* Custom overlay with backdrop-blur */}
            <div className='flex justify-center items-center h-full w-full backdrop-blur-sm bg-black/30 dark:bg-black/70'>
                <CreateNewShorten setOpen={setOpen} refetch={refetch} />
            </div>
        </Modal>
    )
}

export default ShortenPopUp;
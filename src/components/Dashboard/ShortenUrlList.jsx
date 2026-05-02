import React from 'react'
import ShortenItem from './ShortenItem'
import { motion } from 'framer-motion' // Added motion for better integration

// Variant for staggering individual items
const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const ShortenUrlList = ({ data, refetchList }) => { // <-- Added refetchList prop
  return (
    <div className='my-6 space-y-4'>
        {data.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
                <ShortenItem 
                    {...item} 
                    refetchList={refetchList} // <-- Pass refetch function down
                />
            </motion.div>
        ))}
    </div>
  )
}

export default ShortenUrlList
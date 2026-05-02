import React from "react";
import { motion } from "framer-motion";
import { FaRegLightbulb } from 'react-icons/fa'; // Default icon

const Card = ({ title, desc, icon: IconComponent = FaRegLightbulb }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      
      className="
        bg-comp-bg dark:bg-gray-800 
        border-t-4 border-t-blue-600 dark:border-t-blue-500
        border border-gray-200 dark:border-gray-700
        shadow-xl dark:shadow-dark-card
        
        hover:shadow-2xl hover:shadow-blue-300/40 dark:hover:shadow-blue-900/50
        hover:scale-[1.03] 
        transition-all duration-300 ease-in-out 

        flex flex-col p-6 lg:p-8 gap-4 rounded-xl cursor-default
      "
    >
      <div className="flex items-center gap-4 mb-1">
        {/* Icon: Large, branded, and theme-aware */}
        <IconComponent className="text-4xl text-blue-600 dark:text-blue-400" />
        
        {/* Title: Use component text color (comp-text) */}
        <h3 className="text-comp-text text-xl font-extrabold transition-colors duration-300">
          {title}
        </h3>
      </div>
      
      {/* Description: Use a slightly subtle version of component text color */}
      <p className="text-comp-text/80 text-base transition-colors duration-300">
        {desc}
      </p>
    </motion.div>
  );
};

export default Card;
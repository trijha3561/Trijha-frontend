import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ name, bgColor = 'bg-orange-100 ', textAlign = 'text-center', fontFamily = 'font-firs-text-trial-bold', color = 'text-slate-900' }) => {
  return (
    <motion.div 
      className={`py-8 ${bgColor}`} // Increased padding to increase height
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl ${color} ${fontFamily} ${textAlign} font-semibold`}>
          {name}
        </h2>
      </div>
    </motion.div>
  );
};

export default SectionHeader;

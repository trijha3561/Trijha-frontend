'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const WhyTrijhaCard = ({ imageUrl, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className='relative max-w-sm rounded overflow-hidden shadow-lg bg-white'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 1 }}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.img 
        className={`w-full h-64 object-cover transition-all duration-300 ${isHovered ? 'blur-sm opacity-70' : 'opacity-50'}`} 
        src={imageUrl} 
        alt={title}
        initial={{ opacity: 1 }}
        animate={{ opacity: isHovered ? 0.8 : 1 }}
        transition={{ duration: 0.3 }}
      />
      {isHovered && (
        <motion.div 
          className="absolute inset-0 flex flex-col justify-center items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p 
            className='text-gray-600 text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        </motion.div>
      )}
      <div className="bg-orange-50 p-4">
        <h3 className="text-xl font-semibold text-slate-900 font-sans">{title}</h3>
      </div>
    </motion.div>
  );
};

export default WhyTrijhaCard;

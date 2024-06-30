import React from 'react'; 
import { motion } from 'framer-motion';

const Partnerships = ({ partnerships }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-10'>
      {partnerships.map((partnership, index) => ( 
        <div className='flex flex-col justify-center items-center'>
        <a 
          key={index} 
          href={partnership.link} 
          target='_blank' 
          rel='noopener noreferrer' 
          className='my-10'
        >
          <motion.img 
            src={partnership.imageUrl} 
            alt={partnership.name} 
            className='border border-slate-200 rounded-2xl transition-transform x transform hover:scale-110 hover:opacity-75 my-15' 
          />  
        </a> 
        <p className='text-slate-800 text-lg'>{partnership.name}</p>
         </div> 
           
        
      ))}
    </div>
  );
}

export default Partnerships;

'use client';
import React from 'react'; 
import Navbar from './components/Navbar'; 
import ImageSlider from './components/ImageSlider' ;
import SectionHeader from './components/SectionHeader';
import ProductCard from './components/ProductCard'; 
import WhyTrijhaCard from './components/WhyTrijhaCard';

import TestimonialCard from './components/TestimonialCard'
import Partnerships from './components/Partnerships';
import Footer  from './components/Footer';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'; // Importing bigger V-shaped icons 
import {useState} from 'react'; 
import { useRouter } from 'next/navigation';
import {motion} from 'framer-motion';
import Head from 'next/head'; 

//Importing the data 
import bestSellingProducts from './data/bestSellingProducts'
import partnerships from './data/partnerships';
import hoverCardData from './data/hoverCardData.json'
import testimonials from './data/testimonials'




 


const images = [
  { id: 1,
    url: '/Users/harshitverma/Desktop/Trijha_Website/frontend/public/Slider1.png',
    title: 'Welcome to Trijha!',
    caption: 'Explore our services.',
  },
  { id: 2,
    url: '/Users/harshitverma/Desktop/Trijha_Website/frontend/public/Slider2.png',
    title: 'Discover our products.',
    caption: 'Visit our store now.',
  },];
    
const testimonial = testimonials[0]
const Page = () => {  
  const n = testimonials.length
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  /*cart Section */
  const [cart, setCart] = useState([]);
  const router = useRouter();

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const goToCart = () => {
    router.push({
      pathname: '/checkout/cart',
      query: { cart: JSON.stringify(cart) }
    });
  };
  /* */
  const handlePrevClick = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => ((prevIndex -1 + n)%n));
  };

  const handleNextClick = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => ((prevIndex + 1)%n )); 

  };
   
  const getIndex = (index) => { return (currentIndex + index + n)%n};
  return ( 
    
    <div className="relative max-w-full bg-gradient-to-b from-slate-50 via-orange-50 to-pink-50">
      {/* Title of the tab */}
      <Head>
         
        <title><img src='frontend/public/trijha final logo.png'/><p>Trijha</p></title>
      </Head>
      <div class="absolute top-0 -z-10 h-full w-full bg-white"><div class="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div></div>
      <Navbar />  
      {/*<img src='Slider1.png' />*/}
      <ImageSlider images={images} />
      <SectionHeader name="Best Sellers" /> 
      <br />
      <br /> 
      {/* Displaying the best seller products here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 mx-5 gap-8">
        {bestSellingProducts.map(product => (
          <div className='flex justify-center my-4'>
          <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div> 
      <br />

      {/* Why Trijha */}

      <SectionHeader name="Why Trijha?" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {hoverCardData.map(item => ( 
          <div className='flex justify-center my-6'>
              
            <WhyTrijhaCard 
              key={item.id} 
              imageUrl={item.imageUrl} 
              title={item.title} 
              description={item.description}  />
          </div>
          
        ))} 
         
        </div>
        <br />  
        {/*Customer Testimonials Section */}
        <SectionHeader name="Customer Testimonials" />
      <br />
      <div className="flex justify-center items-center w-full"> 
      {/*Adding framer motion to the div */}
        <motion.div className='grid grid-cols-3 gap-4 items-center'
        key={currentIndex}
        initial={{ x: direction * 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction * -100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}> 
          <div className='relative'>
            <TestimonialCard testimonial={testimonials[getIndex(0)] } position='left' />
            <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-600 p-2 rounded-full shadow-md" onClick={handlePrevClick}
          >
        
            <HiChevronLeft className="w-6 h-6" />
          </button>
            
          </div>
          <div className='relative'>
            <TestimonialCard testimonial={testimonials[getIndex(1)]} position='middle' />
            
          </div>
          <div className='relative '>
            <TestimonialCard testimonial={testimonials[getIndex(2)]} position='right' />
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-600 p-2 rounded-full shadow-md" onClick={handleNextClick}
                >
        
            <HiChevronRight className="w-6 h-6" />
          </button>
          </div>
        </motion.div>
      </div>
      <br />
      {/*Partnerships defined */}
        <SectionHeader name="Our Partnerships" /> 
        <Partnerships partnerships={partnerships} /> 
        <br />
        <hr />
        <Footer />
        
      </div>
      

      
    
      
    
  );
};

export default Page; 
// 'use client';
// import React from 'react'
// import {signOut, useSession} from 'next-auth/react';

// const page = () => { 
//   const session = useSession();
//   return (
//     <div>
//       <div>{session?.data?.user?.name}</div>
//       <button onClick={()=> signOut()}>Logout</button>
//       <h1>Setting up</h1>
//     </div>
//   )
// }

// export default page

 'use client';
 import React, {useState, useEffect}from 'react' 
 import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const images =[1,2,3]
 
const ImageSlider = () => { 
    const [imageIndex,setImageIndex] = useState(1); 
    const goPrev = () => {
        setImageIndex(imageIndex === 0 ? images.length - 1 : imageIndex - 1);
      }
      
      const goNext = () => {
        setImageIndex(imageIndex === images.length - 1 ? 0 : imageIndex + 1);
      } 
      /*useEffect(() => {
        const interval = setInterval(goNext, 15000);
        return () => clearInterval(interval);
      }, [imageIndex]);*/  

      useEffect(() => {
        const interval = setInterval(() => {
          setImageIndex((imageIndex) => (imageIndex + 1) % images.length);
        }, 3000); // 5000ms = 5 seconds
    
        // Clean up the interval on component unmount
        return () => clearInterval(interval);
      }, [images.length]);

      const goToSlide =(index) => {setImageIndex(index)}
      
      const imageUrl = `Slider${imageIndex}.png`;

      return (
        <div className='relative h-auto w-full'>
          <div className='relative'>
            <img src={imageUrl} className="w-full bg-black bg-opacity-50 z-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent z-[-5]"></div>
            
            
            <div className="absolute inset-0 flex items-center justify-between z-30 px-4">
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-7 h-7 rounded-full border border-gray-500 ${index === imageIndex ? 'bg-slate-100 bg-opacity-75' : 'bg-slate-400 bg-opacity-50'}`}
                >
                  
                </button>
              ))}
            </div>
            
             
            
              <div className="absolute left-0">
              <FaChevronLeft
          onClick={goPrev}
          className=" flex flex-col text-white cursor-pointer bg-yellow-700 mx-1 justify-end"
          size={32} // Adjust size as needed
        />
                 
              </div>
              <div className="absolute right-0">
              <FaChevronRight
          onClick={goNext}
          className="text-white cursor-pointer bg-yellow-700 mx-1"
          size={32} />
                 
              </div>
            </div>
          </div>
        </div>
      );
      
 }
 
 export default ImageSlider;
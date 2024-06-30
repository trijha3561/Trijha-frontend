import React from 'react';


const TestimonialCard = ({ testimonial,position }) => {  
  //deciding the backgground for the images
  let background = '' 
  let left = false; 
  let right = false;
  if(position == 'left') {background = 'bg-gradient-to-l from-white to-transparent scale-95' 
  left = true }
  else if(position == 'middle') {background = 'bg-white scale-105'} 
  else {background = 'bg-gradient-to-r from-white to-transparent scale-95'} 

  return (
    <div className={`rounded-xl shadow-lg h-96 w-72 my-20 ${background}`}> 
       
      <div className="flex flex-col items-center justify-start h-full p-3 my-2">
        <img src={testimonial.avatar} alt={testimonial.name} className="rounded-full w-24 h-24 my-2 " />
        <div className='flex flex-col items-center justify-center  '>
          <p className="font-bold my-3">{testimonial.name}</p>
        </div>
        <div className="flex items-center mb-4">
          {Array.from({ length: testimonial.stars }, (_, index) => (
            <svg
              key={index}
              className="w-4 h-4 fill-current text-yellow-500 mr-1"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 1l2.6 6.5h6.9l-5.6 4.8 2.1 6.3-5.6-4.8-5.6 4.8 2.1-6.3-5.6-4.8h6.9z" />
            </svg>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center w-full h-auto px-4">
          <p className="text-gray-800 text-center">{testimonial.review}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

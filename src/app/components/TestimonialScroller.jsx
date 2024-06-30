// TestimonialScroller.jsx
import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialScroller = ({ testimonials }) => {
  return (
    <div className="overflow-x-scroll flex space-x-4 py-4">
      {testimonials.map(testimonial => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
};

export default TestimonialScroller;

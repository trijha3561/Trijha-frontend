import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg bg-orange-50'>
      {/* Increased height of the image */}
      <img className='w-full h-64 object-cover' src={product.imageUrl} alt={product.title} />
      <div className='px-6 py-4 text-center'>
        <div className='font-bold text-xl mb-2 text-slate-700'>{product.title}</div>
        <p className='text-gray-700 mx-5 text-base'>{product.description}</p>

        {/* Price display with strikethrough for original price */}
        <div className='my-2'> {/* Changed from my-4 to my-2 */}
          <span className='font-bold'>Starting from</span>
          <div className='text-red-500 line-through'> (₹{product.originalPrice})</div>
          <div className='font-bold text-lg text-green-600'> ₹{product.price}</div>
        </div>

        <div className='flex justify-center'>
        <a href={`/products/${product.id}`} className="my-2 bg-gray-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-900 transition duration-300 ease-in-out">
  Check it out!
</a>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;

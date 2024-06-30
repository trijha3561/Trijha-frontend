import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div className='max-w-sm rounded overlow-hidden shadow-lg bg-orange-50'>
      <img className='w-full h-48 object-cover' src={product.imageUrl} alt={product.title} />
      <div className='px-6 py-4 text-center'>
        <div className='font-bold text-xl mb-2 text-slate-700 '>{product.title}</div>
        <p className='text-gray-700 mx-5 text-base'>{product.description}</p>
        <div className='flex justify-center'>
          <button className="my-5 bg-gray-800 text-white font-bold py-2 px-4 rounded-50 shadow-lg hover:bg-gray-900 transition duration-300 ease-in-out">
            Check it out!
          </button>
        </div>


        
      </div>

    </div>
  )
};

export default ProductCard;
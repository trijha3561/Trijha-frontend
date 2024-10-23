// app/products/[productId]/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import bestSellingProducts from '../../data/bestSellingProducts.json'; // Import product data
import Navbar from '../../components/Navbar'; // Import Navbar
import Cookies from 'js-cookie'; // Import js-cookie for handling token
import axios from 'axios'; // Use axios for API requests

const ProductPage = ({ params }) => {
  const { productId } = params; // Use productId from URL params
  const product = bestSellingProducts.find((p) => p.id === productId); // Find the product by ID
  const images = [product?.imageUrl, product?.imageUrl1, product?.imageUrl2]; // Product images

  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1); // Track quantity of product
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to navigate through images
  const goPrev = () => setImageIndex(imageIndex === 0 ? images.length - 1 : imageIndex - 1);
  const goNext = () => setImageIndex(imageIndex === images.length - 1 ? 0 : imageIndex + 1);

  useEffect(() => {
    const interval = setInterval(goNext, 15000);
    return () => clearInterval(interval);
  }, [imageIndex]);

  // Check if the user is authenticated (using token stored in cookies)
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to add product to cart using backend API
  const handleAddToCart = async () => {
    const token = Cookies.get('token'); // Retrieve token from cookies

    if (!token) {
      toast.error('Please sign in to add items to your cart');
      return;
    }

    if (quantity < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }

    try {
      // Make a POST request to the backend to add the product to the cart
      const response = await axios.post(
        'https://trijha-backend.vercel.app/cart/update',
        {
          cartItems: [
            {
              productId: product.id,
              title: product.title,
              price: product.price,
              quantity: quantity, // Selected quantity
              imageUrl: product.imageUrl,
              addedAt: new Date(),
            },
          ],
          idToken: token, // Pass the token for authentication
        }
      );

      if (response.data.message) {
        toast.success('Product added to cart!');
      } else {
        toast.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart');
    }
  };

  if (!product) {
    return (
      <div className="product-not-found bg-white">
        <Navbar />
        <div className="container mx-auto my-10 p-5">
          <h1 className="text-2xl font-semibold text-red-600">Product Not Found</h1>
          <p className="text-lg text-gray-700 mt-4">We couldn't find the product you are looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page bg-white">
      <Navbar />
      <ToastContainer /> {/* Toast container for notifications */}
      <div className="container mx-auto my-10 p-5">
        <div className="product-detail-card bg-orange-50 p-10 rounded-lg shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative flex justify-center items-center">
            <img
              src={`/${images[imageIndex]}`}
              alt={product.title}
              className="object-cover w-80 h-80 rounded"
            />
            <button onClick={goPrev} className="absolute left-0 p-2 bg-gray-500 text-white rounded-full">
              &#10094;
            </button>
            <button onClick={goNext} className="absolute right-0 p-2 bg-gray-500 text-white rounded-full">
              &#10095;
            </button>
          </div>

          <div className="product-details">
            <h1 className="text-3xl font-semibold text-theme-color mb-4">{product.title}</h1>
            <p className="text-lg text-theme-description mb-6">{product.description}</p>
            <p className="text-2xl font-bold text-theme-price mb-6">₹{product.price}</p>

            {/* Quantity input */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-lg font-medium text-theme-description">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))} // Update quantity
                className="w-20 px-3 py-2 border border-gray-300 rounded"
                min="1"
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-orange-400 text-white py-2 px-6 rounded hover:bg-orange-500"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

// app/products/[productId]/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import bestSellingProducts from '../../data/bestSellingProducts.json'; // Import product data
import Navbar from '../../components/Navbar'; // Import Navbar
import Cookies from 'js-cookie'; // Import js-cookie for checking user session
import { db } from '../../config/firebase-config'; // Import Firebase config
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore functions
import { getAuth } from 'firebase/auth';  

const ProductPage = ({ params }) => {
  console.log(params)
  const { productId } = params; // Use productId from URL params
  console.log("This messaged is logged!")
  // console.log(productId)
  // Find the product based on the productId parameter from the URL
  const product = bestSellingProducts.find((p) => p.id === productId);// Change to find by ID

  const images = [product?.imageUrl, product?.imageUrl1, product?.imageUrl2]; // Images array
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1); // State to track the quantity

  const goPrev = () => setImageIndex(imageIndex === 0 ? images.length - 1 : imageIndex - 1);
  const goNext = () => setImageIndex(imageIndex === images.length - 1 ? 0 : imageIndex + 1);

  useEffect(() => {
    const interval = setInterval(goNext, 15000);
    return () => clearInterval(interval);
  }, [imageIndex]);

  // Function to handle adding product to cart
  const handleAddToCart = async () => {
    const token = Cookies.get('token'); // Retrieve the token from cookies

    if (!token) {
        toast.error('Please sign in to add items to your cart'); // Show error if not signed in
        return;
    }

    if (quantity < 1) {
        toast.error('Quantity must be at least 1'); // Validate quantity
        return;
    }

    try {
        const auth = getAuth(); // Get the auth instance
        const user = auth.currentUser; // Get the currently signed-in user
        console.log(user)

        if (!user) {
            toast.error('User not found'); // Show error if user is not authenticated
            return;
        }

        const uid = user.uid; // Get the uid from the user object

        // Fetch user document from the 'users' collection
        const userRef = doc(db, 'users', uid); // Use uid to get user document
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            toast.error('User not found'); // Show error if user document doesn't exist
            return;
        }

        // Get the current cart from the user document
        const currentCart = userDoc.data().cart || []; // Initialize cart if it doesn't exist

        // Create a new product object
        const newProduct = {
            productId: product.id,
            title: product.title,
            price: product.price,
            quantity, // Store the selected quantity
            imageUrl: product.imageUrl, // Store the image URL
            addedAt: new Date(),
        };

        // Add the new product to the cart
        await updateDoc(userRef, {
            cart: [...currentCart, newProduct] // Update the cart array
        });

        toast.success('Product added to cart!'); // Show success message
    } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add the product to the cart');
    }
};

  if (!product) {
    return (
      <div className="product-not-found bg-white">
        <Navbar />
        <div className="container mx-auto my-10 p-5">
          <h1 className="text-2xl font-semibold text-red-600">Product Not Found</h1>
          <p className="text-lg text-gray-700 mt-4">
            We couldn't find the product you are looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page bg-white">
      <Navbar />
      <ToastContainer /> {/* Toast container for showing alerts */}
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

            {/* Quantity input field */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-lg font-medium text-theme-description">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))} // Update quantity state
                className="w-20 px-3 py-2 border border-gray-300 rounded"
                min="1"
              />
            </div>

            <button
              onClick={handleAddToCart} // Attach add to cart handler
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

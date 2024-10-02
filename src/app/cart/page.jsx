'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar'; // Assuming you have a Navbar component
import Cookies from 'js-cookie'; // Import js-cookie for cookie management
import { toast } from 'react-toastify'; // Make sure to have toast for notifications

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = Cookies.get('token'); // Get the ID token from cookies

      if (!token) {
        toast.error('Please sign in to view your cart'); // Show error if ID token is not found
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/cart?idToken=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const data = await response.json();
        setCartItems(data.cart || []); // Set cart items from response data
      } catch (error) {
        console.error('Error fetching cart items:', error); // Log any errors
        toast.error('Failed to fetch cart items'); // Notify failure
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(cartItems.map(item => item.productId === id ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.productId !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const handleSaveChanges = async () => {
    const token = Cookies.get('token'); // Get the ID token from cookies

    if (!token) {
      toast.error('Please sign in to save changes'); // Show error if ID token is not found
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/cart/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems, idToken: token }), // Send updated cart items
      });

      if (!response.ok) {
        throw new Error('Failed to update cart items');
      }

      toast.success('Cart updated successfully!'); // Notify success
    } catch (error) {
      console.error('Error updating cart items:', error); // Log any errors
      toast.error('Failed to update cart items'); // Notify failure
    }
  };

  if (loading) {
    return <div className="loader">Loading...</div>; // Show a loading state
  }

  return (
    <div className="cart-page-container bg-white">
      <Navbar />
      <div className="container mx-auto my-10 p-5">
        <h1 className="text-3xl font-semibold mb-5 text-theme-color">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-4">
              {cartItems.map(item => (
                <div key={item.productId} className="cart-item flex items-center border p-4 rounded-lg bg-orange-50">
                  <div className="w-24 h-24">
                    <img src={item.imageUrl} alt={item.title} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 ml-4">
                    <h2 className="text-xl font-semibold text-theme-color">{item.title}</h2>
                    <p className="text-theme-description">{item.description}</p>
                    <p className="font-semibold text-theme-price">₹{Number(item.price).toFixed(2)}</p> {/* Convert to number */}
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      className="quantity-input border rounded w-16 text-center"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 1)}
                    />
                    <button
                      className="remove-btn ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="total-section mt-8 text-right">
              <h3 className="text-2xl font-semibold text-theme-color">Total: ₹{getTotalPrice()}</h3>
              <div className="flex justify-end mt-4 space-x-4"> {/* Add flexbox to align buttons */}
                <button
                  className="save-changes-btn bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                  onClick={handleSaveChanges} // Save changes button
                >
                  Save Changes
                </button>
                <button
                  className="checkout-btn bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-theme-hover"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

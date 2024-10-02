'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaArrowLeft } from 'react-icons/fa';
import Cookies from 'js-cookie'; // To access the user's ID token
import { toast } from 'react-toastify'; // Notifications for success or error handling

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1); // Track current step
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    deliveryAddress: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [customerInfoJSON, setCustomerInfoJSON] = useState(null);
  const [details, setDetails] = useState([]); // Store user details
  const [selectedAddress, setSelectedAddress] = useState(null); // Selected address for proceeding

  //fetching the details for step 1
  useEffect(() => {
    const fetchCartItemsAndDetails = async () => {
      const token = Cookies.get('token');
  
      if (!token) {
        toast.error('Please sign in to proceed to checkout');
        setLoading(false);
        return;
      }
  
      try {
        const [cartResponse, detailsResponse] = await Promise.all([
          fetch(`https://trijha-backend.vercel.app/cart?idToken=${token}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }),
          fetch(`https://trijha-backend.vercel.app/get-details?idToken=${token}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          })
        ]);
  
        if (!cartResponse.ok || !detailsResponse.ok) {
          throw new Error('Failed to fetch cart items or details');
        }
  
        const cartData = await cartResponse.json();
        const detailsData = await detailsResponse.json();
  
        setCart(cartData.cart || []);
        setDetails(Object.values(detailsData.details || {})); // Store fetched details in the state
  
      } catch (error) {
        console.error('Error fetching cart or details:', error);
        toast.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchCartItemsAndDetails();
  }, []);
  

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = Cookies.get('token'); // Get the ID token from cookies

      if (!token) {
        toast.error('Please sign in to proceed to checkout');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://trijha-backend.vercel.app/cart?idToken=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const data = await response.json();
        setCart(data.cart || []); // Set the fetched cart items
      } catch (error) {
        console.error('Error fetching cart items:', error);
        toast.error('Failed to fetch cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token'); // Retrieve the user's ID token from cookies
  
    if (!token) {
      toast.error('Please sign in to proceed.');
      return;
    }
  
    try {
      const response = await fetch('https://trijha-backend.vercel.app/save-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: token, // Send the ID token to authenticate the user
          formDetails: formData, // Send the form details to the backend
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Details saved:', result);
        toast.success('Address information submitted successfully!');
        setCurrentStep(2); // Proceed to the payment step
      } else {
        throw new Error('Failed to save form details');
      }
    } catch (error) {
      console.error('Error saving details:', error);
      toast.error('Failed to save form details');
    }
  };
  

  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
  };

  const totalPrice = cart.reduce((total, product) => total + product.price * (product.quantity || 1), 0);

  const paymentMethods = [
    { id: 1, method: 'PhonePe', logo: '/logos/phonePe.png' },
    { id: 2, method: 'UPI', logo: '/logos/UPI.png' },
    { id: 3, method: 'Credit/Debit Card', logo: '/logos/mastercard.png' },
    { id: 4, method: 'Net Banking', logo: '/logos/netBanking.png' },
  ];

  if (loading) {
    return <div className="loader">Loading...</div>; // Show a loading spinner while fetching
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        {/* Step Indicators */}
        <div className="mb-8 flex justify-center space-x-8">
          <div className={`flex items-center space-x-2 ${currentStep === 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep === 1 ? 'border-blue-600' : 'border-gray-300'}`}>
              1
            </div>
            <span className="font-semibold">Address</span>
          </div>
          <div className={`flex items-center space-x-2 ${currentStep === 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep === 2 ? 'border-blue-600' : 'border-gray-300'}`}>
              2
            </div>
            <span className="font-semibold">Payment</span>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Step 1: Address Form */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center mb-4">
                <button className="text-gray-600" onClick={() => window.history.back()}>
                  <FaArrowLeft />
                </button>
                <h2 className="text-xl font-bold ml-4">Checkout - Step 1: Address</h2>
              </div>
  
              {/* Checkout Form */}
              <form className="mb-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="deliveryAddress"
                    placeholder="Delivery Address"
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    className="p-2 border rounded col-span-1 md:col-span-2"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                    required
                  />
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded mt-4">
                  Submit Address
                </button>
              </form>
  
              {/* Display Saved Address as Cards */}
              {customerInfoJSON && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select Saved Address</h3>
                  <div className="grid gap-4">
                    {customerInfoJSON.map((address, index) => (
                      <button
                        key={index}
                        className="p-4 border rounded-lg bg-gray-50 hover:bg-blue-50"
                        onClick={() => setCurrentStep(2)} // Proceed to Step 2 upon clicking a card
                      >
                        <p className="text-sm">
                          {address.firstName} {address.lastName}, {address.deliveryAddress}, {address.city}, {address.state}, {address.pincode}
                        </p>
                        <p className="text-sm">{address.mobile}</p>
                        <p className="text-sm">{address.email}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
  
          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center mb-4">
                <button className="text-gray-600" onClick={() => setCurrentStep(1)}>
                  <FaArrowLeft />
                </button>
                <h2 className="text-xl font-bold ml-4">Checkout - Step 2: Payment</h2>
              </div>
  
              {/* Cart Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold">Order Summary</h3>
                <div className="divide-y divide-gray-200">
                  {cart.map((product) => (
                    <div key={product.productId} className="py-4 flex justify-between">
                      <span>{product.title}</span>
                      <span className="font-semibold">₹{(product.price * (product.quantity || 1)).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="py-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
  
              {/* Payment Options */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Choose Payment Method</h3>
                <div className="flex flex-col space-y-3 mt-3">
                  {paymentMethods.map((payment) => (
                    <div
                      key={payment.id}
                      className={`p-3 rounded-lg border flex items-center space-x-4 cursor-pointer ${selectedPayment === payment.method ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                      onClick={() => handlePaymentChange(payment.method)}
                    >
                      <img src={payment.logo} alt={payment.method} className="w-8 h-8" />
                      <span>{payment.method}</span>
                    </div>
                  ))}
                </div>
  
                {/* Payment Button */}
                <button
                  className={`w-full py-3 text-white font-bold mt-4 rounded ${selectedPayment ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
                  disabled={!selectedPayment}
                  onClick={() => {
                    if (selectedPayment) {
                      toast.success(`Payment initiated via ${selectedPayment}`);
                      // Implement actual payment logic here
                    } else {
                      toast.error('Please select a payment method');
                    }
                  }}
                >
                  Pay ₹{totalPrice.toFixed(2)} via {selectedPayment || '...'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
  
      <Footer />
    </div>
  );
  
  
};

export default CheckoutPage;

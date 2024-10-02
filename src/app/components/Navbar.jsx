// components/Navbar.js
'use client';
import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { useRouter } from 'next/navigation'; 
import SignInModal from './SignInModal';
import { auth } from "../config/firebase-config"; // Import your Firebase config
import { signOut } from "firebase/auth"; // Import signOut function
import Cookies from 'js-cookie'; // Import js-cookie
import bestSellingProducts from '../data/bestSellingProducts.json'
const arr = ['Vermicompost', 'Vermiwash', 'Pots', 'Gardening Kit'];
const profileOptions = ['Login', 'Logout', 'Sign Up', 'Orders'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      Cookies.remove('token'); // Remove the token cookie
      Cookies.remove('profilePic'); // Remove the profile picture cookie
      Cookies.remove('displayName'); // Remove the display name cookie
      window.location.reload(); // Reload the page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Get the profile picture and display name from cookies
  const profilePic = Cookies.get('profilePic');
  const displayName = Cookies.get('displayName');

  return (
    <nav className="bg-orange-100 py-4 z-40 relative">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <img src="/trijha final logo.png" className="h-20 w-20" alt="logo" />
          <button
            className="block lg:hidden text-slate-900 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
        <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-10 mt-4 lg:mt-0">
            <li className="mx-8 font-bold text-center text-lg text-slate-900 hover:bg-orange-300 transition duration-300 focus:outline-none">
              <a href="/">Home</a>
            </li>
            <Dropdown className="mx-8 font-bold text-lg text-slate-900 relative z-50 hover:bg-orange-300 transition duration-300 focus:outline-none" name="Products" arr={bestSellingProducts} />
            <li className="mx-8 font-bold text-center text-lg text-slate-900 hover:bg-orange-300 transition duration-300 focus:outline-none">
              <a href="#">About Us</a>
            </li>
            <li className="mx-8 font-bold text-center text-lg text-slate-900 hover:bg-orange-300 transition duration-300 focus:outline-none">
              <a href="#">Contact Us</a>
            </li>
          </ul>
          <div className="relative flex items-center space-x-4">
            {/* Full Cart Button */}
            <button
              className="flex items-center bg-orange-100 text-black px-1 mx-2 py-2 rounded-lg hover:bg-orange-300 transition duration-300 focus:outline-none"
              onClick={handleCartClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.401 2M7 13h10l1.75-7H6.25L5.4 4H3m7 0h6m-6 9v9m3-9v9m-6 0h12" />
              </svg>
              <span className="font-bold tracking-narrow">Cart</span>
            </button>
            {/* Profile Icon */}
            <button
              className="flex flex-col items-center focus:outline-none"
              onClick={toggleProfileMenu}
            >
              <img 
                src={profilePic || "/ProfilePhoto.png"} // Default profile photo if no cookie
                className="h-10 w-10 mx-5 rounded-full" 
                alt="profile" 
              />
              {/* Conditionally display either the display name or "Sign In" */}
              {displayName ? (
                <span className="text-sm text-slate-900">{displayName}</span>
              ) : (
                <span className="text-sm text-slate-900">Sign In</span>
              )}
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg z-50">
                <ul className="py-1">
                  {profileOptions.map((option, index) => (
                    <li key={index} className="px-4 py-2 hover:bg-gray-100">
                      <button onClick={() => {
                        if (option === 'Login') {
                          setIsModalOpen(true); // Open the sign-in modal
                        } else if (option === 'Logout') {
                          handleLogout(); // Handle logout
                        } else {
                          // Handle Sign Up here
                        }
                      }}>
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navbar;

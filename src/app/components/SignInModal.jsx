// components/SignInModal.js
import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { FaGoogle } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify'; // Import toast

const SignInModal = ({ isOpen, onClose }) => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const idToken = await user.getIdToken();
        
        Cookies.set('token', user.accessToken, { expires: 7 });
        Cookies.set('profilePic', user.photoURL, { expires: 7 });
        Cookies.set('displayName', user.displayName, { expires: 7 });

        const response = await fetch('https://trijha-backend-production.up.railway.app/google-signup', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        });

        if (response.ok) {
          const data = await response.json();
          toast.success(data.message); // Show success message
          onClose(); // Close modal on successful sign-in
          window.location.reload(); // Optionally reload the page
        } else {
          toast.error("Error during sign-in."); // Show error message
          console.error("Error during sign-in:", response.statusText);
        }
      }
    } catch (error) {
      toast.error("Error during sign-in."); // Show error message
      console.error("Error during sign-in:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-orange-100 p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <div className="flex justify-center mb-4">
          <img src="/trijha final logo.png" alt="Trijha Logo" className="h-16 w-16" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In to Trijha</h1>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition-colors mb-4"
        >
          <FaGoogle className="mr-2" /> Sign in with Google
        </button>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-800 bg-cream-200 rounded-full p-2 hover:bg-cream-300 transition duration-300"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default SignInModal;

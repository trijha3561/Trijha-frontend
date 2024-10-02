// pages/login.js
'use client';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useRouter } from "next/navigation";
import Navbar from '../components/Navbar'; // Assuming you have a Navbar component
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await fetch("https://trijha-backend.vercel.app/google-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Error during sign-in:", response.statusText);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <Navbar /> {/* Assuming Navbar component */}
      
      <div className="container mx-auto p-5 flex flex-1 items-center justify-center">
        <div className="bg-orange-100 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In to Trijha</h1>
          
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition-colors mb-4"
          >
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
          
          <p className="text-center text-gray-600 mt-4">Don’t have an account? <a href="#" className="text-blue-500 hover:underline">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// src/app/config/firebase-analytics.js
'use client';

import { getAnalytics, isSupported } from "firebase/analytics";
import { app } from "./firebase-config"; // Import the already initialized Firebase app

let analytics;

if (typeof window !== "undefined") {
  // Ensure Firebase Analytics is initialized only in the browser
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics }; // Export the initialized analytics instance (or undefined if not supported)

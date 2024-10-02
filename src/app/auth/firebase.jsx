// Import the functions you need from the SDKs you need
//FireBase Configuration
import { initializeApp, getApps, getApp } from "firebase/app"; 
import {getAuth} from 'firebase';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  };
  
// Initialize Firebase
const app = !getApps().length? initializeApp(firebaseConfig): getApp() //if there no apps initialized then initialize an app
// const analytics = getAnalytics(app); 
const auth = getAuth(app) 
export {app, auth}
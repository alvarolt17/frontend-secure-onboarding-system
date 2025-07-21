// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

console.log("Firebase Config (from Vite .env):", firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = 'id'; // Set language to Indonesian for OTP messages if desired

let recaptchaVerifier;

// Function to initialize reCAPTCHA Verifier
export const setupRecaptcha = (elementId) => {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
      'size': 'invisible', // or 'normal' if you want a visible reCAPTCHA widget
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("reCAPTCHA solved:", response);
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        console.log("reCAPTCHA expired, please try again.");
      }
    });
  }
  return recaptchaVerifier;
};

// Function to send OTP
export const sendOtp = async (phoneNumber) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    window.confirmationResult = confirmationResult; // Store for later verification
    console.log("OTP sent successfully!");
    return confirmationResult;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

// Function to verify OTP
export const verifyOtp = async (otpCode) => {
  try {
    const result = await window.confirmationResult.confirm(otpCode);
    console.log("Phone number verified successfully!", result.user);
    return result.user;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};
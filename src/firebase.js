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
auth.languageCode = 'id';

// recpatchaVerifier tidak perlu menjadi global lagi.
// Kita akan menginisialisasi dan merendernya tepat sebelum mengirim OTP.

// Fungsi untuk mengirim OTP
export const sendOtp = async (phoneNumber, elementId) => {
  try {
    // 1. Inisialisasi dan render RecaptchaVerifier
    // Ini harus dilakukan setiap kali kita mencoba mengirim OTP,
    // terutama untuk invisible reCAPTCHA.
    const recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
      'size': 'invisible',
      'callback': (response) => {
        console.log("reCAPTCHA solved:", response);
      },
      'expired-callback': () => {
        console.log("reCAPTCHA expired, please try again.");
      }
    });

    // Wajib: panggil render() untuk membuat reCAPTCHA siap
    await recaptchaVerifier.render();

    // 2. Panggil signInWithPhoneNumber dengan verifier yang sudah siap
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    
    // Simpan hasil untuk verifikasi nanti
    window.confirmationResult = confirmationResult;
    
    console.log("OTP sent successfully!");
    
    // (Opsional) Hapus reCAPTCHA setelah selesai, jika diperlukan
    // recaptchaVerifier.clear();

    return confirmationResult;

  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

// Fungsi untuk verifikasi OTP (tidak ada perubahan)
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
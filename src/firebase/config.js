import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyBZtZK9U2v5k1scyhk997wth_WQHuOPJjc",
    authDomain: "event-hub-c87b7.firebaseapp.com",
    projectId: "event-hub-c87b7",
    storageBucket: "event-hub-c87b7.firebasestorage.app",
    messagingSenderId: "895403292979",
    appId: "1:895403292979:web:5fc5faadf61f1b60cce646",
    measurementId: "G-49DR6P5PLJ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

// If running locally, connect to the Functions emulator
if (window.location.hostname === 'localhost') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
} 
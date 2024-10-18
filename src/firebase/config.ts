import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate the Firebase configuration
const validateFirebaseConfig = (config: Record<string, string | undefined>) => {
  const requiredFields = [
    'apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'
  ];
  
  for (const field of requiredFields) {
    if (!config[field]) {
      console.warn(`Firebase configuration warning: ${field} is missing.`);
      return false;
    }
  }
  return true;
};

let app;
let auth;
let db;
let isConfigValid = false;

if (validateFirebaseConfig(firebaseConfig)) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    isConfigValid = true;
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.warn('Error initializing Firebase:', error);
  }
} else {
  console.warn('Invalid Firebase configuration. Switching to demo mode.');
}

export { app, auth, db, isConfigValid };
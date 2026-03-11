import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Diagnostics
if (typeof window !== 'undefined') {
    Object.entries(firebaseConfig).forEach(([key, value]) => {
        if (!value) console.warn(`Firebase config missing: ${key}`);
    });
    console.log("Firebase Final Config Loaded for Project:", firebaseConfig.projectId);
}

// Initialize Firebase
let app;
let db;
let auth;

if (firebaseConfig.apiKey) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
} else {
    // Only warn during build or if not configured
    if (typeof window !== 'undefined') {
        console.warn("Firebase API Key missing. Features will be disabled.");
    }
}

export { db, auth };

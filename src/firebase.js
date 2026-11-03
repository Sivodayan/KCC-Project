import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId
);

export const firebaseProjectId = firebaseConfig.projectId || '';

let app = null;
let auth = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  } catch (err) {
    console.warn('Firebase initialization error:', err);
  }
}

export { auth, googleProvider };

export async function signInWithGoogle() {
  if (!isFirebaseConfigured || !auth || !googleProvider) {
    throw new Error('Firebase credentials are not configured. Please add your VITE_FIREBASE_* keys to .env');
  }
  return await signInWithPopup(auth, googleProvider);
}

export async function signInWithEmail(email, password) {
  if (!isFirebaseConfigured || !auth) {
    throw new Error('Firebase credentials are not configured. Please add your VITE_FIREBASE_* keys to .env');
  }
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function sendPasswordReset(email) {
  if (!isFirebaseConfigured || !auth) {
    throw new Error('Firebase credentials are not configured. Please add your VITE_FIREBASE_* keys to .env');
  }
  return await sendPasswordResetEmail(auth, email);
}

export async function logOutFirebase() {
  if (auth) {
    return await signOut(auth);
  }
}

export function subscribeToAuth(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

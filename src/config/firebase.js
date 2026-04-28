import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getDatabase } from "firebase/database";

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
/*
const firebaseConfig = {
  // Your Firebase config
};
*/
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
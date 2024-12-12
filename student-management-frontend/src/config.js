import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC-fZyQDWdOxSbHvf6ms7E19CMuBnxmVLg",
  authDomain: "studentmanagementsystem-4e9ef.firebaseapp.com",
  projectId: "studentmanagementsystem-4e9ef",
  storageBucket: "studentmanagementsystem-4e9ef.firebasestorage.app",
  messagingSenderId: "727277565661",
  appId: "1:727277565661:web:1e7973f181b1927f5d8d34",
  measurementId: "G-KTRBY6BQYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)





export default auth
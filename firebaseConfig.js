// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM_ZNu34A0uqD3MyJZpqdIv59VN51YXQA",
  authDomain: "filmes-7412b.firebaseapp.com",
  projectId: "filmes-7412b",
  storageBucket: "filmes-7412b.firebasestorage.app",
  messagingSenderId: "1008359216488",
  appId: "1:1008359216488:web:ee00d3fb38943a6a15f2dd",
  databaseURL: 'https://filmes-7412b-default-rtdb.firebaseio.com/'

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);


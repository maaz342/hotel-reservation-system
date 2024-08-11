import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database'; 

const firebaseConfig = {
    apiKey: "AIzaSyDT23-WrmA3XDzcLWvMe_e_DCKzSXkA0N0",
    authDomain: "my-ecom-8b333.firebaseapp.com",
    databaseURL: "https://my-ecom-8b333-default-rtdb.firebaseio.com",
    projectId: "my-ecom-8b333",
    storageBucket: "my-ecom-8b333.appspot.com",
    messagingSenderId: "972084366689",
    appId: "1:972084366689:web:8ac6dbff751066f08bc920"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); // Initialize Realtime Database

export { auth, database };

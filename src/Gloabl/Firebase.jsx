import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyBgSi47jZ8hWLKIaumWCwJRgkS6kOE0rFk",
    authDomain: "react-login-system-13092025.firebaseapp.com",
    projectId: "react-login-system-13092025",
    storageBucket: "react-login-system-13092025.firebasestorage.app",
    messagingSenderId: "873140684035",
    appId: "1:873140684035:web:6d8b7a8970f57269f95536",
    measurementId: "G-XFH4N8SB5T",
    databaseURL: 'https://react-login-system-13092025-default-rtdb.firebaseio.com/'
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
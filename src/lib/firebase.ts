import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCaJiXLJzJ0q4sCOV5XfUsw8ESoSvRkXG4",
    authDomain: "climbup-bb137.firebaseapp.com",
    projectId: "climbup-bb137",
    storageBucket: "climbup-bb137.firebasestorage.app",
    messagingSenderId: "390266890509",
    appId: "1:390266890509:web:c558e8a43b7a282e032844",
    measurementId: "G-PXGZX163SJ"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 
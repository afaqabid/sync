import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBIK_T4PNmhjtiuePR-IugASVtUsWCFj1E",
    authDomain: "sync-2d4f2.firebaseapp.com",
    projectId: "sync-2d4f2",
    storageBucket: "sync-2d4f2.appspot.com",
    messagingSenderId: "719270684936",
    appId: "1:719270684936:web:36434827891b8bb2de64bd"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();


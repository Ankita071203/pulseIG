import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//     apiKey: "AIzaSyATvZ60xrwEC-KGPjthvuJwvzNgoLpvMac",
//     authDomain: "discussion-dbe1c.firebaseapp.com",
//     projectId: "discussion-dbe1c",
//     storageBucket: "discussion-dbe1c.appspot.com",
//     messagingSenderId: "550688220590",
//     appId: "1:550688220590:web:c7346fd91c0a8ff48b943f"
//   };
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
  const app=initializeApp(firebaseConfig);
  export const storage=getStorage(app);
  export const db=getFirestore(app);
  export const auth=getAuth(app);

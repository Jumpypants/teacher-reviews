import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJyD24vFjeQrICrU1zAQybbS3godXnrx8",
  authDomain: "teacher-reviews.firebaseapp.com",
  projectId: "teacher-reviews",
  storageBucket: "teacher-reviews.firebasestorage.app",
  messagingSenderId: "550880621238",
  appId: "1:550880621238:web:2ac438c18e3265a14e6c17",
  measurementId: "G-K948EGF15T"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

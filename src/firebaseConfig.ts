// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHRqb30pU9DniXgTfFaXXi5gnifMIPQW8",
  authDomain: "vibelink-21345.firebaseapp.com",
  projectId: "vibelink-21345",
  storageBucket: "vibelink-21345.appspot.com",
  messagingSenderId: "640221864779",
  appId: "1:640221864779:web:98d977ed43740f72adbece",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}

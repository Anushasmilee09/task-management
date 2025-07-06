import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_2oAwy_-I5JWpfmdgWvGPFMDOvt2-ZBQ",
  authDomain: "task-management-c6cfb.firebaseapp.com",
  projectId: "task-management-c6cfb",
  storageBucket: "task-management-c6cfb.firebasestorage.app",
  messagingSenderId: "691849075248",
  appId: "1:691849075248:web:8fd631e94d4393f7446bf5",
  measurementId: "G-8MMND4EYKG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export { auth };

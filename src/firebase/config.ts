import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDl5t-I9TWZvHVAZ_bpcFKnh7ZdRAHDygo",
  authDomain: "project-cost-tracker-1bfe4.firebaseapp.com",
  projectId: "project-cost-tracker-1bfe4",
  storageBucket: "project-cost-tracker-1bfe4.firebasestorage.app",
  messagingSenderId: "1010843883799",
  appId: "1:1010843883799:web:cb032ff8e297c2b1047f52",
  measurementId: "G-WC17V32FKM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 
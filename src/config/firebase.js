import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_kxeWXHdwi3MvhGSQ7AxE-S_BqiZHHfw",
  authDomain: "medinova-simulations.firebaseapp.com",
  projectId: "medinova-simulations",
  storageBucket: "medinova-simulations.firebasestorage.app",
  messagingSenderId: "473481141664",
  appId: "1:473481141664:web:fdbcb2642a030e537218c5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
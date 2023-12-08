import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAcm8b_rHZFRe8RKKQ957kFmcN-cYf5FfE",
  authDomain: "ecueva-ch-jlr.firebaseapp.com",
  projectId: "ecueva-ch-jlr",
  storageBucket: "ecueva-ch-jlr.appspot.com",
  messagingSenderId: "395183228687",
  appId: "1:395183228687:web:4cc7c6c91cf0a2170b607a",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
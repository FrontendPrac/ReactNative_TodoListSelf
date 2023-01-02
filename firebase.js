import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIP_ee1vH58NoW_fmsUnELMAcf9fpT_Zg",
  authDomain: "rn-todoself.firebaseapp.com",
  projectId: "rn-todoself",
  storageBucket: "rn-todoself.appspot.com",
  messagingSenderId: "841796952125",
  appId: "1:841796952125:web:893c0535bf8bc796d08a54",
};

export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);

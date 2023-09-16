import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBrdjNb2rszbzwrq6TkZ-yE27ROuGIkIEo",
    authDomain: "realtime-chat-applicatio-684d7.firebaseapp.com",
    projectId: "realtime-chat-applicatio-684d7",
    storageBucket: "realtime-chat-applicatio-684d7.appspot.com",
    messagingSenderId: "218811099177",
    appId: "1:218811099177:web:7b2823840b96391a951438",
    measurementId: "G-F3LR6M57R7"
  };
  

  const app = initializeApp(firebaseConfig);
  export const firebaseAuth = getAuth(app);

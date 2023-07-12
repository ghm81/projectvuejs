// Import the functions you need from the SDKs you need

//import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

/* const firebaseConfig = {

  apiKey: "AIzaSyCXC_x4kkuDUN7wfQsp1GSEz7yKLGKLA6c",

  authDomain: "siteweb-6b7c8.firebaseapp.com",

  projectId: "siteweb-6b7c8",

  storageBucket: "siteweb-6b7c8.appspot.com",

  messagingSenderId: "82849361863",

  appId: "1:82849361863:web:b684ff5202f498582773e2"

};
 */
const firebaseConfig = {

    apiKey: "AIzaSyDFQQd83wr3_cuouprx8adjVHdSR0OVjM0",
  
    authDomain: "projectvue-4355b.firebaseapp.com",
  
    projectId: "projectvue-4355b",
  
    storageBucket: "projectvue-4355b.appspot.com",
  
    messagingSenderId: "602957382072",
  
    appId: "1:602957382072:web:9ea298b4bfab2c07050f4d"
  
  };
  


firebase.initializeApp(firebaseConfig);
export default firebase

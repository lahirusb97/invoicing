// Import the functions you need from the SDKs you need

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbXjllLhPy84r2SRFYHULeb2UFuoQyu-U",
  authDomain: "mystock-eb624.firebaseapp.com",
  databaseURL:
    "https://mystock-eb624-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mystock-eb624",
  storageBucket: "mystock-eb624.appspot.com",
  messagingSenderId: "1055843147843",
  appId: "1:1055843147843:web:da9d7923459661f437b4f6",
  measurementId: "G-HK066TWRX2",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

const firestore = getFirestore(app);

export { app, auth, firestore };

// import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: process.env.APIKEY,
//   authDomain: process.env.AUTHDOMAIN,
//   databaseURL: process.env.DATABASEURL,
//   projectId: process.env.PROJECTID,
//   storageBucket: process.env.STORAGEBUCKET,
//   messagingSenderId: process.env.MASSAGINGSENDERID,
//   appId: process.env.APPID,
//   measurementId: process.env.MEASUREMENTID,
// };

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const auth = getAuth(app);
// export { app, auth };

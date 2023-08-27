// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// apiKey: "AIzaSyDD2h8SiGGKfqQGdvjJA5PGNbwVqFPUrG0",
//     authDomain: "mindwave-2888a.firebaseapp.com",
//         projectId: "mindwave-2888a",
//             storageBucket: "mindwave-2888a.appspot.com",
//                 messagingSenderId: "366889563663",
//                     appId: "1:366889563663:web:bfe73aa1cccb1547bd957a",


const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
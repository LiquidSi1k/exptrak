// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwuIQjSFqF4qh-YVKucuZAGxLYjEwdvoU",
  authDomain: "exptrak-d1070.firebaseapp.com",
  projectId: "exptrak-d1070",
  storageBucket: "exptrak-d1070.appspot.com",
  messagingSenderId: "380131518210",
  appId: "1:380131518210:web:484b67b9d0a8f3721d441b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore(app);

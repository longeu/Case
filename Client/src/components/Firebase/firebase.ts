// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa8ZcT1BGb8-i1ww0vG3FEBsr55iwvy_4",
  authDomain: "upload-file-sapo.firebaseapp.com",
  projectId: "upload-file-sapo",
  storageBucket: "upload-file-sapo.appspot.com",
  messagingSenderId: "877163121257",
  appId: "1:877163121257:web:ecb0cfeb3db077f98ff0f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1l5xIFMtk94S973oZeCYhuwGtphoncKA",
  authDomain: "project-3973973139851720054.firebaseapp.com",
  projectId: "project-3973973139851720054",
  storageBucket: "project-3973973139851720054.appspot.com",
  messagingSenderId: "42037584691",
  appId: "1:42037584691:web:8fb9e436636b3d6114d446"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  
    <App />
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


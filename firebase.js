// firebase.js
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCJwG4L_OWJ0106mbE_auBn1ojTyuV4BDQ",
  authDomain: "tiredotcom-comment-2d5e4.firebaseapp.com",
  databaseURL: "https://tiredotcom-comment-2d5e4-default-rtdb.firebaseio.com",
  projectId: "tiredotcom-comment-2d5e4",
  storageBucket: "tiredotcom-comment-2d5e4.appspot.com",
  messagingSenderId: "629128321220",
  appId: "1:629128321220:web:a86439f5dcfca221ac9191"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

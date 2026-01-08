// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDO7VsuqCgnWN4vlFXNjExZZTbR4j0dVLw",
  authDomain: "digitallibrary-7018d.firebaseapp.com",
  projectId: "digitallibrary-7018d",
  storageBucket: "digitallibrary-7018d.firebasestorage.app",
  messagingSenderId: "64527292424",
  appId: "1:64527292424:web:9f8a23b1c05bd55d59d9bd"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

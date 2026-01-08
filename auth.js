import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import { auth } from "./firebase.js";

const allowedDomain = "sacredheart.ie";

function checkDomain(email) {
  return email.endsWith(`@${allowedDomain}`);
}

// Protect index.html
export function protectPage() {
  onAuthStateChanged(auth, user => {
    if (!user) window.location.replace("login.html");
  });
}

// Google login
export function googleLogin() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(res => {
      if (!checkDomain(res.user.email)) {
        alert("Only @sacredheart.ie emails allowed");
        signOut(auth);
        return;
      }
      window.location.href = "index.html";
    })
    .catch(err => alert(err.message));
}

// Email login
export function emailLogin(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(res => {
      if (!checkDomain(res.user.email)) {
        alert("Only @sacredheart.ie emails allowed");
        signOut(auth);
        return;
      }
      window.location.href = "index.html";
    })
    .catch(err => alert(err.message));
}

// Logout
export function logout() {
  signOut(auth).then(() => window.location.href = "login.html");
}




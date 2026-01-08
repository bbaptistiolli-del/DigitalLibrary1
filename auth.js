import {
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import { auth } from "./firebase.js";

const allowedDomain = "sacredheart.ie";

function checkDomain(email) {
  return email.endsWith(`@${allowedDomain}`);
}

/* ------------------ PASSWORDLESS EMAIL LOGIN ------------------ */
export function emailLogin(email) {
  if (!checkDomain(email)) {
    alert("Only @sacredheart.ie emails allowed");
    return;
  }

  const actionCodeSettings = {
    url: window.location.origin + "/login.html",
    handleCodeInApp: true
  };

  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      localStorage.setItem("emailForSignIn", email);
      alert("Login link sent! Check your email.");
    })
    .catch(err => alert(err.message));
}

/* ------------------ COMPLETE LOGIN FROM EMAIL LINK ------------------ */
if (isSignInWithEmailLink(auth, window.location.href)) {
  let email = localStorage.getItem("emailForSignIn");

  if (!email) {
    email = prompt("Please confirm your school email");
  }

  if (!checkDomain(email)) {
    alert("Only @sacredheart.ie emails allowed");
    return;
  }

  signInWithEmailLink(auth, email, window.location.href)
    .then(() => {
      localStorage.removeItem("emailForSignIn");
      window.location.href = "index.html";
    })
    .catch(err => alert(err.message));
}

/* ------------------ GOOGLE LOGIN ------------------ */
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

/* ------------------ LOGOUT ------------------ */
export function logout() {
  signOut(auth).then(() => window.location.href = "login.html");
}

/* ------------------ PAGE PROTECTION ------------------ */
export function protectPage() {
  onAuthStateChanged(auth, user => {
    if (!user) window.location.replace("login.html");
  });
}








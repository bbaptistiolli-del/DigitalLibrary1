import { auth } from "./firebase.js";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const allowedDomain = "sacredheart.ie";

export function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(result => checkDomain(result.user.email))
        .catch(error => alert(error.message));
}

export function emailLogin() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(result => checkDomain(result.user.email))
        .catch(error => alert(error.message));
}

function checkDomain(email) {
    let domain = email.split("@")[1];
    if (domain !== allowedDomain) {
        alert("Only @sacredheart.ie emails are allowed.");
        signOut(auth);
        return;
    }
    window.location.href = "index.html";
}

onAuthStateChanged(auth, user => {
    if (!user && window.location.pathname.includes("index.html")) {
        window.location.href = "login.html";
    }
});

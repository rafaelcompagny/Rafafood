// RAFAFOOD — Firebase centralisé
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyB16Y1BiIwvW0mHcz2oW2bN18ASAcmshjY",
  authDomain: "rafa-food.firebaseapp.com",
  projectId: "rafa-food",
  storageBucket: "rafa-food.firebasestorage.app",
  messagingSenderId: "23212009909",
  appId: "1:23212009909:web:19870328323f7e0a11d1fc",
  measurementId: "G-ETVLWCMHCS"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export { app };
export const auth = getAuth(app);
export const db = getFirestore(app);

export function getFirebaseDiagnostics() {
  return {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    appId: firebaseConfig.appId,
    origin: window.location.origin,
    protocol: window.location.protocol,
    sdk: "Firebase JS SDK 12.19.0"
  };
}

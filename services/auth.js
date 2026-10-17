// RAFAFOOD — Authentification uniquement
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { auth, getFirebaseDiagnostics } from "./firebase.js";
import { createUserProfile } from "./db.js";

export { onAuthStateChanged };
export const authDiagnostics = getFirebaseDiagnostics;

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email.trim(), password);
}

export async function register({ firstName, lastName, email, password }) {
  const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
  try {
    await updateProfile(cred.user, { displayName: `${firstName} ${lastName}`.trim() });
    await createUserProfile(cred.user, { firstName, lastName, email: email.trim() });
  } catch (profileError) {
    // Si Firestore est momentanément indisponible, le compte Auth existe déjà.
    console.error("RAFAFOOD profil Firestore:", profileError);
  }
  return cred;
}

export function logout() { return signOut(auth); }

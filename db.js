// RAFAFOOD — Accès Firestore uniquement
import {
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc,
  serverTimestamp, query, orderBy
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { db } from "./firebase.js";

export { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy };

export async function createUserProfile(user, data) {
  return setDoc(doc(db, "users", user.uid), {
    firstName: data.firstName || "", lastName: data.lastName || "",
    email: data.email || user.email || "", role: "client",
    employeeId: "", restaurantId: "", createdAt: serverTimestamp()
  });
}

export async function getUserProfile(user) {
  if (!user) return null;
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await createUserProfile(user, {
      firstName: user.displayName?.split(" ")[0] || "",
      lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
      email: user.email || ""
    });
    return { id: user.uid, firstName: user.displayName?.split(" ")[0] || "", lastName: user.displayName?.split(" ").slice(1).join(" ") || "", email: user.email || "", role: "client" };
  }
  return { id: snap.id, ...snap.data() };
}

export async function getProducts() {
  const snap = await getDocs(query(collection(db, "products"), orderBy("name")));
  return snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(p => p.available !== false);
}

export async function seedProducts(products) {
  const snap = await getDocs(collection(db, "products"));
  if (!snap.empty) return false;
  await Promise.all(products.map(({ id, ...p }) => setDoc(doc(db, "products", String(id)), { ...p, available: true, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })));
  return true;
}

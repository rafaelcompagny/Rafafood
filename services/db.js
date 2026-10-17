// RAFAFOOD — Firestore data layer
import {
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc,
  serverTimestamp, query, orderBy, where
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";

export { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy, where };

export async function createUserProfile(user, data) {
  return setDoc(doc(db, "users", user.uid), {
    firstName: data.firstName || "", lastName: data.lastName || "",
    email: data.email || user.email || "", role: "client",
    employeeId: "", restaurantId: "", createdAt: serverTimestamp()
  }, { merge: false });
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
    return { id: user.uid, firstName: user.displayName?.split(" ")[0] || "", lastName: user.displayName?.split(" ").slice(1).join(" ") || "", email: user.email || "", role: "client", employeeId:"", restaurantId:"" };
  }
  return { id: snap.id, ...snap.data() };
}

export async function getCategories() {
  const snap = await getDocs(query(collection(db, "categories"), orderBy("name")));
  return snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(c => c.active !== false);
}

export async function seedCategories(categories) {
  const snap = await getDocs(collection(db, "categories"));
  if (!snap.empty) return false;
  await Promise.all(categories.map((name, index) => setDoc(doc(db, "categories", String(index + 1)), { name, active: true, createdAt: serverTimestamp() })));
  return true;
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

export async function getUserOrders(user) {
  if (!user) return [];
  // Client-side sorting avoids requiring a composite Firestore index.
  const snap = await getDocs(query(collection(db, "orders"), where("userId", "==", user.uid)));
  return snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => timestampMillis(b.createdAt) - timestampMillis(a.createdAt));
}

export async function getAllOrders() {
  const snap = await getDocs(collection(db, "orders"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => timestampMillis(b.createdAt) - timestampMillis(a.createdAt));
}

export async function createOrder(data) {
  try {
    const ref = await addDoc(collection(db, "orders"), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: data.status || "reçue"
    });
    return ref.id;
  } catch (error) {
    console.error("Firestore a refusé la création de la commande.", JSON.stringify({
      projectId: auth.app.options.projectId,
      collection: "orders",
      uid: data.userId,
      authUid: auth.currentUser?.uid,
      checks: {
        signedIn: Boolean(auth.currentUser),
        userIdMatches: data.userId === auth.currentUser?.uid,
        statusIsReceived: (data.status || "reçue") === "reçue",
        orderHasItems: Array.isArray(data.items) && data.items.length > 0,
        totalIsPositive: Number(data.total) > 0,
        paymentModeAllowed: (
          data.payment?.status === "pending"
          && data.payment?.provider === "RAFAFOOD"
          && ((data.payment?.method === "pay_on_delivery" && data.orderMode === "livraison")
            || (data.payment?.method === "pay_on_pickup" && data.orderMode === "emporter"))
        ) || (
          data.payment?.status === "paid"
          && data.payment?.provider === "Cryptex Bank"
          && ["cryptex_bank", "Cryptex Bank"].includes(data.payment?.method)
        )
      },
      status: data.status || "reçue",
      paymentStatus: data.payment?.status,
      paymentProvider: data.payment?.provider,
      paymentMethod: data.payment?.method,
      code: error?.code,
      message: error?.message
    }, null, 2));
    throw error;
  }
}

export async function createPaidCryptexOrder(requestId, data) {
  if (!requestId) throw new Error("Référence Cryptex manquante.");
  const ref = doc(db, "orders", `cryptex_${requestId}`);
  const existing = await getDoc(ref);
  if (existing.exists()) {
    const saved = existing.data();
    if (saved.userId === data.userId && saved.payment?.requestId === requestId) return ref.id;
    throw new Error("Cette référence Cryptex est déjà associée à une autre commande.");
  }
  await setDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    status: data.status || "reçue"
  });
  return ref.id;
}

function timestampMillis(value) {
  if (!value) return 0;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.seconds === "number") return value.seconds * 1000;
  return new Date(value).getTime() || 0;
}

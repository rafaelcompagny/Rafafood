// RAFAFOOD ↔ CRYPTEX BANK
// Passerelle partenaire : création et suivi d'une demande de paiement.
// Simulation inter-projets : aucun argent réel.
import {
  collection, addDoc, doc, getDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

// Projet Firebase CRYPTEX BANK (fake-bank-b6e00)
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const cryptexConfig = {
  apiKey: "AIzaSyCaTCUGcfjoambag2Bq4ieHcDb5tG9S-g4",
  authDomain: "fake-bank-b6e00.firebaseapp.com",
  projectId: "fake-bank-b6e00",
  storageBucket: "fake-bank-b6e00.firebasestorage.app",
  messagingSenderId: "177702690472",
  appId: "1:177702690472:web:8691892f3ac1f102376c9d"
};

const cryptexApp = getApps().find(app => app.name === "RAFAFOOD_CRYPtex")
  || initializeApp(cryptexConfig, "RAFAFOOD_CRYPtex");
const cryptexDb = getFirestore(cryptexApp);

export const RAFAFOOD_MERCHANT = {
  merchantId: "rafafood",
  merchantName: "RAFAFOOD",
  merchantEmail: "rafafood@rafaelcompagny.com"
};

export async function createCryptexPaymentRequest({
  payerEmail, amount, orderNumber, restaurantId, orderDraft
}) {
  const value = Number(amount);
  if (!payerEmail) throw new Error("Adresse e-mail Cryptex obligatoire.");
  if (!Number.isFinite(value) || value <= 0) throw new Error("Montant invalide.");

  const amountHT = Math.round((value / 1.10) * 100) / 100;
  const vatAmount = Math.round((value - amountHT) * 100) / 100;

  const ref = await addDoc(collection(cryptexDb, "merchantPaymentRequests"), {
    merchantId: RAFAFOOD_MERCHANT.merchantId,
    merchantName: RAFAFOOD_MERCHANT.merchantName,
    merchantEmail: RAFAFOOD_MERCHANT.merchantEmail,
    merchantType: "restaurant",
    payerEmail: payerEmail.trim().toLowerCase(),
    amount: value,
    amountHT,
    vatAmount,
    currency: "EUR",
    orderNumber,
    restaurantId: restaurantId || "rafafood-bordeaux",
    status: "pending",
    source: "RAFAFOOD",
    sourceVersion: "V15",
    expiresAtLocal: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    orderDraft: {
      items: orderDraft?.items || [],
      orderMode: orderDraft?.orderMode || "",
    },
    createdAt: serverTimestamp(),
    createdAtLocal: new Date().toISOString()
  });

  return ref.id;
}

export async function getCryptexPaymentRequest(requestId) {
  if (!requestId) return null;
  const snap = await getDoc(doc(cryptexDb, "merchantPaymentRequests", requestId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

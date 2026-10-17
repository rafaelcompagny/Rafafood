// Compatibilité avec les anciens modules ; l'app Firebase est initialisée
// une seule fois dans la couche services.
export {
  app,
  auth,
  db,
  firebaseConfig,
  getFirebaseDiagnostics
} from "./services/firebase.js";

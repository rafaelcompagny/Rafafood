# RAFAFOOD V10 — espaces & commandes

## Nouveautés
- Panier fonctionnel avec quantités et persistance locale.
- Livraison / à emporter.
- Création réelle des commandes dans Firestore.
- Historique client dans le profil.
- Espace Employé : commandes de son restaurant et changement de statut.
- Espace Directeur : commandes de son restaurant + équipe.
- Espace Admin : statistiques globales, toutes les commandes, utilisateurs/rôles/restaurants et catalogue.
- Attribution d'un `restaurantId` aux utilisateurs par l'admin.
- Remise de 20 % automatique pour les comptes `employe`.
- Déconnexion disponible dans tous les espaces.
- Règles Firestore renforcées : les clients ne peuvent pas modifier librement une commande.

## Firebase
Le projet utilise la configuration `rafa-food` fournie pour la V8.

## Flux de commande
1. Connexion.
2. Ajout au panier.
3. Livraison ou à emporter.
4. Confirmation.
5. Document créé dans `orders` avec `userId`, `restaurantId`, articles, total et statut `reçue`.
6. Employé/directeur traite la commande.
7. Le client retrouve le statut dans son profil.

## Important
Après déploiement, publier aussi `firestore.rules` dans Firebase Console.
Les comptes nouvellement créés sont toujours `client`. Seul un admin peut modifier les rôles.


## Paiement
Le client peut payer avec Cryptex Bank ou régler à la livraison / au retrait. Pour Cryptex, RafaFood crée une demande partenaire : le client l’autorise depuis Cryptex Bank → Achats, puis la commande est créée après confirmation du statut `approved`. Le flux est une simulation de solde, aucun argent réel n’est utilisé.

Le compte Cryptex marchand utilisé est `rafafood@rafaelcompagny.com`. Le projet bancaire `fake-bank-b6e00` doit autoriser RafaFood dans ses règles Firestore partenaires pour accepter les nouvelles demandes (voir le guide d’intégration RafaFood du projet RafaBank).

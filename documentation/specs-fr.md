# Dishly - Specifications - FR 🇫🇷

## Qu'est-ce que Dishly ?
Dishly est une application de cuisine permettant de créer, visualiser et suivre les étapes de manière simple et intuitive de ses propres recettes.
Pour chaque recette de cuisine, l'application sera divisée en 2 onglets : un onglet ingrédients et un onglet étapes, qui pourront être suivies pas à pas.

## Quel est l'objectif du projet ?
L'objectif de ce projet est de développer un prototype fonctionnel *(Utilisable sur téléphone mobile ou tablette si possible)* de Dishly, selon les spécifications ci-après.


## Specifications - Phase 1 : Backend

### Spécifications techniques

Développement du backend avec les technologies suivantes :
* **Language** : TypeScript
* **Serveur** : Apollo
* **API** : GraphQL
* **Base de données** : PostgreSQL
* **ORM** : Prisma

La structure sera conteneurisée sous Docker.
Dans un premier temps, la dat sera générée aléatoirement pour le développement.
Si possible, ajout du cache.


### Spécifications fonctionnelles
 
1. Création dans un premier temps du backend **sans authentification et authorisation**, avec un single role user (admin)
2. Dans un deuxième temps, ajout d'un **middleware** conteneurisé pour y intégrer l'authentification et authorisation avec les roles *admin* et *user*.

#### Entités
* **User** : Un utilisateur a un lastname, un firstname, une adresse mail, un mot de passe, une photo de profil et un role
* **Recipe**
Une recette a un titre, une image, un temps de préparation, un temps de cuisson, une difficulté, un nombre de convives, des ingrédients, des tags, un owner et des étapes.
* **Ingredient**
Un ingrédient a un nom, une quantité et une unité
* **Tag**
Un tag a un nom
* **Step**
Une érape a une description et une image
* **Unit**
Une unité a un nom



#### User Stories
En tant qu'admin, je peux voir toutes les recettes, je peux modifier une recette, je peux supprimer une recette, je peux créer une recette, Je peux CRUD tags, je peux créer un utilisateur, je peux modifier un user, supprimer un user

En tant qu'user, je peux creer des recettes, modifiers mes recettes, supprimer mes recettes, je peux voir mes recettes

##### Admin
<!-- - As an administrator, I want to be able to list all managers.
- As an administrator, I want to be able to add a manager.
- As an administrator, I want to be able to edit a manager.
- As an administrator, I want to be able to delete a manager. -->

##### User
<!-- - As an administrator, I want to be able to list all managers.
- As an administrator, I want to be able to add a manager.
- As an administrator, I want to be able to edit a manager.
- As an administrator, I want to be able to delete a manager. -->

##### Recipe
<!-- - As an administrator, manager or customers, I want to be able to list all restaurants.
- As an administrator, manager or customers, I want to be able to get the information of a restaurant.
- As an administrator or manager, I want to be able to add a restaurant.
- As an administrator or manager, I want to be able to edit a restaurant.
- As an administrator or manager, I want to be able to delete a restaurant. -->

*Associations:*

<!-- - As an administrator or manager, I want to be able to add one or more cuisines to a restaurant.
- As an administrator or manager, I want to be able to remove one or more cuisines from a restaurant.
- As an administrator or manager, I want to be able to add a city to a restaurant.
- As an administrator or manager, I want to be able to edit a city from a restaurant.
- As an administrator, I want to be able to add a manager to a restaurant.
- As an administrator, I want to be able to remove a manager from a restaurant. -->

*Filters:*

<!-- - As an administrator, manager or customers, I want to be able to list all restaurants in a city.
- As an administrator, manager or customers, I want to be able to list all restaurants of a cuisine.
- As an administrator, manager or customers, I want to be able to list all restaurants of a cuisine in a city.
- As an administrator, I want to be able to list all restaurants of a manager.
- As an administrator, I want to be able to list all restaurants of a manager in a city.
- As an administrator, I want to be able to list all restaurants of a manager of a cuisine.
- As an administrator, I want to be able to list all restaurants of a manager of a cuisine in a city. -->

<!-- Suite a écrire -->

## Specifications - Phase 2 : Frontend

### Spécifications techniques
* **Language** : TypeScript
* **Framework / Librairie** : Expo + React Native
* **UI** : SASS ou Tailwind (à déterminer)

La structure sera également conteneurisée sous Docker.


### Spécifications fonctionnelles

<!-- The specifications of the second phase will be defined later. -->


<!--  -->
<!-- AUTRE EXEMPLE -->
<!--  -->

## Specifications - Perspectives d'évolution
Envoi des étapes sur montre connectée, partage entre amis de recette, récupération de recettes existantes, fork etc...

Ceci est un appel d'offre. Nous ferons notre choix en fonction de la qualité et non de la quantité. Cependant, le cahier des charges fonctionnel est détaillé pour avoir une vue sur la direction du projet.

**AI-Covoit** est une plateforme de covoiturage qui permet de mettre en relation des conducteurs et des passagers pour des trajets courts ou longs. Basée sur une intelligence artificielle, elle permet de trouver les meilleurs trajet pour chaque utilisateur, et inversement, trouver le max de passagers pour chaque conducteur. Les algorithmes de l'IA seront hautement personnalisables pour chaque utilisateur.

## Contraintes et spécifications

-   Forte scalabilité possible : l'application doit être capable de gérer un grand nombre d'utilisateurs et d'être hébergée sur plusieurs serveurs
-   Sécurité avancée : l'application devra gérer plusieurs types d'utilisateurs avec des droits différents
-   API documentée : des services externes pourront utiliser l'API de l'application
-   Fiabilité des évolutions : l'application devra être facilement maintenable et évolutive en gardant une qualité irréprochable
-   Volumétrie des données : l'application devra pouvoir gérer un grand nombre de données
-   Temps réel : réception des données, telles que l'emplacement des utilisateurs, en temps réel sur l'application
-   Notifications : envoi de notifications en cas de réservation, nouveau trajet, etc.
-   Conteneurisation : l'application devra être conteneurisée pour faciliter le déploiement
-   Stack technique : la seule contrainte est le TypeScript. Le reste est à votre convenance.

## Fonctionnalités

Pour ne pas rendre public notre concept novateur, nous avons décidé de ne pas détailler les fonctionnalités de l'application. Cependant, nous avons listé les fonctionnalités classiques qui devront être présentes.

-   Inscription et connexion
-   Création et modification de trajets
-   Recherche de trajets
-   Gestion des réservations
-   Gestion des avis

Une attention particulière sera portée sur les rôles d'un utilisateur. En effet, un utilisateur peut être à la fois conducteur et passager. Il peut également être administrateur de l'application.

Le front n'est pas à développer, mais il faudra tout de même le conteneuriser avec un template Vite.

## Proposition

### Architecture

-   Architecture préconisée : **Micro-services**
-   Cette dernière facilitera la maintenance de l'application, ainsi que son grand **potentiel de scalabilité** comme demandé dans les spécifications : L'échelle de chaque service pourra être ajustée en fonction du besoin et de l'évolution du nombre d'utilisateurs de la plateforme avec un impact faible sur les autres services de l'application. Elle est également particulièrement adaptée pour la gestion des données en temps réel.
- Elle permettra également une indépendance des services qui facilitera les évolutions de ces derniers (Changement de techno, mises à jour etc..) ainsi que la mise en place de tests indépendants
- A noter que la **Clean-architecture**, bien que robuste et facilitant le test n'a pas été retenue car jugée trop complexe et lourde à mettre en place dans le cadre de ce projet.


### Technos

-   NodeJS : _Backend_
-   Express.js
-   PostgreSQL : _Base de données_
-   Prisma : _ORM_
-   Swagger : _Documentation des API_
-   JWT : _Authentification_
-   Redis PubSub : _Notifications sur les réservations / trajets_
-   API REST
-   Jest : _Tests unitaires & intégration_
-   Bundle Vite (React + TS) : _Frontend_
-   Websockets : _Pour la communication des données en temps réel_

### UMLs

#### Diagramme relations - entités

![ERD](./assets/erd.png)

#### Diagramme de l'architecture dockerisée

![Architecture](./assets/archi.png)

### Plan de tests

#### Inscription

| Test                       | Procédure                                                           | Résultat attendu                                  | Statut |
| -------------------------- | ------------------------------------------------------------------- | ------------------------------------------------- | ------ |
| Avec des données valides   | L'utilisateur entre un email valide et un mot de passe valide       | L'utilisateur est redirigé vers la page d'accueil | 🟢     |
| Avec e-mail déja existant  | L'utilisateur entre un email déjà utilisé et un mot de passe valide | Message d'erreur (L'utilisateur existe déjà)      | 🔴     |
| Avec e-mail invalide       | L'utilisateur entre un email invalide et un mot de passe valide     | Message d'erreur (L'email n'est pas valide)       | 🔴     |
| Avec mot de passe invalide | L'utilisateur entre un email valide et un mot de passe invalide     | Message d'erreur (Mot de passe invalide)          | 🔴     |

#### Connexion

| Test                       | Procédure                                                                   | Résultat attendu                                  | Statut |
| -------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------- | ------ |
| Avec des données valides   | L'utilisateur entre un email valide et un mot de passe valide               | L'utilisateur est redirigé vers la page d'accueil | 🟢     |
| Avec e-mail invalide       | L'utilisateur entre un email inexistant ou eronné et un mot de passe valide | Message d'erreur (Utilisateur non reconnu)        | 🔴     |
| Avec mot de passe invalide | L'utilisateur entre un email valide et un mot de passe invalide             | Message d'erreur (Mot de passe erronné)           | 🔴     |
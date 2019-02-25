---
title: Séance 4 - Application Web avancée
layout: default
---

<!--
Programme de la première partie:
- placer les étudiants pour faciliter l'entraide et la facilité d'accès aux étudiants les plus en difficulté.
- corriger exercices à rendre en faisant intervenir les étudiants
- répondre aux questions des étudiants
- QCM
- correction du QCM
- consolidation des acquis: terminologie et concepts
- finir exercices de la séance précédente
- commencer les exercices de cette séance (4)

Programme de la deuxième partie: (retour de la pause)
- avancer le plus possible sur les exercices
-->

## Objectifs de cette séance

Afin de savoir développer et maintenir une application Web pérenne avec comptes utilisateurs, nous allons:

- Écrire des tests automatisés: unitaires, d'intégration et fonctionnels
- Initier et persister une session utilisateur avec le module “passport”
- Identifier et corriger les failles de sécurité: injection et XSS

Durée: 4h.

Projet à rendre en groupe, pour valider les acquis: service de gestion de notes personnelles.

## Pré-requis

Pour effectuer ces exercices, assurez-vous que les pré-requis suivants sont bien installés et accessibles depuis votre terminal Bash (ou compatible):
- `node`; (tester avec `$ node --version`)
- et `git`. (vérifier que `$ git config --global user.email` retourne bien votre adresse email `@eemi.com`)

---

## Exercice 4.1 - Tests automatisés avec Ava

La plupart des applications sont amenées à fonctionner pendant plusieurs années. L'évolution des besoins des utilisateurs, des entreprises, ainsi que l'évolution des technologies et des normes de sécurité implique que le code source de ces applications devra être modifié régulièrement. Notamment pour y ajouter des fonctionnalités et corriger des bugs. Afin d'éviter que la maintenance d'un programme ne devienne de plus en plus coûteuse et risquée, il faut suivre quelques règles d'hygiène, parmi lesquelles: définir des tests.

Pour vérifier que les fonctionnalités d'un programme se comportent comme prévu, il est possible de le tester "à la main". C'est à dire: d'interagir manuellement avec ce programme, via son (ou ses) interface(s). Par exemple, dans le cas d'un site statique, il suffit de consulter le site à l'aide de plusieurs navigateurs, et d'explorer ses pages pour s'assurer que le contenu s'affiche comme prévu. Dans le cas d'un site dynamique -- ou pire: d'un site dynamique avec compte utilisateurs -- il y a beaucoup plus de cas à tester. Il faut en effet vérifier que les procédure de création de compte utilisateur, d'identification et d'oubli de mot de passe fonctionnent bien, mais aussi que les informations stockées en base de données ne sont visibles qu'aux utilisateurs qui sont sensés y avoir accès.

L'écriture de tests automatisés permet de définir une fois pour toutes cette liste de vérifications à mener, pour vérifier qu'un site (ou programme) fonctionne comme prévu.

Il existe trois grandes catégories de tests:
- les tests unitaires permettent de vérifier les fonctions définies dans le code source;
- les tests fonctionnels permettent de vérifier le bon fonctionnement du site (ou programme) dans son ensemble, comme un utilisateur pourrait le faire manuellement;
- enfin, les tests d'intégration permettent de vérifier le bon comportement de plusieurs composants définis à l'intérieur du programme.

Le but de cet exercice est de compléter le site dynamique que nous avons créé lors de la séance précédente, afin d'y intégrer des tests automatisés.

### Critères de validation

- Fonctionnel: La commande `npm test` doit permettre d'exécuter notre test fonctionnel, et celui-ci doit seulement "passer" si la route `/ville` de notre serveur web fonctionne comme défini à l'exercice 3.1.
- Lisibilité: Suivre les conventions de codage de Express: chaînes de caractères entre apostrophes, indentation à 2 espaces, usage de point-virgules pour ponctuer chaque instruction.
- Structure: Respecter la structure de fichiers générée par `express-generator` + ajouter un fichier `test.js` qui contiendra notre test fonctionnel.
- Production: (non nécessaire à ce stade)

### Étapes proposées

1. Ajouter le moteur de tests "[Ava](https://www.npmjs.com/package/ava)" à notre projet Node.js.
2. Créer `test.js` et y définir un test fonctionnel qui vérifiera que la page "ville" contient bien le nom de la ville qui lui a été passé en paramètre POST.
3. Compléter `package.json` et `README.md` afin d'expliquer comment exécuter ce test.
4. Versionner le code avec `$ git tag v4.1` puis le pousser vers le dépôt GitLab.

---

## Exercice 4.2 - Session utilisateur

Certains sites et applications web personnalisent leur contenu et fonctionnalités en fonction de l'utilisateur qui y est connecté. Pour permettre cela, le serveur Web doit permettre l'identification et l'authentification de ces utilisateurs, puis le stockage d'une "session utilisateur" en base de données, pour chacun d'eux.

Une session utilisateur consiste à savoir qu'un utilisateur s'est identifié et authentifié sur notre site (*log in* / *sign in*), et qu'il ne s'en est pas encore déconnecté. (*log out* / *sign off*)

Dans cet exercice, nous allons intégrer la stratégie "passport-local" du module [Passport](https://www.npmjs.com/package/passport) dans notre application Express.js.

### Critères de validation

- Fonctionnel: Après avoir lancé le serveur avec `$ npm start` et ouvert sa page d'accueil depuis un navigateur web, il devrait être possible d'y créer un compte à l'aide d'un identifiant et mot de passe, de s'y connecter avec ce compte pour accéder à une page privée, puis de s'y déconnecter.
- Lisibilité: (cf exercice précédent)
- Structure: (cf exercice précédent)
- Production: (cf exercice précédent)

### Étapes proposées

Ces étapes sont décrites moins précisément que celles fournies dans les exercices précédents. Utilisez les ressources disponibles sur Internet pour vous aider: documentation de Node.js, des modules npm utilisés, examples, tutos, etc...

1. Dans un premier temps, nous allons permettre à un seul utilisateur de se connecter à l'aide d'un identifiant et mot de passe stockés en dur dans le code.
  - Suivre le guide "[Username & Password](http://www.passportjs.org/docs/username-password/)" pour installer le module "passport-local" dans notre projet, le configurer et l'intégrer dans l'application Express.js. 
  - Modifier la fonction passée à `new LocalStrategy()` de manière à ce qu'elle vérifie que l'identifiant et le mot de passe saisis par l'utilisateur corresponde bien à des valeurs de votre choix, stockées en dur dans votre code, au lieu de chercher l'utilisateur en base de données.
  - Vérifier que `http://localhost:3000/login` vous amène bien vers la page d'accueil du site, seulement si vous saisissez le bon identifiant et le bon mot de passe.
  - Conservez vos modifications: `$ git commit -m "user can login with hard-coded credentials"`
2. Maintenant que le login fonctionne, nous allons permettre aux visiteurs de se créer leur propre compte utilisateur.
  - Créer un objet `users` vide. Il sera complété par notre application à chaque fois qu'un utilisateur aura créé son compte.
  Structure recommandée pour cette objet:
  ```js
  {
    'user_id_1': { hashedPassword: '92a19566e016ebce288f71113f95f77c' },
    'user_id_2': { hashedPassword: '1fdc0f893412ce55f0d2811821b84d3b' },
    // ...
  }
  ```
  - Déplacez les identifiants que vous avez défini en dur, dans cet objet `users`.
  - Pour réduire le risque de fuite de ce mot de passe, le hasher à l'aide de l'algorithme [MD5](https://www.md5.fr/) dans la propriété `hashedPassword`.
  - Enfin, modifier la fonction de vérification des identifiants (cf étape précédente) de manière à ce qu'elle hashe le mot de passe saisi par l'utilisateur avec MD5, afin de pouvoir le comparer avec le hash stocké dans notre objet.
  - Ajouter une route `/signup` et implémenter l'endpoint correspondant afin que les visiteurs puissent créer leur propre compte depuis un formulaire web. Après cela, ils devraient être en mesure de s'identifier.
3. Maintenant qu'il est possible de créer un compte et de s'identifier avec son compte, nous allons créer une page à accès restreint et un moyen de se déconnecter.
  - Créer la route `/me` et l'endpoint associé. Cette page devra afficher l'identifiant de l'utilisateur qui est connecté, ou un message d'erreur avec [code de status HTTP](https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP) `401` s'il n'est pas connecté.
  - Créer la route `/logout` et l'endpoint associé. Celle-ci supprimera la session de l'utilisateur qui était connecté puis redirigera vers l'index du site.
  - Vérifier que le page `/me` se comporte comme prévu: avant de se connecter (c.a.d. sans session), après s'être connecté (c.a.d. avec session), et après s'être déconnecté (c.a.d. session supprimée).
4. Maintenant que les sessions sont implémentées en mémoire, nous allons les faire persister en base de données.
  - Actuellement, les sessions sont perdues si on redémarre notre serveur. => Utiliser une base de données MongoDB pour maintenir la liste des utilisateurs et de leurs sessions.

---

## Projet à rendre en groupe - Service de gestion de notes personnelles

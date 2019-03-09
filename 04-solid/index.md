---
title: Séance 4 - Application Web avancée
layout: default
---

<!--
Programme de la première partie:
- placer les étudiants pour faciliter l'entraide et la facilité d'accès aux étudiants les plus en difficulté.
- corriger exercices à rendre en faisant intervenir les étudiants
- consolidation des acquis: terminologie et concepts (templates/vues, utilisation d'API, émettre une requête HTTP depuis Node.js, gestion d'erreurs)
- répondre aux questions des étudiants
- QCM
- correction du QCM
- effectuer/commencer les exercices de cette séance (4)
-->

## Objectifs de cette séance

Afin de savoir développer et maintenir une application Web réaliste et pérenne, nous allons:

- Écrire des tests automatisés: unitaires, d'intégration et fonctionnels
- Initier et persister des sessions utilisateur avec le module “passport”
- Identifier et corriger les failles de sécurité: injection et XSS

Durée: 4h.

<!-->
Projet à rendre en groupe, pour valider les acquis: service de gestion de notes personnelles.
-->

## Pré-requis

Pour effectuer ces exercices, assurez-vous que les pré-requis suivants sont bien installés et accessibles depuis votre terminal Bash (ou compatible):
- `node`; (tester avec `$ node --version`)
- et `git`. (vérifier que `$ git config --global user.email` retourne bien votre adresse email d'étudiant·e)

---

## Exercice 4.1 - Tests automatisés avec Ava

La plupart des applications sont amenées à fonctionner pendant plusieurs années. L'évolution des besoins des utilisateurs, des entreprises, ainsi que l'évolution des technologies et des normes de sécurité implique que le code source de ces applications devra être modifié régulièrement. Notamment pour y ajouter des fonctionnalités et corriger des bugs. Afin d'éviter que la **maintenance** d'un programme ne devienne de plus en plus coûteuse et risquée, il faut suivre quelques règles d'hygiène, parmi lesquelles: définir des tests.

Pour vérifier que les fonctionnalités d'un programme se comportent **comme prévu**, il est possible de le tester "à la main". C'est à dire: d'interagir manuellement avec ce programme, via son (ou ses) interface(s). Par exemple, dans le cas d'un site statique, il suffit de consulter le site à l'aide de plusieurs navigateurs, et d'explorer ses pages pour s'assurer que le contenu s'affiche comme prévu. Dans le cas d'un site dynamique -- ou pire: d'un site dynamique avec compte utilisateurs -- il y a beaucoup plus de cas à tester. Il faut en effet vérifier que les procédure de création de compte utilisateur, d'identification et d'oubli de mot de passe fonctionnent bien, mais aussi que les informations stockées en base de données ne sont visibles qu'aux utilisateurs qui sont sensés y avoir accès.

L'écriture de **tests automatisés** permet de définir une fois pour toutes cette liste de vérifications à mener, pour vérifier qu'un site (ou programme) fonctionne comme prévu.

Il existe trois grandes catégories de tests:
- les **tests unitaires** permettent de vérifier les fonctions définies dans le code source;
- les **tests fonctionnels** permettent de vérifier le bon fonctionnement du site (ou programme) dans son ensemble, comme un utilisateur pourrait le faire manuellement;
- enfin, les **tests d'intégration** permettent de vérifier le bon comportement de plusieurs composants définis à l'intérieur du programme.

Le but de cet exercice est de compléter le site dynamique que nous avons créé lors de la séance précédente, afin d'y intégrer des tests automatisés.

### Critères de validation

- Fonctionnel: La commande `npm test` doit permettre d'exécuter notre test fonctionnel, et celui-ci doit seulement "passer" si la route `/ville` de notre serveur web fonctionne comme défini dans les exercices 3.x.
- Lisibilité: Suivre les conventions de codage de Express: chaînes de caractères entre apostrophes, indentation à 2 espaces, usage de point-virgules pour ponctuer chaque instruction.
- Structure: Respecter la structure de fichiers générée par `express-generator` + ajouter un fichier `test.js` qui contiendra notre test fonctionnel.
- Production: (non nécessaire à ce stade)

### Étapes proposées

Ces étapes sont décrites moins précisément que celles fournies dans les exercices précédents. Utilisez les ressources disponibles sur Internet pour vous aider: documentation de Node.js, des modules npm utilisés, examples, tutos, etc...

1. Ajouter le moteur de tests "[Ava](https://www.npmjs.com/package/ava)" à notre projet Node.js.
2. Créer `test.js` et y définir un test fonctionnel qui vérifiera que la page d'index du site comprend bien un formulaire HTML.
3. Compléter `package.json` et `README.md` afin d'expliquer comment exécuter ce test.
4. Ajouter à `test.js` un test fonctionnel qui vérifiera que la page "ville" contient bien le nom de la ville qui lui a été passé en paramètre POST.
5. Versionner le code avec `$ git tag v4.1` puis le pousser vers le dépôt distant que vous avez créé pendant la séance précédente.

BONUS: ajouter un test d'intégration et un test unitaire.

---

## Exercice 4.2 - Sessions utilisateur

Certains sites et applications web personnalisent leur contenu et fonctionnalités en fonction de l'utilisateur qui y est connecté. Pour permettre cela, le serveur Web doit permettre l'**identification** et l'**authentification** de ces utilisateurs, puis le stockage d'une "session utilisateur" en base de données, pour chacun d'eux.

Une **session utilisateur** est un ensemble d'informations conservées dans le back-end (la partie serveur de notre application Web) qui permettent de déterminer l'identité d'un utilisateur connu après qu'il se soit identifié auprès de notre application Web (*log in* / *sign in*). Quand une session expire (ex: après plusieurs jours), est close ou perdue par l'utilisateur (ex: *log out* / *sign off* = déconnexion volontaire, ou perte de *cookie*), ce dernier devra à nouveau s'identifier pour initier une nouvelle session.

Dans cet exercice, nous allons intégrer la stratégie "passport-local" du module [Passport](https://www.npmjs.com/package/passport) dans notre application Express.js, afin de permettre aux visiteurs de s'identifier au travers d'un compte utilisateur.

### Critères de validation

- Fonctionnel: Après avoir lancé le serveur avec `$ npm start` et ouvert sa page d'accueil depuis un navigateur web, il devrait être possible d'y créer un compte à l'aide d'un identifiant et mot de passe, de s'y connecter avec ce compte pour accéder à une page privée, puis de s'y déconnecter.
- Lisibilité: (cf exercice précédent)
- Structure: (cf exercice précédent)
- Production: (cf exercice précédent)

### Étapes proposées

Ces étapes sont décrites moins précisément que celles fournies dans les exercices précédents. Utilisez les ressources disponibles sur Internet pour vous aider: documentation de Node.js, des modules npm utilisés, examples, tutos, etc...

1. Dans un premier temps, nous allons permettre à **un seul utilisateur** de se connecter à l'aide d'un identifiant et mot de passe **stockés en dur** dans le code.
  - Suivre le guide "[Username & Password](http://www.passportjs.org/docs/username-password/)" pour installer le module "passport-local" dans notre projet, le configurer et l'intégrer dans l'application Express.js. 
  - Modifier la fonction passée à `new LocalStrategy()` de manière à ce qu'elle vérifie que l'identifiant et le mot de passe saisis par l'utilisateur corresponde bien aux valeurs que vous aurez choisi et stocké en dur dans votre code, au lieu de chercher l'utilisateur en base de données.
  - Vérifier que `http://localhost:3000/login` vous amène bien vers la page d'accueil du site, seulement si vous saisissez le bon identifiant et le bon mot de passe.
  - Conservez vos modifications: `$ git commit -m "user can login with hard-coded credentials"`

2. Maintenant que le login fonctionne, nous allons permettre aux visiteurs de créer leur propre compte utilisateur, avec leurs **propres identifiants**.
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
  - Pour réduire le risque de fuite de ce mot de passe, le hasher à l'aide de l'algorithme [MD5](https://www.md5.fr/), dans la propriété `hashedPassword`.
  - Enfin, modifier la fonction de vérification des identifiants (cf étape précédente) de manière à ce qu'elle hashe le mot de passe saisi par l'utilisateur avec MD5, afin de pouvoir le comparer avec le hash stocké dans notre objet.
  - Ajouter et implémenter une route `/signup` pour permettre aux visiteurs de créer leur propre compte depuis un formulaire Web. Après cela, ils devraient être en mesure de s'identifier.
  - Conservez vos modifications: `$ git commit -m "user can create an account"`

3. Maintenant qu'il est possible de créer un compte et de s'identifier avec son compte, nous allons créer une **page à accès restreint** et un moyen de se déconnecter.
  - Créer et implémenter la route `/me`. La page retournée devra afficher l'identifiant de l'utilisateur qui est connecté, ou un message d'erreur avec [code de status HTTP](https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP) `401` s'il n'est pas connecté.
  - Ajouter et implémenter la route `/logout`. Cet endpoint supprimera la session de l'utilisateur qui était connecté puis redirigera vers l'index du site.
  - Vérifier que le page `/me` se comporte comme prévu dans chaque cas: avant de se connecter (c.a.d. sans session), après s'être connecté (c.a.d. avec session), et après s'être déconnecté (c.a.d. session supprimée).
  - Conservez vos modifications: `$ git commit -m "user can see a protected page and sign off"`

4. Actuellement, les sessions sont perdues si on redémarre notre serveur, car elles sont stockées en mémoire. Pour qu'elles soient conservées, nous allons les faire **persister en base de données**.
  - À l'aide de la documentation de passport.js et de ce que nous avons appris lors de la séance 2, modifier notre code pour maintenir la liste des utilisateurs et de leurs sessions dans une base de données MongoDB.
  - Conservez vos modifications: `$ git commit -m "users and sessions are persisted in mongodb"`

<!--
---

## Projet à rendre en groupe - Service de gestion de notes personnelles

👉 [Énoncé](../05-proj)
-->

---

## Pour aller plus loin

Ressources sur la maintenabilité, les tests et la sécurité:

- Concept à comprendre pour surveiller la maintenabilité du code: la [dette technique](https://fr.wikipedia.org/wiki/Dette_technique)
- [Integration Continue](https://fr.wikipedia.org/wiki/Int%C3%A9gration_continue): exécuter ses tests automatisés dans le cloud. Exemples de services: [Circle CI](https://circleci.com/).
- Exemple de faille de sécurité à prévenir: [injection par XSS](https://fr.wikipedia.org/wiki/Cross-site_scripting)

Ressources sur l'identification et l'authentification:

- Utilisation de [cookies](https://fr.wikipedia.org/wiki/Cookie_(informatique)#Gestion_des_sessions) pour gérer les sessions utilisateur
- Sessions utilisateur depuis des services tiers: le protocole [OAuth](https://fr.wikipedia.org/wiki/OAuth)

Ressources sur l'architecture et scalabilité d'applications Node.js:

- [What is the best way I can scale my nodejs app? - Stack Overflow](https://stackoverflow.com/questions/21981186/what-is-the-best-way-i-can-scale-my-nodejs-app)
- [Good practices for high-performance and scalable Node.js applications [Part 1/3]](https://medium.com/iquii/good-practices-for-high-performance-and-scalable-node-js-applications-part-1-3-bb06b6204197)
- [Cas d'utilisation de RabbitMQ - Développement - Human Coders Forum](https://forum.humancoders.com/t/cas-dutilisation-de-rabbitmq/1173)
- Architecture: [Microservices](https://martinfowler.com/articles/microservices.html)

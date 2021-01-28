---
title: Partie 6 - Identification, autorisation et authentification
layout: default
---

<!--
Programme:
- placer les étudiants pour faciliter l'entraide et la facilité d'accès aux étudiants les plus en difficulté.
- correction du QCM
- consolidation des concepts (code synchrone VS callbacks VS promises VS async/await)
-->

## Objectifs de cette partie

- Développer une application web avec server-side rendering (SSR)
- Rendre du contenu HTML statique puis dynamique à l'aide de templates “mustache”
- Interroger des APIs externes avec les modules “http” (fourni) et “request”
- Initier et persister des sessions utilisateur avec le module “passport”

Durée estimée: 3-6 heures.

## Pré-requis

Pour effectuer ces exercices, assurez-vous que les pré-requis suivants sont bien installés et accessibles depuis votre shell Linux:
- `node`; (tester avec `$ node --version`)
- et `git`. (vérifier que `$ git config --global user.email` retourne bien votre adresse email d'étudiant·e)

ℹ️ Dans cette partie, nous allons développer un nouveau programme Node.js. Nous allons donc créer un nouveau répertoire et un nouveau dépôt pour celui-ci. Nous l'appellerons **node-app**.

---

## Exercice 1 - Générer une application Web avec `express-generator`

Dans cet exercice, nous allons créer un nouveau serveur Web avec Node.js et Express. Cette fois-ci, nous allons utiliser `express-generator` pour générer une structure de fichiers digne d'une véritable application Web. Puis nous allons y effectuer quelques changements, pour comprendre comment fonctionne le moteur de rendu "Hogan.js" (inspiré de "Mustache").

### Objectifs

- Fonctionnel: Le serveur doit faire fonctionner une application Web contenant une page d'accueil (index) modifiée.
- Structure: Respecter la structure de fichiers générée par `express-generator` + ajouter un fichier `README.md` pour expliquer comment télécharger et faire fonctionner ce serveur depuis un shell Linux.
- Production: Le serveur devra être mis en production à l'aide de Heroku.

### Étapes proposées

1. Créer un dépôt "node-app" sur l'hébergeur de dépôts `git` de l'école, puis le cloner localement:

    ```bash
    $ git clone "insérer l'URL de votre dépôt distant ici"
    $ cd node-app
    ```

2. Générer une application Web dans ce répertoire à l'aide `express-generator`, puis pousser les changement dans le dépôt distant:

    ```bash
    $ npx express-generator --hogan --git
    $ git add .
    $ git commit -m "initial commit: express-generator"
    $ git push 
    ```

    > Note: `npx` permet de télécharger puis d'exécuter un package `npm` exécutable sans l'ajouter comme dépendance d'un projet Node.js. Consulter la [documentation de `express-generator`](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website#Using_the_application_generator) pour comprendre à quoi servent les paramètres fournis.

3. Installer les dépendances puis tester le serveur en local, depuis votre navigateur Web:

    ```bash
    $ npm install
    $ DEBUG="node-app:server" npm start
    ```

    > Note: `DEBUG="node-app:server"` est une affectation temporaire de variable d'environnement qui permet au programme Node.js d'afficher des traces utiles au débogage du serveur, grâce au package `debug`.

4. Modifier le code du serveur de manière à ce que la page d'accueil de l'application Web affiche "Node App" au lieu de "Express", sans altérer le style de la page, puis enregistrer ces modifications dans un *commit git*.

5. Mettre le serveur en production sur Heroku.

6. Compléter `README.md` pour expliquer comment cloner, installer, exécuter et déployer ce serveur depuis n'importe quel shell Linux. Enregistrer ces modifications dans un *commit git*.

---

## Exercice 2 - Formulaire avec page de destination

Dans cet exercice, nous allons compléter l'application Web de l'exercice précédent, de manière à ce que l'utilisateur puisse afficher une page personnalisée.

Le contenu de cette nouvelle page dépendra de ce que l'utilisateur aura tapé dans un formulaire. Nous allons donc ajouter:

- un formulaire dans la page index;
- un nouveau modèle de page HTML (aussi appelé *vue*);
- et une route permettant d'afficher une page HTML s'appuyant sur ce modèle, à partir de données reçues depuis le formulaire.

### Objectifs

- Fonctionnel: Le serveur doit faire fonctionner une application Web contenant un formulaire et une page de destination.
- Structure: (cf exercice précédent)
- Production: (cf exercice précédent)

### Étapes proposées

1. Dans le modèle de la page `index`, ajouter un [formulaire HTML](https://devdocs.io/html/element/form) qui permettra d'envoyer un champ nommé `nom_ville` via une requête HTTP GET, sur la route/chemin `/ville`.

2. Créer un modèle de page `ville.hjs` qui affichera "Ville:" suivi du nom de la ville saisie par l'utilisateur. (paramètre du modèle)

3. Ajouter la route `GET /ville` qui acceptera un paramètre GET `nom_ville` et rendra une page HTML à l'aide du modèle créé à l'étape précédente.

    > À ce stade, l'utilisateur devrait être capable de taper le nom d'une ville depuis la page d'accueil de l'application, puis de se retrouver sur une page affichant le nom de la ville qu'il a saisi.

4. Vérifier que l'application fonctionne aussi en production, en la déployant sur Heroku.

5. Modifier l'application de manière à ce que le nom de la ville saisi par l'utilisateur soit transmis via HTTP POST au lieu de HTTP GET. Et s'assurer que les espaces et caractères accentués sont respectés sur la page de destination.

6. Tester le serveur en production sur Heroku.

---

## Exercice 3.4 - Sessions utilisateur

Certains sites et applications web personnalisent leur contenu et fonctionnalités en fonction de l'utilisateur qui y est connecté. Pour permettre cela, le serveur Web doit permettre l'**identification** et l'**authentification** de ces utilisateurs, puis le stockage d'une "session utilisateur" en base de données, pour chacun d'eux.

Une **session utilisateur** est un ensemble d'informations conservées dans le back-end (la partie serveur de notre application Web) qui permettent de déterminer l'identité d'un utilisateur connu après qu'il se soit identifié auprès de notre application Web (*log in* / *sign in*). Quand une session expire (ex: après plusieurs jours), est close ou perdue par l'utilisateur (ex: *log out* / *sign off* = déconnexion volontaire, ou perte de *cookie*), ce dernier devra à nouveau s'identifier pour initier une nouvelle session.

Dans cet exercice, nous allons intégrer la stratégie "passport-local" du module [Passport](https://www.npmjs.com/package/passport) dans notre application Express.js, afin de permettre aux visiteurs de s'identifier au travers d'un compte utilisateur.

### Objectifs

- Fonctionnel: Après avoir lancé le serveur avec `$ npm start` et ouvert sa page d'accueil depuis un navigateur web, il devrait être possible d'y créer un compte à l'aide d'un identifiant et mot de passe, de s'y connecter avec ce compte pour accéder à une page privée, puis de s'y déconnecter.
- Lisibilité: (cf exercice précédent)
- Structure: (cf exercice précédent)
- Production: (cf exercice précédent)

### Étapes proposées

Ces étapes sont décrites moins précisément que celles fournies dans les exercices précédents. Utilisez les ressources disponibles sur Internet pour vous aider: documentation de Node.js, des modules npm utilisés, exemples, tutos, etc...

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
  - Pour réduire le risque de fuite de ce mot de passe, le hacher à l'aide de l'algorithme [MD5](https://www.md5.fr/), dans la propriété `hashedPassword`.
  - Enfin, modifier la fonction de vérification des identifiants (cf étape précédente) de manière à ce qu'elle hache le mot de passe saisi par l'utilisateur avec MD5, afin de pouvoir le comparer avec le hash stocké dans notre objet.
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

## Bonus

- Refaire cet exercice sans avoir à stocker de sessions en base de donnés. Pour cela, utiliser le standard [JSON Web Tokens](https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52) au lieu de Passport.js et des cookies.
- Écrire des tests fonctionnels pour vérifier le bon fonctionnement des sessions utilisateur. Pour cela, vous pouvez utiliser [Cypress](https://www.cypress.io/) et/ou [Puppeteer](https://github.com/avajs/ava/blob/master/docs/recipes/puppeteer.md), par exemple.

---

## Pour aller plus loin

### Alternatives à Express

Il existe de nombreuses alternatives à Express pour créer des applications Web avec Node.js:

- [Nest](https://nestjs.com/)
- [Next.js](https://nextjs.org/)
- [Hapi](https://hapijs.com/)
- [Koa](https://koajs.com/)
- [Strapi](https://strapi.io/)
- [Fastify](https://www.fastify.io/)
- [Sails.js](https://sailsjs.com/)
- [VulcanJS](http://vulcanjs.org/)
- [Meteor](https://www.meteor.com/)

Par ailleurs, il est possible d'utiliser Node.js pour créer des applications "native": [Electron](https://electronjs.org/)

Bref, les possibilités sont quasi-illimitées !

Quel framework essayerez-vous pour votre prochain projet Web ?

### APIs ouvertes

- [15 Fun APIs For Your Next Project - DEV Community](https://dev.to/biplov/15-fun-apis-for-your-next-project-5053)

### Sécurité

- Exemple de faille de sécurité à prévenir: [injection par XSS](https://fr.wikipedia.org/wiki/Cross-site_scripting)
- [We’re under attack! 23+ Node.js security best practices](https://medium.com/@nodepractices/were-under-attack-23-node-js-security-best-practices-e33c146cb87d)
- [Node.js Security Handbook | Sqreen](https://www.sqreen.com/resources/nodejs-security-handbook)

### Identification et authentification

- Utilisation de [cookies](https://fr.wikipedia.org/wiki/Cookie_(informatique)#Gestion_des_sessions) pour gérer les sessions utilisateur
- [Authorization and Authentication For Everyone](https://dev.to/kimmaida/authorization-and-authentication-for-everyone-27j3)
- Sessions utilisateur depuis des services tiers: le protocole [OAuth](https://fr.wikipedia.org/wiki/OAuth)
- Alternative aux sessions: [Securing Node.js RESTful APIs with JSON Web Tokens – freeCodeCamp.org](https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52) et [JWT Authentication & Authorization in NodeJs/Express & MongoDB REST APIs(2019) | by Frank Atukunda](https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122)
- [The Beer Drinker’s Guide to SAML | Duo Security](https://duo.com/blog/the-beer-drinkers-guide-to-saml)

### Architecture et passage d'applications Node.js à l'échelle

- [What is the best way I can scale my nodejs app? - Stack Overflow](https://stackoverflow.com/questions/21981186/what-is-the-best-way-i-can-scale-my-nodejs-app)
- [Good practices for high-performance and scalable Node.js applications [Part 1/3]](https://medium.com/iquii/good-practices-for-high-performance-and-scalable-node-js-applications-part-1-3-bb06b6204197)
- [Cas d'utilisation de RabbitMQ - Développement - Human Coders Forum](https://forum.humancoders.com/t/cas-dutilisation-de-rabbitmq/1173)
- Architecture: [Microservices](https://martinfowler.com/articles/microservices.html)

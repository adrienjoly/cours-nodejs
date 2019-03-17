---
title: Séance 3 - Application Web simple
layout: default
---

<!--
Programme de la première partie:
- placer les étudiants pour faciliter l'entraide et la facilité d'accès aux étudiants les plus en difficulté.
- corriger exercices à rendre en faisant intervenir les étudiants
- répondre aux questions des étudiants
- QCM
- correction du QCM
- consolidation des acquis: terminologie (db, coll, doc...) et concepts (code synchrone VS callbacks VS promises VS async/await)
- mettre le chat-bot avec historique (séance 2) en production => leur montrer d'abord ?
- commencer les exercices de cette séance (3)

Programme de la deuxième partie: (retour de la pause)
- avancer le plus possible sur les exercices
-->

## Objectifs de cette séance

- Développer une application web avec server-side rendering (SSR) et interrogation d'APIs externes
- Rendre du contenu HTML statique puis dynamique à l'aide de templates “mustache”
- Interroger des APIs externes avec les modules “http” (fourni) et “request”

Durée estimée cours + exercices: 6 heures.

## Pré-requis

Pour effectuer ces exercices, assurez-vous que les pré-requis suivants sont bien installés et accessibles depuis votre terminal Bash (ou compatible):
- `node`; (tester avec `$ node --version`)
- et `git`. (vérifier que `$ git config --global user.email` retourne bien votre adresse email d'étudiant·e)

ℹ️ À partir de cette séance, nous allons développer un programme Node.js indépendant de celui effectué lors des séances 1 et 2. Nous allons donc créer un nouveau répertoire et un nouveau dépôt pour celui-ci. Nous l'appellerons **node-app**.

## Exercice 3.1 - Générer une application Web avec `express-generator`

Dans cet exercice, nous allons créer un nouveau serveur Web avec Node.js et Express. Cette fois-ci, nous allons utiliser `express-generator` pour générer une structure de fichiers digne d'une véritable application Web. Puis nous allons y effectuer quelques changements, pour comprendre comment fonctionne le moteur de rendu "Hogan.js" (inspiré de "Mustache").

### Critères de validation

- Fonctionnel: Le serveur doit faire fonctionner une application Web contenant une page d'accueil (index) modifiée.
- Lisibilité: Suivre les conventions de codage du [guide de style de Airbnb](https://github.com/airbnb/javascript): chaînes de caractères entre apostrophes, indentation à 2 espaces, usage de point-virgules pour ponctuer chaque instruction.
- Structure: Respecter la structure de fichiers générée par `express-generator` + ajouter un fichier `README.md` pour expliquer comment télécharger et faire fonctionner ce serveur depuis un terminal.
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

6. Compléter `README.md` pour expliquer comment cloner, installer, exécuter et déployer ce serveur depuis n'importe quel terminal Bash. Enregistrer ces modifications dans un *commit git*.

7. Créer un `git tag v3.1` puis le pousser ainsi que vos *commits* dans votre dépôt distant.

## Exercice 3.2 - Formulaire avec page de destination

Dans cet exercice, nous allons compléter l'application Web de l'exercice précédent, de manière à ce que l'utilisateur puisse afficher une page personnalisée.

Le contenu de cette nouvelle page dépendra de ce que l'utilisateur aura tapé dans un formulaire. Nous allons donc ajouter:

- un formulaire dans la page index;
- un nouveau modèle de page HTML (aussi appelé *vue*);
- et une route permettant d'afficher une page HTML s'appuyant sur ce modèle, à partir de données reçues depuis le formulaire.

### Critères de validation

- Fonctionnel: Le serveur doit faire fonctionner une application Web contenant un formulaire et une page de destination.
- Lisibilité: (cf exercice précédent)
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

7. Créer un `git tag v3.2` puis le pousser ainsi que vos *commits* dans votre dépôt distant.

## Exercice 3.3 - Enrichissement de données à l'aide d'APIs externes

Dans cet exercice, nous allons compléter l'application Web de l'exercice précédent, de manière à ce qu'elle récupère et affiche des informations supplémentaires sur la ville saisie par l'utilisateur.

Pour cela, notre application va interroger l'API [geocode.xyz](https://geocode.xyz) pour chaque ville saisie par l'utilisateur puis générer une page HTML riche à partir de la réponse.

> Exemple de requête: [geocode.xyz/new+york?json=1](https://geocode.xyz/new+york?json=1)

### Critères de validation

- Fonctionnel: Le serveur doit faire fonctionner une application Web contenant un formulaire de saisie de ville et une page de destination affichant des données sur cette ville.
- Lisibilité: (cf exercice précédent)
- Structure: (cf exercice précédent)
- Production: (cf exercice précédent)

### Étapes proposées

1. Modifier la route `/ville` de manière à ce que le serveur obtienne les coordonnées GPS de la ville saisie par l'utilisateur en effectuant une requête vers l'API [geocode.xyz](https://geocode.xyz), puis affiche ces coordonnées dans la page de destination.

2. Modifier le modèle de la page de destination, afin qu'elle affiche un message d'erreur clair et esthétique dans le cas où aucune coordonnées n'auraient été trouvées pour la ville saisie.

3. Modifier le modèle de manière à ce que la page de destination montre où se trouve la ville saisie sur une carte de type Google Maps ou OpenStreetMap, sans avoir à quitter l'application.

4. Vérifier que l'application fonctionne aussi en production, en la déployant sur Heroku.

5. Créer un `git tag v3.3` puis le pousser ainsi que vos *commits* dans votre dépôt distant.

## Étude: comment effectuer une requête HTTP depuis Node.js ?

Il existe plusieurs moyens d'effectuer des requêtes HTTP depuis Node.js.

Notamment:

- les modules standard [http.get](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_http_get_options_callback) et [https.get](https://nodejs.org/dist/latest-v8.x/docs/api/https.html#https_https_get_options_callback)
- le package npm le plus utilisé: [request](https://www.npmjs.com/package/request)
- un package inspiré par l'API Fetch du W3C: [node-fetch](https://www.npmjs.com/package/node-fetch)
- la solution isomorphique: [Axios](https://www.npmjs.com/package/axios)
- un petit nouveau: [httpie](https://github.com/lukeed/httpie)

Quelle solution préférez-vous ? Pourquoi ?

## Pour aller plus loin

### Modules: `module.exports` et `require()`

- [Comprendre module.exports et exportations dans Node.js](https://blog.arcoptimizer.com/comprendre-module-exports-et-exportations-dans-node-js)
- [What is the purpose of Node.js module.exports and how do you use it? - Stack Overflow](https://stackoverflow.com/a/5311377/592254)
- [Modules | Node.js v11.11.0 Documentation](https://nodejs.org/api/modules.html#modules_module_exports)

### *Fat arrow functions* (`=>`)

- Explication concise: [Fonctions fléchées - JavaScript | MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Fonctions/Fonctions_fl%C3%A9ch%C3%A9es)
- [Les fat arrow function en Javascript](https://blog.nathanaelcherrier.com/fr/les-fat-arrow-function-en-javascript/)
- [ES6, ES2015 : les fonctions fléchées](https://putaindecode.io/fr/articles/js/es2015/arrow-functions/)

### Alternatives à Express

Il existe de nombreuses alternatives à Express pour créer des applications Web avec Node.js:

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

<!-- Outils pour enseignant:

- Exécuter le code Node.js des étudiants via docker:
  https://gist.github.com/adrienjoly/95776086d850a1dd211dbfcd9b2c0a73

- Barème d'évaluation pour exercices 3.1, 3.2 et 3.3:
    - travail rendu dans le délai imparti
    - app web accessible sur internet
    - titre: "Node App" sur index
    - favicon fonctionne + sur index
    - formulaire avec page de destination
    - recup param POST + accents supportés
    - champ description multi ligne
    - affichage de la ville sur une carte
    - message erreur en cas de ville inconnue
    - repo accessible
    - structure fichiers de express-generator
    - README qui explique comment install+run
    - package.json avec express et start
    - bon usage des templates mustache/hogan.js
    - tags: v3.1, v3.2 et v3.3 + commit(s) entre chacun d'eux
    - implem de la requete vers geocode.xyz (x2 PTS)
    - compréhension apparente des fonctions asynchrones (x2 PTS)
    - lisibilité (apostrophes, 2-space indent, points-virgule)
-->

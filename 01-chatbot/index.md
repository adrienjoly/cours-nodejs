---
title: Partie 1 - Chat-bot en production avec Express et Heroku
layout: default
---

<!--

Programme:

- quizz: https://create.kahoot.it/v2/details/163b4866-7ffe-4d9a-a959-fe0df119ede7
- bio
- objectifs du cours:
  - la base: savoir développer un serveur web avec Node.js
  - développer autonomie / problem solving
  - aider les autres
- programme des X jours
  - sujets abordés
  - évaluation: API à rendre + partiel.
- règles et recommandations
  - règles: pauses, ordi fermé, boissons et nourriture dans la salle de classe
  - conseils: participer, être curieux, faire attention aux détails, utiliser les salons de discussions ouverts aux autres étudiants
- validations des pré-requis: vocabulaire et fonctionnement du web (serveurs, requêtes HTTP, etc...)

Conseils pour favoriser l'entraide:

- scinder la classe en 2 groupes: ceux qui ont déjà mis une app node.js en prod, et les autres
- répartir les étudiants de manière à ce que chaque personne du groupe 1 soit assise à côté d'une personne du groupe 2, et que l'écran des personnes les plus débutantes me soient le plus accessible possible.

-->

## Objectifs de cette partie

- Développer un chat-bot simple en Node.js à l'aide de Express
- Savoir écrire une API avec des points d'entrée synchrones
- Mettre le serveur en production, avec Heroku et Git

Prérequis: expérience en programmation JavaScript, usage du shell Linux

Durée estimée: 4 heures.

---

## Exercice 1 - Afficher Hello World dans la sortie standard

Nous allons écrire et exécuter un premier programme Node.js dont la seule responsabilité sera d'afficher la chaîne de caractères "Hello World" dans la console. (sortie standard)

Attentes techniques: Le programme doit être constitué d'une seule ligne de code.

👉 Exerciseur en ligne: [Afficher Hello World dans la sortie standard](https://tech.io/playgrounds/55085/premiers-pas-avec-node-js/afficher-hello-world-dans-la-sortie-standard)

🤖 Execution du robot de correction en local:

```sh
$ npm install github:adrienjoly/cours-nodejs # une fois pour toutes, pour installer le robot
$ npx cours-nodejs test 1-1 bonjour.js # pour faire tester bonjour.js au robot de l'exercice 1 de la partie 1
```

---

## Exercice 2 - Une API simple mais polie

Le but est de développer un serveur Web/API basique qui répondra systématiquement "Bonjour !" à toutes les requêtes HTTP GET émises par des clients au chemin `/` (racine). Nous allons pour cela utiliser la bibliothèque Express.js.

Attentes fonctionnelles: Une fois le serveur lancé, l'envoi d'une requête HTTP GET à la racine du serveur web retourne bien le texte "Bonjour !".

Attentes techniques: Le programme ne doit pas dépasser 15 lignes de code, et doit avoir `express` comme seule dépendance externe.

👉 Exerciseur en ligne: [Une API simple mais polie](https://tech.io/playgrounds/55085/premiers-pas-avec-node-js/une-api-simple-mais-polie)

🤖 Execution du robot de correction en local:

```sh
$ npx cours-nodejs test 1-2 server.js
```

> Indice: Utiliser les différentes sections de la partie "Mise en route" de la [documentation de Express.js](https://expressjs.com/fr/) pour comprendre son fonctionnement et trouver (puis adapter) les exemples d'usage fournis.

---

## Exercice 3 - Paramètres `GET`

Nous avons à présent un serveur web dont l'API contient un seul point d'entrée (*endpoint*):
- `GET /` retourne systématiquement "Bonjour !".

Nous allons ajouter un point d'entrée `GET /hello` qui acceptera un paramètre `nom`, et ajustera le contenu de la réponse en fonction de la valeur de ce paramètre:

- toute requête à `GET /hello?nom=Sasha` doit obtenir la réponse `Bonjour, Sasha !`
- toute requête à `GET /hello?nom=Michel` doit obtenir la réponse `Bonjour, Michel !`
- toute requête à `GET /hello` doit obtenir la réponse `Quel est votre nom ?`

Attentes techniques: Le fichier ne doit pas dépasser 30 lignes de code, et doit avoir `express` comme seule dépendance externe.

👉 Exerciseur en ligne: [Paramètres `GET`](https://tech.io/playgrounds/55085/premiers-pas-avec-node-js/parametres-get)

🤖 Execution du robot de correction en local:

```sh
$ npx cours-nodejs test 1-3 server.js
```

> Conseil: en cherchant une solution dans la [documentation de Express.js](https://expressjs.com/fr/), veillez à ce que la syntaxe résultante des URLs fournies ci-dessous soit respectée à la lettre.

---

## Exercice 4 - Envoi de message en `POST`

Nous avons à présent un serveur web dont l'API contient deux points d'entrée (*endpoints*):
- `GET /` retourne systématiquement "Bonjour !".
- `GET /hello` retourne une salutation au `nom` fourni en paramètre GET.

Maintenant, on souhaite que l'API réponde un message pertinent à chaque message envoyé par les utilisateurs. Sachant qu'un message peut être trop long pour passer par un paramètre GET, nous allons le passer via le corps d'une requête HTTP POST.

Pour cela, nous allons y ajouter un point d'entrée (*endpoint*) de méthode POST au chemin `/chat`. Celui-ci pourra adapter sa réponse en fonction du contenu passé avec chaque requête. Le contenu devra être passé au format JSON, et le message de l'utilisateur devra être transmis comme valeur de la propriété `msg`.

Exemples / cas d'usage:
- toute requête `POST http://localhost:3000/chat` avec le contenu `{"msg":"ville"}` doit obtenir la réponse "Nous sommes à Paris"
- toute requête `POST http://localhost:3000/chat` avec le contenu `{"msg":"météo"}` doit obtenir la réponse "Il fait beau"

Attentes techniques: Le fichier ne doit pas dépasser 40 lignes de code, et doit avoir `express` comme seule dépendance externe.

👉 Exerciseur en ligne: [Envoi de message en `POST`](https://tech.io/playgrounds/55085/premiers-pas-avec-node-js/envoi-de-message-en-post)

🤖 Execution du robot de correction en local:

```sh
$ npx cours-nodejs test 1-4 server.js
```

> Indice: vous allez devoir intégrer un *middleware* à votre application Express, afin qu'elle soit en mesure d'extraire les données au format JSON.

> Attention: la manière de procéder dépend de la version de Express utilisée par votre serveur.

---

## Exercice 5 - Tester le serveur en local

Dans les exercices précédents, votre serveur était exécuté et testé _dans le cloud_, afin de simplifier vos premiers pas avec Node.js et Express.js.

Vous allez maintenant re-créer, exécuter et tester ce serveur sur votre propre ordinateur.

L'objectif est que, une fois lancé, votre serveur répondra comme prévu aux requêtes que vous lui enverrez, tel que décrit dans les exercices précédents.

### Tests: vérifier si le serveur répond comme prévu

Commandes à exécuter (dans une session de shell Linux séparée de celle depuis laquelle votre serveur est exécuté), pour tester la réponse du serveur aux requêtes:

- `$ curl "http://localhost:3000/"` doit obtenir la réponse "Bonjour !"
- `$ curl "http://localhost:3000/hello?nom=Sasha"` doit obtenir la réponse "Bonjour, Sasha !""
- `$ curl "http://localhost:3000/hello?nom=Michel"` doit obtenir la réponse "Bonjour, Michel !""
- `$ curl "http://localhost:3000/hello"` doit obtenir la réponse "Quel est votre nom ?"
- `$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"ville\"}" "http://localhost:3000/chat"` doit obtenir la réponse "Nous sommes à Paris"
- `$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"météo\"}" "http://localhost:3000/chat"` doit obtenir la réponse "Il fait beau"

### Pré-requis

Important: Si vous êtes sous Windows, merci d'utiliser **exclusivement** le shell Linux [Ubuntu](https://www.numerama.com/tech/158150-le-shell-bash-sous-windows-10-ce-quil-faut-savoir.html) installé après avoir activé [Windows Subsystem for Linux](https://docs.microsoft.com/fr-fr/windows/wsl/install-win10) <!--, [CMDER](http://cmder.net/)--> ou d'utiliser Linux depuis une machine virtuelle. Sous Mac ou Linux, vous serez en mesure d'utiliser votre shell Linux (ou "terminal") par défaut.

Pour effectuer cet exercice, assurez-vous que les pré-requis suivants sont bien installés et accessibles depuis votre shell Linux:
- `node`, version 10 ou supérieure; (vérifier avec `$ node --version`)
- et `curl`; (vérifier avec `$ curl --version`)

> Note: si vous avez installé Node.js sous Windows, il est probable que `node` et/ou `npm` ne fonctionnent pas depuis Ubuntu for Windows. Dans ce cas: installez-le depuis Ubuntu (cf [procédure](https://github.com/Microsoft/WSL/issues/3111#issuecomment-382713543)), puis redémarrez Ubuntu.

### Étapes proposées

À chaque étape, assurez-vous de (re)démarrer votre serveur (`$ node server.js`), de lui envoyer les requêtes listées ci-dessus (depuis un shell Linux séparé) puis d'observer la réaction du serveur à cette requête, jusqu'à ce que l'objectif de l'exercice soit atteint:

1. Depuis votre shell Linux, positionnez-vous dans votre répertoire personnel (`home`) puis créez un répertoire `nodejs-chatbot` dans ce dernier.

2. Dans le répertoire `nodejs-chatbot`, créez un fichier `server.js` puis collez-y le contenu de l'exercice précédent.

    > Note: si vous essayez d'exécuter `$ node server.js`, vous verrez que le serveur ne peut pas se lancer car il faut d'abord installer la dépendance `express`.

3. Toujours depuis `nodejs-chatbot`, exécutez `$ npm init` pour initialiser le fichier de projet Node.js: `package.json`.

    > Observez le contenu de `package.json`. À quoi sert ce fichier ?

4. Installez la dépendance `express` à l'aide de `$ npm install` avec l'option `--save`.

    > Pro tip: Le répertoire `node_modules` ne doit jamais être inclus dans les commits d'un dépôt `git`. Pour ajouter ce répertoire à la liste des répertoires et fichiers ignorés par `git`, taper `$ echo node_modules >>.gitignore`.

5. Après avoir (re)démarré votre serveur sur votre machine, vérifier que l'objectif de l'exercice est atteint.

6. Créez un fichier `README.md` pour expliquer le plus simplement possible à d'autres personnes: que fait votre programme Node.js, comment l'installer et l'exécuter sur sa propre machine, et comment le tester.

---

## Exercice 6 - Déploiement en production

Vous avez développé et testé un serveur Node.js/Express.js qui fonctionne en local.

Pour que votre serveur répondre aux requêtes de n'importe quel utilisateur via Internet, vous allez le déployer en production.

Objectif de l'exercice: Déployez votre serveur sur heroku.com, puis vérifiez que celui-ci réponde comme prévu à d'autres utilisateurs que vous même, depuis leur machine.

### Pré-requis

En plus des pré-requis listés dans l'exercice précédent, vous allez également devoir utiliser la commande `git` depuis votre shell Linux. Vérifiez que `$ git config --global user.email` retourne bien votre adresse email. Sinon, configurez votre commande `git` locale. Vous pouvez suivre [ces étapes](https://adrienjoly.com/cours-git/tutos/creer-depot-gitlab-eemi.html#%C3%A9tapes) ou le tutoriel de votre choix.

### Étapes proposées

1. Inscription: Créez un compte puis une "application" depuis [heroku.com](https://heroku.com).

    > Ne cliquez PAS sur l'icône "GitHub" depuis heroku.com et n'activez pas de "pipeline". Nous allons utiliser le déploiement manuel à l'aide de la commande `heroku` (CLI).

2. Déploiement: Suivez les instructions fournies pour installer la commande (aussi appelé "CLI") `heroku` sur votre machine et déployer votre serveur sur l'application que vous venez de créer.

    > En cas de problème pour installer la commande `heroku`, vous pouvez l'installer comme dépendance locale à votre projet: `$ sudo npm install -g heroku`.

    > Soyez attenti·f·ve: vous avez déjà effectué certaines des étapes fournies par Heroku. Évitez donc de répéter deux fois la même étape.

    > La commande `$ git push heroku master` vous dira à quelle URL votre application a été déployée. Il est probable que votre serveur ne fonctionne pas en production, même si le déploiement s'est bien passé. (voir étape suivante)

3. Configuration: Modifier le serveur pour qu'il puisse se lancer sur le port défini par la variable d'environnement `PORT` fournie par Heroku, avec une valeur par défaut à `3000` pour l'exécution en local.

    > Documentation pour vous aider: [Specify port for Heroku](https://devcenter.heroku.com/articles/deploying-nodejs#specifying-a-start-script)

4. Documentation: Afin de pouvoir créer et déployer votre futur serveur plus rapidement, complétez `README.md` en listant les grandes étapes que vous avez suivies.

### En cas de problème de déploiement

> Si `$ git push heroku master` ne fonctionne pas (cf étape 4) ou ne pousse pas vos commits vers la bonne application Heroku, exécutez les commandes suivantes:

  ```sh
    $ git remote -v
    $ git remote rm heroku
    $ heroku create
    $ git remote add heroku <URL GIT RETOURNÉE PAR HEROKU>
    $ git push heroku master
  ```

---

## Exercice 7 (BONUS) - Création d'un véritable chat-bot

Toujours à l'aide de Node.js et Express, écrire un chat-bot contactable depuis Facebook Messenger ou autre application mobile de messagerie instantanée (ex: Telegram).

Liens:
- [Build a Personal Facebook Messenger Bot in 10 minutes with Nodejs and Standard Library](https://hackernoon.com/build-a-personal-facebook-messenger-bot-in-10-minutes-a7a237f3f018)
- [How to Deploy Express on Now.sh - DEV Community](https://dev.to/warenix/how-to-deploy-express-on-nowsh-414i)
- [Serverless Telegram Bot with Firebase - Francisco Gutiérrez - Medium](https://medium.com/@pikilon/serverless-telegram-bot-with-firebase-d11d07579d8a)

---

## Pour aller plus loin

### Modules: `module.exports` et `require()`

- [Comprendre module.exports et exportations dans Node.js](https://blog.arcoptimizer.com/comprendre-module-exports-et-exportations-dans-node-js)
- [What is the purpose of Node.js module.exports and how do you use it? - Stack Overflow](https://stackoverflow.com/a/5311377/592254)
- [Modules - Node.js Documentation](https://nodejs.org/api/modules.html#modules_module_exports)

### Fat arrow functions (`=>`)

- Explication concise: [Fonctions fléchées - JavaScript - MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Fonctions/Fonctions_fl%C3%A9ch%C3%A9es)
- [Les fat arrow function en Javascript](https://blog.nathanaelcherrier.com/fr/les-fat-arrow-function-en-javascript/)
- [ES6, ES2015 : les fonctions fléchées](https://putaindecode.io/fr/articles/js/es2015/arrow-functions/)

### Typage avec TypeScript

- [How To Use TypeScript In A Node.js and Express Project](https://catalins.tech/how-to-use-typescript-in-a-nodejs-and-express-project)

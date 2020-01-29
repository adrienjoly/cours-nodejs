---
title: Partie 1 - Chat-bot avec Express
layout: default
---

<!--
Programme:
- bio
- intro: qu'est-ce que node.js ? quels usages ?
- objectifs, plan du cours et évaluation
- favoriser l'entraide => scinder la classe en 2 groupes: ceux qui ont déjà mis une app node.js en prod, et les autres => répartir les étudiants de manière à ce que chaque personne du groupe 1 soit assise à côté d'une personne du groupe 2, et que l'écran des personnes les plus débutantes me soient le plus accessible possible.
-->

## Objectifs de cette partie

- Développer un chat-bot en Node.js et le mettre en production
- Bases: débogage et programmation asynchrone
- Persistance de données: lecture et modification de fichiers

Durée estimée: 3 heures.

## Pré-requis

Important: Si vous êtes sous Windows, merci d'utiliser **exclusivement** le terminal bash [Ubuntu](https://www.numerama.com/tech/158150-le-shell-bash-sous-windows-10-ce-quil-faut-savoir.html) installé après avoir activé [Windows Subsystem for Linux](https://docs.microsoft.com/fr-fr/windows/wsl/install-win10), [CMDER](http://cmder.net/) ou d'utiliser Linux depuis une machine virtuelle. Sous Mac ou Linux, vous serez en mesure d'utiliser votre terminal par défaut.

Pour effectuer ces exercices, assurez-vous que les pré-requis suivants sont bien installés et accessibles depuis votre terminal bash (ou compatible):
- `node`; (tester avec `$ node --version`)
- `curl`; (tester avec `$ curl --version`)
- et `git`. (vérifier que `$ git config --global user.email` retourne bien votre adresse email d'étudiant·e)

> Note: si vous avez installé Node.js sous Windows, il se peut que `node` ou `npm` ne fonctionnent pas depuis Ubuntu for Windows. Dans ce cas: désinstallez Node.js, installez-le depuis Ubuntu (cf [procédure](https://github.com/Microsoft/WSL/issues/3111#issuecomment-382713543)), puis redémarrez Ubuntu.

## Exercice 1 - Hello World

Le but est de développer un serveur Web/API basique qui répondra systématiquement "Hello World" à toutes les requêtes HTTP GET émises par des clients au chemin `/` (racine). Nous allons pour cela utiliser la bibliothèque [Express.js](https://expressjs.com/).

### Objectifs

- Fonctionnel: Une fois le serveur lancé, `$ curl http://localhost:3000/` retourne bien le texte "Hello World". (le corps de la réponse doit seulement contenir ce texte)
- Lisibilité: Le fichier JavaScript ne doit pas dépasser 15 lignes de code.
- Structure: Le code source du projet doit être disponible dans un dépôt git public, et celui-ci ne doit pas contenir plus de 5 fichiers: le fichier JavaScript (extension `.js`) contenant le code du serveur, `package.json`, `README.md` (description du projet et explication sur comment le faire fonctionner).
- Accessibilité: Il est possible de faire fonctionner ce serveur depuis une autre machine en seulement 3 étapes: `git clone`, `npm install` et `npm start`. Ces étapes sont décrites dans `README.md`.

### Étapes proposées

Ces étapes supposent que vous avez accès à un terminal Bash (ou compatible) dans lequel `node` est installé, et `git` est configuré avec votre identité d'étudiant·e.

0. Créer un dépôt sur l'hébergeur `git` de votre école, clonez-le sur votre disque-dur (`git clone <url_du_projet>`), puis n'oubliez pas d'entrer (avec `cd`) dans le répertoire qui aura été créé par `git clone`

1. Créer une application Node.js (ex: fichier `server.js`) qui affiche "Hello World" dans la sortie standard. (1 ligne de code)

2. Créer un premier `git commit` avec ce fichier puis l'uploader sur votre dépôt distant. (`git push`)

3. Initialiser `package.json` avec `npm init` puis ajouter la dépendance `express` à l'aide de `npm install` avec l'option `--save`.

    > Pro tip: Le répertoire `node_modules` (créé par `npm install`) ne doit jamais être inclus dans les commits d'un dépôt `git`. Pour ajouter ce répertoire à la liste des répertoires et fichiers ignorés par `git`, taper `$ echo node_modules >>.gitignore`.

4. Modifier le fichier `server.js` de manière à ce que l'application Node.js démarre un serveur HTTP qui réponde "Hello World" quand on lui envoie une requête GET.

    > Pour vous aider: [utilisation d'Express](https://expressjs.com/fr/starter/hello-world.html)

    > Veiller à ce que la réponse de chaque requête respecte *à la lettre* ce qui est demandé dans les *objectifs fonctionnels* fournis plus haut.

5. Créer un fichier `README.md` pour expliquer le plus simplement possible à d'autres personnes: que fait votre programme Node.js, comment l'installer et l'exécuter sur sa propre machine, et comment le tester. Ajouter ce fichier dans votre dépot `git`.

6. Créer une "release" `v1.1` pour garder une trace de cette version du serveur dans votre dépôt, avec `$ git tag v1.1`, puis assurez-vous qu'elle soit visible depuis l'hébergeur de dépôts `git` de l'école.

    > Pour enregistrer les tags sur votre dépot distant, il faut passer un paramètre supplémentaire à `git push`. À vous de trouver lequel !

Une fois que vous aurez terminé cet exercice, merci d'aider vos camarades qui auraient des difficultés.

## Exercice 2 - Déploiement en production

Maintenant que notre serveur Node.js/Express.js fonctionne en local, le but de cet exercice est de pouvoir y envoyer des requêtes via Internet, et donc de le déployer en production, sur Heroku.

### Objectifs

- Fonctionnel: Une fois le serveur déployé sur Heroku, il est possible de voir le "Hello World" en s'y connectant via le navigateur web.
- Lisibilité: (mêmes exigences que pour l'exercice précédent)
- Structure: (mêmes exigences que pour l'exercice précédent)
- Accessibilité: (mêmes exigences que pour l'exercice précédent)
- Production: Le serveur tourne en production, et fonctionne de la même manière qu'en local depuis n'importe quelle machine ayant accès à Internet.

### Étapes proposées

1. Créer un compte puis une "application" depuis [heroku.com](https://heroku.com).

    > Nous allons utiliser le déploiement manuel à l'aide de la commande `heroku` (CLI). => Ne cliquez pas sur l'icône "GitHub" depuis heroku.com et n'activez pas de "pipeline". 

2. Suivre les instructions fournies pour installer la commande (aussi appelé "CLI") `heroku` sur votre machine, puis vous connecter à votre compte depuis le terminal.

    > En cas de problème pour installer la commande `heroku`, vous pouvez l'installer comme dépendance locale à votre projet: `$ sudo npm install -g heroku`.

3. Suivre les instructions fournies pour déployer le serveur en production, sur votre application Heroku.

    > La commande `$ git push heroku master` vous dira à quelle URL votre application a été déployée. Il est probable que votre serveur ne fonctionne pas en production, même si le déploiement s'est bien passé. (voir étape suivante)

4. Modifier le serveur pour qu'il puisse se lancer sur le port défini par la variable d'environnement `PORT` fournie par Heroku, avec une valeur par défaut à `3000` pour l'exécution en local.

    > Documentation pour vous aider: [Specify port for Heroku](https://devcenter.heroku.com/articles/deploying-nodejs#specifying-a-start-script)

5. Créer une nouvelle "release" pour garder une trace de cette version du serveur dans votre dépôt: `$ git tag v1.2`.

Une fois que vous aurez terminé cet exercice, merci d'aider vos camarades qui auraient des difficultés.

> Si `$ git push heroku master` ne fonctionne pas (cf étape 4) ou ne pousse pas vos commits vers la bonne application Heroku, exécutez les commandes suivantes:

  ```sh
    $ git remote -v
    $ git remote rm heroku
    $ heroku create
    $ git remote add heroku <URL GIT RETOURNÉE PAR HEROKU>
    $ git push heroku master
  ```

## Exercice 3 - Paramètres `GET`

Nous avons à présent un serveur web dont l'API contient un seul point d'entrée (*endpoint*):
- `GET /` retourne systématiquement "Hello World".

Nous allons ajouter un point d'entrée `GET /hello` qui acceptera un paramètre, et ajustera le contenu de la réponse en fonction de la valeur de ce paramètre:

- `$ curl http://localhost:3000/hello?nom=Sasha` répondra `Bonjour, Sasha !`
- `$ curl http://localhost:3000/hello?nom=Michel` répondra `Bonjour, Michel !`
- `$ curl http://localhost:3000/hello` répondra `Quel est votre nom ?`

### Objectifs

- Fonctionnel: Le serveur implémente bien les cas d'usages fournis ci-dessus, ainsi que ceux des exercices précédents. (rétro-compatibilité)
- Lisibilité: 30 lignes de code max.
- Structure: (mêmes exigences que pour l'exercice précédent)
- Accessibilité: (mêmes exigences que pour l'exercice précédent)
- Production: (mêmes exigences que pour l'exercice précédent)

### Étapes proposées

1. Ajouter un point d'entrée `GET /hello` qui répond systématiquement `Quel est votre nom ?`.
2. Chercher dans [la documentation de Express.js](http://expressjs.com/fr/4x/api.html#req) comment récupérer la valeur d'un paramètre `GET`.
3. Modifier le point d'entrée `GET /hello` de manière à ce qu'il réponde `Bonjour, <nom> !` si un nom a été fourni en paramètre `GET`, ou `Quel est votre nom ?` si ce n'est pas le cas.
4. Déployer une mise à jour de votre serveur en production.
5. Créer une nouvelle "release" pour garder une trace de cette version du serveur dans votre dépôt: `$ git tag v1.3`.

Une fois que vous aurez terminé cet exercice, merci d'aider vos camarades qui auraient des difficultés.

## Exercice 4 - Chat-bot / message en `POST`

Nous avons à présent un serveur web dont l'API contient deux points d'entrée (*endpoints*):
- `GET /` retourne systématiquement "Hello World".
- `GET /hello` retourne une salutation au `nom` fourni en paramètre GET.

Le but est que notre API développée dans l'exercice précédent puisse également répondre un message pertinent à chaque message envoyé par les utilisateurs. Sachant qu'un message peut être trop long pour passer par un paramètre GET, nous allons le passer via le corps d'une requête HTTP POST.

Pour cela, nous allons y ajouter un point d'entrée (*endpoint*) de méthode POST au chemin `/chat`. Celui-ci pourra adapter sa réponse en fonction du contenu passé avec chaque requête. Le contenu devra être passé au format JSON, et le message de l'utilisateur devra être transmis comme valeur de la propriété `msg`.

Exemples / cas d'usage:
- `$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"ville\"}" http://localhost:3000/chat` répondra "Nous sommes à Paris"
- `$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"météo\"}" http://localhost:3000/chat` répondra "Il fait beau"

> Indice: vous allez devoir intégrer un *middleware* à votre application Express, afin qu'elle soit en mesure d'extraire les données au format JSON.

### Objectifs

- Fonctionnel: Le serveur implémente bien les cas d'usages listés ci-dessus, ainsi que ceux des exercices précédents. (rétro-compatibilité)
- Lisibilité: 40 lignes de code max.
- Structure: (mêmes exigences que pour l'exercice précédent)
- Accessibilité: (mêmes exigences que pour l'exercice précédent)
- Production: (mêmes exigences que pour l'exercice précédent)

### Étapes proposées

1. Ajouter le point d'entrée, sans modifier celui que nous avons développé à l'exercice précédent.
2. Faire en sorte que ce point d'entrée retourne le contenu passé avec la requête, tel quel, quel que soit son format.
3. Modifier l'implémentation du point d'entrée pour afficher seulement la valeur de la propriété `msg` du contenu passé au format JSON.
4. Modifier l'implémentation du point d'entrée pour que les cas d'usages listés ci-dessus soient remplis.
5. Déployer une mise à jour de votre serveur en production.
6. Créer une nouvelle "release" pour garder une trace de cette version du serveur dans votre dépôt: `$ git tag v1.4`.

> Documentation de Express: https://expressjs.com/fr/starter/basic-routing.html

Une fois que vous aurez terminé cet exercice, merci d'aider vos camarades qui auraient des difficultés.

## Exercice 5 - Chat-bot avec mémoire

Nous avons à présent un serveur web dont l'API contient les points d'entrée (*endpoints*) suivants:
- `GET /` retourne systématiquement "Hello World".
- `GET /hello` retourne une salutation personnalisée.
- `POST /chat` retourne une réponse en fonction de la valeur de la propriété `msg` passée au format JSON.

Nous voulons désormais que notre chat-bot soit capable d'apprendre de nouvelles informations lors des échanges avec les utilisateurs, et d'exploiter ces informations pour mieux répondre lors des prochains échanges.

Exemples de conversation / cas d'usage:
1. `$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"demain\"}" http://localhost:3000/chat` répondra "Je ne connais pas demain..."
2. `$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"demain = Mercredi\"}" http://localhost:3000/chat` répondra "Merci pour cette information !"
3. `$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"demain\"}" http://localhost:3000/chat` répondra "demain: Mercredi" (y compris après redémarrage du serveur)

Pour cela, nous allons:
- enregistrer toute nouvelle information dans un fichier `réponses.json`,
- pour chaque requête reçue, chercher si le fichier contient la réponse correspondante.

### Objectifs

- Fonctionnel: Le serveur implémente bien le cas d'usage fourni ci-dessus, ainsi que ceux des exercices précédents. (rétro-compatibilité)
- Lisibilité: 50 lignes de code max.
- Structure: (mêmes exigences que pour l'exercice précédent, avec 1 fichier supplémentaire)
- Accessibilité: (mêmes exigences que pour l'exercice précédent)
- Production: (mêmes exigences que pour l'exercice précédent)

### Étapes proposées

1. Faire en sorte que le point d'entrée `/chat` enregistre la clé (ex: "demain") et la valeur (ex: "Mercredi") fournies par l'utilisateur dans la fichier `réponses.json`, lorsque celui-ci fournit une nouvelle information. (étape 2 du cas d'usage)
2. Faire en sorte que, après avoir fourni une information, l'utilisateur puisse retrouver cette information en formulant une requête (cf étape 3 du cas d'usage), grâce au fichier `réponses.json`.
3. Faire en sorte que toutes les étapes du cas d'usage fonctionne, plusieurs fois d'affilée, y compris avec d'autres mots que "demain" et d'autres valeurs que "Mercredi". S'assurer que les nouvelles informations sont encore exploitables même après avoir redémarré le serveur.
4. Déployer une mise à jour de votre serveur en production.
5. Créer une nouvelle "release" pour garder une trace de cette version du serveur dans votre dépôt: `$ git tag v1.5`.

> Références Node.js et JavaScript: [readFileSync()](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options), [writeFileSync()](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options), [JSON.parse()](https://devdocs.io/javascript/global_objects/json/parse), [JSON.stringify()](https://devdocs.io/javascript/global_objects/json/stringify), [String.split()](https://devdocs.io/javascript/global_objects/string/split), [Manipulations de tableaux](http://adrienjoly.com/cours-javascript/tp05.html#recherche-d%C3%A9l%C3%A9ment-par-valeur).

BONUS:

- Utilisation de la version asynchrone des appels au file system: `readFile()` et `writeFile()`
- Archivage des conversations dans plusieurs fichiers (un par interlocuteur)

## Prise de recul: appels synchrones et asynchrones

Questions auxquelles savoir répondre:

- Quelles fonctions avez-vous appelées de manière asynchrone ?
- Quelles fonctions avez-vous appelées de manière synchrone ?
- Comment reconnaître un appel synchrone d'un appel asynchrone ? Quelle différence ?
- Quelles fonctionnalités auraient pu être implémentées de manière synchrone ou asynchrone ?
- Quels auraient été les impacts de ces deux manières de faire sur notre application ? (ex: avantages, inconvénients, risques, impacts sur la performance, cas limites, etc...)
- Qu'est-ce qu'un *callback* ?

<!-- Bonus: Comparer appels synchrones et asynchrones à l’aide d’un profileur -->

## Pour aller plus loin

### Modules: `module.exports` et `require()`

- [Comprendre module.exports et exportations dans Node.js](https://blog.arcoptimizer.com/comprendre-module-exports-et-exportations-dans-node-js)
- [What is the purpose of Node.js module.exports and how do you use it? - Stack Overflow](https://stackoverflow.com/a/5311377/592254)
- [Modules - Node.js v11.11.0 Documentation](https://nodejs.org/api/modules.html#modules_module_exports)

### *Fat arrow functions* (`=>`)

- Explication concise: [Fonctions fléchées - JavaScript - MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Fonctions/Fonctions_fl%C3%A9ch%C3%A9es)
- [Les fat arrow function en Javascript](https://blog.nathanaelcherrier.com/fr/les-fat-arrow-function-en-javascript/)
- [ES6, ES2015 : les fonctions fléchées](https://putaindecode.io/fr/articles/js/es2015/arrow-functions/)

### Création d'un véritable chat-bot en ligne

💡 Avec l'aide de Node.js, il est possible de programmer un chat-bot contactable via Facebook Messenger, ou tout autre plateforme de messagerie instantanée (ex: Telegram). Il est aussi possible de déployer sur d'autres hébergeurs Cloud que Heroku (ex: Firebase).

Liens:
- [Build a Personal Facebook Messenger Bot in 10 minutes with Nodejs and Standard Library](https://hackernoon.com/build-a-personal-facebook-messenger-bot-in-10-minutes-a7a237f3f018)
- [How to Deploy Express on Now.sh - DEV Community](https://dev.to/warenix/how-to-deploy-express-on-nowsh-414i)
- [Serverless Telegram Bot with Firebase - Francisco Gutiérrez - Medium](https://medium.com/@pikilon/serverless-telegram-bot-with-firebase-d11d07579d8a)

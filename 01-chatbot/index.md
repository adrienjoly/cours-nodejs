---
title: Séance 1 - Chat-bot avec Express
layout: default
---

<!--
Programme de la séance:
- présentations: bio, tour de table
- intro: qu'est-ce que node.js ? quels usages ?
- objectifs et plan du cours, nombre et structure des séances, évaluation
- favoriser l'entraide => scinder la classe en 2 groupes: ceux qui ont déjà mis une app node.js en prod, et les autres => répartir les étudiants de manière à ce que chaque personne du groupe 1 soit assise à côté d'une personne du groupe 2, et que l'écran des personnes les plus débutantes me soient le plus accessible possible.
-->

## Objectifs de cette séance

- Développer un chat-bot en Node.js et le mettre en production
- Persistance de données: lecture et modification de fichiers
- Bases: débogage et programmation asynchrone

Durée estimée cours + exercices: 6 heures.

## Pré-requis

Important: Si vous êtes sous Windows, merci d'utiliser **exclusivement** le terminal bash [Ubuntu](https://www.numerama.com/tech/158150-le-shell-bash-sous-windows-10-ce-quil-faut-savoir.html) installé après avoir activé [Windows Subsystem for Linux](https://docs.microsoft.com/fr-fr/windows/wsl/install-win10), [CMDER](http://cmder.net/) ou d'utiliser Linux depuis une machine virtuelle. Sous Mac ou Linux, vous serez en mesure d'utiliser votre terminal par défaut.

Pour effectuer ces exercices, assurez-vous que les pré-requis suivants sont bien installés et accessibles depuis votre terminal bash (ou compatible):
- `node`; (tester avec `$ node --version`)
- et `git`. (vérifier que `$ git config --global user.email` retourne bien votre adresse email d'étudiant·e)

> Note: si vous avez installé Node.js sous Windows, il se peut que `node` ou `npm` ne fonctionnent pas depuis Ubuntu for Windows. Dans ce cas: désinstallez Node.js, installez-le depuis Ubuntu (cf [procédure](https://github.com/Microsoft/WSL/issues/3111#issuecomment-382713543)), puis redémarrez Ubuntu.

## Exercice 1.1 - Hello World

Le but est de développer et mettre en production un serveur web/API basique qui répondra systématiquement "Hello World" à tous les clients qui enverront une requête HTTP GET au chemin `/hello`.

### Critères de validation

- Fonctionnel: Une fois le serveur lancé, `$ curl http://localhost:3000/hello` retourne bien le texte "Hello World". (le corps de la réponse doit seulement contenir ce texte)
- Lisibilité: Le fichier JavaScript ne doit pas dépasser 15 lignes de code, et doit respecter les [conventions de code vues l'an passé](http://adrienjoly.com/cours-javascript/tp02.html#indentation-et-autres-conventions-%C3%A0-respecter).
- Structure: Le code source du projet doit être disponible dans un dépôt git, et celui-ci ne doit pas contenir plus de 4 fichiers: le fichier JavaScript (extension `.js`) contenant le code du serveur, `package.json`, `README.md` (description du projet et explication sur comment le faire fonctionner), et éventuellement un fichier de configuration pour sa mise en production.
- Accessibilité: Il est possible de faire fonctionner ce serveur depuis une autre machine en seulement 3 étapes: `git clone`, `npm install` et `npm start`. Ces étapes sont décrites dans `README.md`.
- Production: Le serveur tourne en production, et fonctionne de la même manière qu'en local depuis n'importe quelle machine ayant accès à Internet.

### Étapes proposées

Ces étapes supposent que vous avez accès à un terminal Bash (ou compatible) dans lequel `node` est installé, et `git` est configuré avec votre identité d'étudiant·e.

1. Créer une application Node.js (ex: fichier `server.js`) qui affiche "Hello World" dans la sortie standard. (1 ligne de code)
2. Initialiser le dépôt local (`git init`) avec ce fichier (`git add`, `git commit`) puis l'uploader sur l'hébergeur de dépôts `git` de l'école. (`git push`)
3. Initialiser `package.json` avec `npm init` puis ajouter la dépendance `express` à l'aide de `npm install` avec l'option `--save`.
4. Modifier le fichier `server.js` de manière à ce que l'application Node.js démarre un serveur HTTP qui réponde "Hello World" quand on lui envoie une requête GET.
5. Mettre le serveur en production en le déployant sur votre compte Heroku.
6. Modifier le serveur pour qu'il puisse se lancer sur le port défini par la variable d'environnement `PORT` fournie par Heroku, avec une valeur par défaut à `3000` pour l'execution en local.
7. Créer une "release" `v1.1` pour garder une trace de cette version du serveur dans votre dépôt, avec `$ git tag v1.1`, puis assurez-vous qu'elle soit visible depuis l'hébergeur de dépôts `git` de l'école.

<!-- TODO: décrire déploiement plus en détails ? -->

> Documentation pour vous aider: [Install Express](https://expressjs.com/fr/starter/installing.html), [Specify port for Heroku](https://devcenter.heroku.com/articles/deploying-nodejs#specifying-a-start-script)

> Pro tip: après l'étape 3, taper `$ echo node_modules >>.gitignore` pour éviter que les dépendances installées dans le répertoire `node_modules` (créé par `npm install`) ne soient sauvegardées dans votre historique `git`.

> Pro tip 2: en cas de problèmes pour installer la commande `heroku` (cf étape 5), vous pouvez essayer `$ npm install --global heroku`, ou encore `$ npm install heroku` puis `./node_modules/.bin/heroku`.

Une fois que vous aurez terminé cet exercice, merci d'aider vos camarades qui auraient des difficultés.

## Exercice 1.2 - Chat-bot

Le but est que notre API développée dans l'exercice précédent puisse également répondre un message pertinent à chaque message envoyé par les utilisateurs via le corps d'une requête HTTP POST.

Pour cela, nous allons y ajouter un point d'entrée (*endpoint*) de méthode POST au chemin `/chat`. Celui-ci pourra adapter sa réponse en fonction du contenu passé avec chaque requête. Le contenu devra être passé au format JSON, et le message de l'utilisateur devra être transmis comme valeur de la propriété `msg`.

Exemples / cas d'usage:
- `$ curl -X POST --header "Content-Type: application/json" --data '{"msg":"ville"}' http://localhost:3000/chat` répondra "Nous sommes à Paris"
- `$ curl -X POST --header "Content-Type: application/json" --data '{"msg":"météo"}' http://localhost:3000/chat` répondra "Il fait beau"

### Critères de validation

- Fonctionnel: Le serveur implémente bien les cas d'usages listés ci-dessus, ainsi que celui de l'exercice précédent. (rétro-compatibilité)
- Lisibilité: 30 lignes de code max.
- Structure: (mêmes exigences que pour l'exercice précédent)
- Accessibilité: (mêmes exigences que pour l'exercice précédent)
- Production: (mêmes exigences que pour l'exercice précédent)

### Étapes proposées

1. Ajouter le point d'entrée, sans modifier celui que nous avons développé à l'exercice précédent.
2. Faire en sorte que ce point d'entrée retourne le contenu passé avec la requête, tel quel, quel que soit son format.
3. Modifier l'implémentation du point d'entrée pour afficher seulement la valeur de la propriété `msg` du contenu passé au format JSON.
4. Modifier l'implémentation du point d'entrée pour que les cas d'usages listés ci-dessus soient remplis.
5. Déployer une mise à jour de votre serveur en production.
6. Créer une nouvelle "release" pour garder une trace de cette version du serveur dans votre dépôt: `$ git tag v1.2`.

> Documentation de Express: https://expressjs.com/fr/starter/basic-routing.html

Une fois que vous aurez terminé cet exercice, merci d'aider vos camarades qui auraient des difficultés.

BONUS: Ajouter un point d'entrée GET à la racine du serveur (chemin: `/`) qui retourne une page HTML permettant aux utilisateurs d'envoyer des messages plus facilement, à l'aide d'un formulaire.

## Exercice 1.3 - Chat-bot avec mémoire

Nous avons à présent un serveur web dont l'API contient deux points d'entrée (*endpoints*):
- `GET /hello` retourne systématiquement "Hello World".
- `POST /chat` retourne une réponse en fonction de la valeur de la propriété `msg` passée au format JSON.

Nous voulons désormais que notre chat-bot soit capable d'apprendre de nouvelles informations lors des échanges avec les utilisateurs, et d'exploiter ces informations pour mieux répondre lors des prochains échanges.

Exemples de conversation / cas d'usage:
1. `$ curl -X POST --header "Content-Type: application/json" --data '{"msg":"demain"}' http://localhost:3000/chat` répondra "Je ne connais pas demain..."
2. `$ curl -X POST --header "Content-Type: application/json" --data '{"msg":"demain = Mercredi"}' http://localhost:3000/chat` répondra "Merci pour cette information !"
3. `$ curl -X POST --header "Content-Type: application/json" --data '{"msg":"demain"}' http://localhost:3000/chat` répondra "demain: Mercredi" (y compris après redémarrage du serveur)

Pour cela, nous allons:
- enregistrer toute nouvelle information dans un fichier `réponses.json`,
- pour chaque requête reçue, chercher si le fichier contient la réponse correspondante.

### Critères de validation

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
5. Créer une nouvelle "release" pour garder une trace de cette version du serveur dans votre dépôt: `$ git tag v1.3`.

> Références Node.js et JavaScript: [readFileSync()](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options), [writeFileSync()](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options), [JSON.parse()](https://devdocs.io/javascript/global_objects/json/parse), [JSON.stringify()](https://devdocs.io/javascript/global_objects/json/stringify), [String.split()](https://devdocs.io/javascript/global_objects/string/split), [Manipulations de tableaux](http://adrienjoly.com/cours-javascript/tp05.html#recherche-d%C3%A9l%C3%A9ment-par-valeur).

<!--BONUS: Archivage des conversations dans plusieurs fichiers (un par interlocuteur)-->

## Étude: appels synchrones et asynchrones

Questions sur lesquelles réfléchir:
- Quelles fonctions avez-vous appelées de manière asynchrone ?
- Quelles fonctions avez-vous appelées de manière synchrone ?
- Comment reconnaître un appel synchrone d'un appel asynchrone ? Quelle différence ?
- Quelles fonctionnalités auraient pu être implémentées de manière synchrone ou asynchrone ?
- Quels auraient été les impacts de ces deux manières de faire sur notre application ? (ex: avantages, inconvénients, risques, impacts sur la performance, cas limites, etc...)
- Qu'est-ce qu'un *callback* ?

<!-- Bonus: Comparer appels synchrones et asynchrones à l’aide d’un profileur -->

## Exercice à rendre: audit d'API

Le but de cet exercice est d'auditer l'API de l'étudiant qui se trouve assis à votre gauche, afin d'y trouver des bugs, failles de sécurité et autres limitations.

Vous devrez envoyer un court rapport de votre audit à l'enseignant, contenant pour chaque trouvaille les informations suivantes:
- description concise de la limitation, (ex: "le serveur répond `error` quand `msg` vaut `0`")
- lister de manière précise les actions à effectuer pour reproduire le bug ou faire apparaître cette limitation, (ex: 1. lancer le serveur, 2. executer `$ curl -X POST --data '{"msg":"demain"}' http://localhost:3000/chat`, 3. vérifier que la réponse à cette requête contient `error`)
- proposer une solution pour corriger le bug, la faille de sécurité ou autre limitation. (ex: modifier la condition à la ligne 4 du fichier `server.js` afin de couvrir ce cas)

N'oubliez pas d'inclure à votre rendu:
- l'URL du dépôt git de votre serveur API
- l'URL du dépôt git du serveur API que vous avez audité
- l'URL à laquelle votre serveur API est accessible en production
- l'URL à laquelle le serveur API que vous avez audité est accessible en production

L'un de vous viendra présenter son audit en début de la prochaine séance.

> Suggestions: Pour vous aider à identifier les limitations, vous pouvez utiliser un débogueur Node.js (ex: `ndb` ou Visual Studio Code), des scripts Bash lançant plusieurs requêtes d'affilée, et/ou un outil de test de charge. Vous pouvez aussi repérer certaines limitations (ex: cas limites) en lisant attentivement le code de votre camarade.

## Pour aller plus loin

💡 Avec l'aide de Node.js, il est possible de programmer un chat-bot contactable via Facebook Messenger, ou tout autre plateforme de messagerie instantanée. Il est aussi possible de déployer sur d'autres hébergeurs Cloud que Heroku.

Liens:
- [Build a Personal Facebook Messenger Bot in 10 minutes with Nodejs and Standard Library](https://hackernoon.com/build-a-personal-facebook-messenger-bot-in-10-minutes-a7a237f3f018)
- [How to Deploy Express on Now.sh - DEV Community](https://dev.to/warenix/how-to-deploy-express-on-nowsh-414i)

---
title: Partie 4 - Persistance de données avec MongoDB
layout: default
---

<!--
Programme:
- favoriser l'entraide => répartir les étudiants de manière à ce que je puisse accéder facilement aux étudiants les plus en difficulté. + faire en sorte qu'ils soient assis à côté de personnes qui ont réussi le TP de la dernière fois.
- s'assurer que tout le monde a compris comment se connecter à MongoDB
-->

## Objectifs de cette partie

- Apprendre à stocker et récupérer des données dans une base de données [MongoDB](https://www.mongodb.com/)
- Étendre le chat-bot pour retrouver l'historique des conversations

Durée estimée: 3-6 heures.

## Pré-requis

Pour effectuer ces exercices, assurez-vous que les pré-requis suivants sont bien installés et accessibles depuis votre shell Linux:
- `node`; (tester avec `$ node --version`)
- `curl`; (tester avec `$ curl --version`)

## Comment disposer d'un serveur MongoDB ?

Il existe (au moins) trois manières de procéder:

### A. Utilisation d'un serveur MongoDB dans le cloud

Il suffit de créer un compte sur [MongoDB Atlas](https://mongodb.com/cloud/atlas) puis de suivre les étapes proposées pour créer (puis tester) une base de données basée sur la plateforme "Azure".

  > À vérifier en cas de difficultés: il est possible que cette connexion soit rendue impossible par votre pare-feu ou par le réseau de votre école.
  
  <!-- Notes about MongoDB Cloud Atlas @ ESGI: https://github.com/adrienjoly/cours-nodejs/issues/2#issuecomment-473357714 -->

### B. Exécution d'une image Docker

Si [Docker](https://www.docker.com/products/docker-desktop) fonctionne bien sur votre machine, lancer le serveur MongoDB via une image Docker, en suivant ces étapes:

  1. Télécharger et exécuter l'image Docker du serveur de MongoDB avec la commande suivante:

  ```sh
  $ docker run --rm --publish 27017:27017 --name mongodb-pour-nodejs mongo:4
  ```

  2. Tester la connection au serveur MongoDB en exécutant cette commande:

  ```sh
  $ docker run --rm -it --link mongodb-pour-nodejs:mongo mongo:4 mongo --host mongo test
  ```

### C. Installer MongoDB localement

Sinon: installer, configurer et lancer un serveur MongoDB sur votre machine, en suivant ces étapes:

  1. Installer [MongoDB Server, community edition](https://www.mongodb.com/download-center/community) sur votre machine, et de manière à ce qu'il soit accessible depuis votre shell Linux.

  2. Après avoir redémarré votre shell Linux, si la commande `mongod` est introuvable, ajoutez le répertoire créé dans la variable `PATH` de votre système d'exploitation, en suivant les instructions de [Install MongoDB](https://docs.mongodb.com/guides/server/install/#id1).

  3. Comme indiqué dans les instructions de [Run MongoDB](https://docs.mongodb.com/guides/server/install/#run-mongodb), créez un répertoire `/data/db` et assurez-vous qu'il sera accessible à `mongod` en donnant les permissions nécessaires: `$ sudo chmod 777 /data/db`.

  4. Ensuite, vous devriez être en mesure de lancer le serveur `mongod`, et de vous y connecter à l'aide du client `mongo`, depuis une autre session de shell Linux. (cf étapes ci-dessous)

## Comment tester la connection à un serveur MongoDB ?

Dans une session de shell Linux, utiliser le client "[`mongo` Shell](https://docs.mongodb.com/manual/mongo/)" pour vérifier que la base de données est bien accessible. Il suffit de taper `mongo` suivi de l'URL du serveur.

Une fois connecté au serveur via l'invite de commandes du client `mongo`, la commande `show dbs` devrait afficher une liste de bases de données.

Pressez Ctrl-C pour quitter le client et retourner à l'invite de commandes du shell Linux.

## Exercice 1 - Lecture et écriture dans MongoDB

Dans cet exercice, nous allons découvrir comment manipuler une base de données MongoDB depuis un programme Node.js, à l'aide du package [`mongodb`](https://www.npmjs.com/package/mongodb). (anciennement connu sous le nom de "MongoDB Native Driver for Node.js")

Nous allons écrire un programme Node.js qui va:
- se connecter à une base de données MongoDB;
- afficher tous les documents stockés dans la collection "`dates`";
- ajouter un document `{ date: new Date() }` dans cette collection.

Utiliser `await` pour tous les appels asynchrones à la base de données.

Le code source devrait tenir sur une quarantaine de lignes.

### Étapes proposées

1. Initialiser un serveur de base de données MongoDB. (cf _Comment disposer d'un serveur MongoDB ?_, plus haut)

2. Vérifier que vous parvenez bien à vous connecter à ce serveur depuis votre shell Linux. (cf _Comment tester la connection à un serveur MongoDB ?_, plus haut)

3. Initialiser un projet Node.js dans un répertoire vide, installer le package `mongodb` avec npm, et vérifier qu'il a bien été ajouté au fichier `package.json` du projet.

4. Créer et faire fonctionner un programme `dates.js` qui se sert du package `mongodb` pour se connecter à la base de données créée à l'étape 1. (cf [Connecting](http://mongodb.github.io/node-mongodb-native/3.1/reference/ecmascriptnext/connecting/))

    > Note: Vous pouvez ignorer le message disant que la méthode de connexion est dépréciée. Par contre, votre programme devrait pouvoir s'exécuter sans erreur.

5. Modifier `dates.js` pour qu'il affiche la liste des documents de la collection `dates` dans la sortie standard. Initialement, cette liste sera un tableau vide.

    > Documentation: [Read methods](http://mongodb.github.io/node-mongodb-native/3.1/reference/ecmascriptnext/crud/#read-methods)

6. Ajouter dans `dates.js` les instructions nécéssaires pour ajouter un document `{ date: new Date() }` dans la collection `dates`, avant l'affichage des documents de cette même collection.

    > Documentation: [Inserting documents](http://mongodb.github.io/node-mongodb-native/3.1/reference/ecmascriptnext/crud/#inserting-documents)

Une fois que vous aurez terminé cet exercice, merci d'aider vos camarades qui auraient des difficultés.

## Exercice 2 - Stockage de l'historique dans MongoDB

Dans cet exercice, nous allons compléter le serveur "chat-bot" que nous avons développé jusqu'à l'exercice 5 de la partie 1 du cours, de manière à:

- tenir un historique des messages envoyés au point d'accès `POST /chat` et de leurs réponses, dans une collection MongoDB;
- et donner accès à cet historique via deux nouveaux points d'accès: `GET /messages/all` et `DELETE /messages/last`.

Utiliser `await` pour tous les appels asynchrones.

Le code source devrait tenir sur une centaine de lignes.

Fournir un fichier `README.md` décrivant les 3 commandes (max.) nécessaires pour télécharger et faire fonctionner ce serveur depuis une autre machine.

### Exemples de conversation / cas d'usage:

1. `$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"ville\"}" "http://localhost:3000/chat"` répondra "Nous sommes à Paris" (comme précedemment)
2. `$ curl -X GET "http://localhost:3000/messages/all"` affichera l'historique des conversations (messages de l'utilisateur et réponses du chat-bot), tel que décrit ci-dessous, y compris après redémarrage du serveur
3. `$ curl -X DELETE "http://localhost:3000/messages/last"` supprimera le dernier échange de l'historique (message de l'utilisateur + réponse du chat-bot)

### Modèle de réponse à `GET /messages/all`

Notre serveur doit retourner l'historique sous forme d'un tableau JavaScript contenant tous les messages echangés, dans l'ordre chronologique.

En guise d'exemple, voici ce que devrait retourner le serveur si on requête `GET /messages/all` après avoir suivi le cas d'usage ci-dessus:

```json
[
  {
    "from": "user",
    "msg": "demain"
  },
  {
    "from": "bot",
    "msg": "Demain: Mercredi"
  }
]
```

## Format des documents d'historique de la collection `messages`

Chaque message reçu ou répondu par le chat-bot doit être représenté par un document défini par les trois propriétés suivantes:

  - `_id` (type: `ObjectId`): un identifiant unique, généré automatiquement par MongoDB pour chaque message;
  - `from` (type: `string`): l'émetteur du message, `bot` ou `user`;
  - `msg` (type: `string`): le contenu du message. (ex: `demain = Mercredi`)

### Étapes proposées

1. Modifier `server.js` pour qu'il se connecte à la base de données.
2. Implémenter et tester le point d'accès `GET /messages/all`. (il devrait retourner un tableau vide)
3. Faire en sorte que ce point d'accès retourne l'historique des conversations => Enregistrer les messages de l'utilisateur et les réponses du chat-bot dans la collection `messages`.
4. Implémenter le point d'accès `DELETE /messages/last`, et vérifier à l'aide d'une requête à `GET /messages/all` qu'il fonctionne bien comme prévu.
5. Rédiger la documentation demandée dans `README.md`.

## Exercice 3 - Chat-bot et base de données en production

Le but de cet exercice est de mettre le serveur développé ci-dessus en production, afin qu'il soit accessible en permanence et à quiconque sur internet.

### Étapes proposées

1. Enregistrer l'URL d'accès à votre base de données MongoDB dans une variable d'environnement de votre application sur Heroku: `MONGODB_URI`.
2. Modifier `server.js` pour qu'il parvienne à se connecter à cette base de données, que celui-ci s'exécute en production ou en local, grâce à cette variable d'environnement.
3. Documenter les points d'accès de votre API dans `README.md`, afin que d'autres utilisateurs comprennent rapidement comment l'utiliser, que ce soit en production ou localement.

## Exercices Bonus

- Utiliser OpenAPI pour documenter votre API => ajouter le modèle au format YAML dans votre dépôt.
- Utiliser l'ORM/ODM "Mongoose" pour manipuler la base de données, au lieu du package `mongodb`. => Expliquez l'impact de ce changement: avantages et inconvénients, en supposant que votre application soit destinée à se développer.
- Expliquez comment procéder si jamais la structure de votre base de données (aussi appelée "schema") est amenée à changer d'une version à l'autre de votre application. Comment éviter tout conflit de versions entre la structure des données en base de données et celle qui est reconnue par le programme, et tout bug ou crash que cela pourrait provoquer.

## Pour aller plus loin

### Ressources sur la création d'APIs:

- Spécification, documentation et instrumentalisation d'API: [OpenAPI et Swagger](https://swagger.io/solutions/getting-started-with-oas/)
- Alternative moderne aux APIs REST: [GraphQL](https://graphql.org/)

### Ressources sur la conception et exploitation de base de données MongoDB en production:

- [Mongoose ODM v5.4.5](https://mongoosejs.com/)
- [mongodb - How to properly handle mongoose schema migrations? - Stack Overflow](https://stackoverflow.com/questions/18295357/how-to-properly-handle-mongoose-schema-migrations)

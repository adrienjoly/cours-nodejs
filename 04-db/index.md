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

- Apprendre à stocker et récupérer des données dans une base de données MongoDB
- Étendre le chat-bot pour retrouver l'historique des conversations

Durée estimée: 3-6 heures.

## Pré-requis

Pour effectuer ces exercices, assurez-vous que les pré-requis suivants sont bien installés et accessibles depuis votre shell Linux:
- `node`; (tester avec `$ node --version`)
- `curl`; (tester avec `$ curl --version`)

## Exercice 1 - Lecture et écriture dans MongoDB

Le but est de découvrir comment manipuler une base de données MongoDB depuis un programme Node.js, à l'aide du package [`mongodb`](https://www.npmjs.com/package/mongodb). (anciennement connu sous le nom de "MongoDB Native Driver for Node.js")

Pour cela, nous allons:
- créer une collection MongoDB "`dates`";
- découvrir comment lire et écrire des données dans cette collection depuis un programme Node.js, à l'aide du package `mongodb`.

### Objectifs

- Fonctionnel: Le programme doit se connecter à une base de données MongoDB, ajouter un document `{ date: new Date() }` dans la collection `dates`, puis afficher tous les documents actuellement stockés dans cette collection.
- Lisibilité: 40 lignes de code max, utilisation de `async`/`await` pour les appels asynchrones à la base de données.
- Structure: Le code source du projet ne doit pas contenir plus de 7 fichiers. (dont `dates.js`, `package.json` et `README.md`)
- Production: À ce stade, vous n'aurez pas besoin de déployer quoi que ce soit en production.

### Étapes proposées

1. Initialiser un serveur de base de données MongoDB. Il existe (au moins) trois manières de procéder:

    > (A) Utilisation d'un serveur MongoDB dans le cloud: Il suffit de créer un compte sur [MongoDB Atlas](https://mongodb.com/cloud/atlas) puis de suivre les étapes proposées pour créer (puis tester) une base de données basée sur la plateforme "Azure". ⚠ Vérifier que vous parvenez bien à vous connecter via le réseau WiFi de votre école, ce n'est pas toujours le cas.
    >
    > (B) Sinon -- si Docker fonctionne bien sur votre machine -- lancer le serveur MongoDB via une image Docker, en suivant ces étapes:
    >
    > 1. Télécharger et exécuter l'image Docker du serveur de MongoDB avec la commande suivante:
    >    ```sh
    >    $ docker run --rm --publish 27017:27017 --name mongodb-pour-nodejs mongo:4
    >    ```
    > 2. Tester la connection au serveur MongoDB en exécutant cette commande:
    >    ```sh
    >    $ docker run --rm -it --link mongodb-pour-nodejs:mongo mongo:4 mongo --host mongo test
    >    ```
    >
    > (C) Sinon: installer, configurer et lancer un serveur MongoDB sur votre machine, en suivant ces étapes:
    >
    > 1. Installer [MongoDB Server, community edition](https://www.mongodb.com/download-center/community) sur votre machine,
    > 2. Après avoir redémarré votre shell Linux, si la commande `mongod` est introuvable, ajoutez le répertoire créé dans la variable `PATH` de votre système d'exploitation, en suivant les instructions de [Install MongoDB](https://docs.mongodb.com/guides/server/install/#id1),
    > 3. Comme indiqué dans les instructions de [Run MongoDB](https://docs.mongodb.com/guides/server/install/#run-mongodb), créez un répertoire `/data/db` et assurez-vous qu'il sera accessible à `mongod` en donnant les permissions nécessaires: `$ sudo chmod 777 /data/db`.
    > 4. Ensuite, vous devriez être en mesure de lancer le serveur `mongod`, et de vous y connecter à l'aide du client `mongo`, depuis une autre session de shell Linux. (cf étape suivante de l'exercice)

<!-- Notes about MongoDB Cloud Atlas @ ESGI: https://github.com/adrienjoly/cours-nodejs/issues/2#issuecomment-473357714 -->

2. Dans une session de shell Linux, utiliser le client "[`mongo` Shell](https://docs.mongodb.com/manual/mongo/)" pour vérifier que la base de données est bien accessible. La commande `show dbs` devrait afficher une liste de bases de données, puis pressez Ctrl-C pour quitter le client.

3. De retour dans votre projet Node.js, installer le package `mongodb` avec npm, et vérifier qu'il a bien été ajouté au fichier `package.json` du projet.

4. Créer un programme `dates.js` qui se sert du package `mongodb` pour se connecter à la base de données créée à l'étape 1. (cf [Connecting](http://mongodb.github.io/node-mongodb-native/3.1/reference/ecmascriptnext/connecting/))

    > Note: Vous pouvez ignorer le message disant que la méthode de connexion est dépréciée. Par contre, votre programme devrait pouvoir s'exécuter sans erreur.

5. Après avoir vérifié que `$ node dates.js` s'exécute sans erreur, modifier `dates.js` pour qu'il affiche la liste des documents de la collection `dates` dans la sortie standard. (cf [Read methods](http://mongodb.github.io/node-mongodb-native/3.1/reference/ecmascriptnext/crud/#read-methods))

    > Note: Sachant que nous n'avons pas encore ajouté de documents dans cette collection, la liste de documents doit être un tableau vide.

6. Modifier `dates.js` à nouveau pour ajouter un document `{ date: new Date() }` dans la collection `dates`, avant l'affichage des documents. (cf [Inserting documents](http://mongodb.github.io/node-mongodb-native/3.1/reference/ecmascriptnext/crud/#inserting-documents))

Une fois que vous aurez terminé cet exercice, merci d'aider vos camarades qui auraient des difficultés.

## Exercice 2 - Stockage de l'historique dans MongoDB

Le but est:
- de tenir un historique des messages envoyés au point d'accès `POST /chat` (cf dernier exercice de la partie précédente)
et de leurs réponses, dans une collection MongoDB,
- et de donner accès à cet historique via deux nouveaux points d'accès: `GET /messages/all` et `DELETE /messages/last`.

Exemples de conversation / cas d'usage:
1. `$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"ville\"}" "http://localhost:3000/chat"` répondra "Nous sommes à Paris" (comme dans le dernier exercice de la partie précédente)
2. `$ curl -X GET "http://localhost:3000/messages/all"` affichera l'historique des conversations (messages de l'utilisateur et réponses du chat-bot), tel que décrit ci-dessous, y compris après redémarrage du serveur
3. `$ curl -X DELETE "http://localhost:3000/messages/last"` supprimera le dernier échange de l'historique (message de l'utilisateur + réponse du chat-bot)

Pour cela, nous allons:
- nous connecter à la collection "`messages`" de la base de données "`chat-bot`", puis y lire et écrire des documents JSON possédant trois propriétés:
  - `_id` (type: `ObjectId`) contiendra un identifiant généré automatiquement par MongoDB pour chaque message,
  - `from` (type: `string`) contiendra le nom de l'émetteur du message, (ex: `bot` ou `user`)
  - `msg` (type: `string`) contiendra le contenu du message. (ex: `demain = Mercredi`)
- enregistrer chaque message de l'utilisateur et du chat-bot dans la collection "`messages`" de notre base de données MongoDB;
- ajouter les points d'accès (routes) `GET /messages/all` et `DELETE /messages/last`, permettant respectivement de retourner un tableau JavaScript contenant tous les messages dans l'ordre chronologique, et de supprimer le dernier échange (message de l'utilisateur + réponse du chat-bot) de l'historique.

### Description de l'affichage de l'historique des conversations

Voici ce que devrait retourner le serveur si on requête `GET /messages/all` après avoir suivi le cas d'usage ci-dessus:

```
[
  {
    from: 'user'
    msg: 'demain',
  },
  {
    from: 'bot'
    msg: 'Demain: Mercredi',
  }
]
```

### Objectifs

- Fonctionnel: Le serveur implémente bien le cas d'usage fourni et respecte le format d'affichage décrits ci-dessus.
- Lisibilité: 140 lignes de code max, utilisation de `async`/`await` pour tous les appels asynchrones.
- Structure: Le code source du projet ne doit pas contenir plus de 7 fichiers. (dont `server.js`, `package.json` et `README.md`)
- Accessibilité: Votre `README.md` doit décrire les 3 commandes (max.) nécessaires pour télécharger et faire fonctionner ce serveur depuis une autre machine.
- Production: À ce stade, vous n'aurez pas besoin de déployer ce serveur en production.

Cet exercice s'appuie à la fois sur le code écrit lors de la partie précédente, et sur le code écrit dans l'exercice 1 (ci-dessus).

### Étapes proposées

1. Modifier `server.js` pour qu'il se connecte à la base de données "`chat-bot`".
2. Implémenter et tester le point d'accès `GET /messages/all`. (il devrait retourner un tableau vide)
3. Faire en sorte que ce point d'accès retourne l'historique des conversations => Enregistrer les messages de l'utilisateur et les réponses du chat-bot dans la collection `messages`.
4. Implémenter le point d'accès `DELETE /messages/last`, et vérifier à l'aide d'une requête à `GET /messages/all` qu'il fonctionne bien comme prévu.

## Exercice 3 - API et base de données en production

Le but de cet exercice est de mettre le serveur API développé ci-dessus en production, afin qu'il soit accessible en permanence et à quiconque sur internet.

### Objectifs

- Fonctionnel: Même fonctionnalités que l'exercice précédent.
- Lisibilité: 80 lignes de code max, utilisation de `async`/`await` pour les appels asynchrones.
- Structure: Le code source du projet ne doit pas contenir plus de 7 fichiers. (dont `server.js`, `package.json` et `README.md`)
- Accessibilité: Votre `README.md` doit décrire les 3 commandes (max.) nécessaires pour télécharger et faire fonctionner ce serveur depuis une autre machine.
- Production: Le serveur et sa base de données sont accessible sur Internet.

ℹ️ Rendu: Il faudra fournir l'URL du dépôt dans lequel votre code est disponible, ainsi que l'URL à laquelle l'API est accessible sur internet.

### Étapes proposées

1. Enregistrer l'URL d'accès à votre base de données MongoDB dans une variable d'environnement de votre application sur Heroku: `MONGODB_URI`.
2. Modifier `server.js` pour qu'il parvienne à se connecter à cette base de données, que celui-ci s'exécute en production ou en local, grâce à cette variable d'environnement.
3. Documenter les points d'accès de votre API dans `README.md`, afin que d'autres utilisateurs comprennent rapidement comment l'utiliser, que ce soit en production ou localement.

### Bonus

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

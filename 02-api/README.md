# Séance 2 - Serveur API avec base de données MongoDB

<!--
Programme de la première partie:
- un(e) étudiant(e) vient présenter le travail effectué
- favoriser l'entraide => répartir les étudiants de manière à ce que je puisse accéder facilement aux étudiants les plus en difficulté. + faire en sorte qu'ils soient assis à côté de personnes qui ont réussi le TP de la dernière fois.

Programme de la deuxième partie: (retour de la pause)
- faire un point sur code synchrone VS callbacks VS promises VS async/await
- s'assurer que tout le monde a compris comment se connecter à MongoDB
-->

## Objectifs de cette séance

- Étendre le chat-bot pour retrouver l'historique des conversations
- Persistance de données dans une base de données MongoDB
- Comprendre les différentes manières de programmer des fonctions asynchrones en Node.js

Durée: 4h.

## Pré-requis

Pour effectuer ces exercices, assurez-vous que les pré-requis suivants sont bien installés et accessibles depuis votre terminal Bash (ou compatible):
- `node`; (tester avec `$ node --version`)
- `git`; (vérifier que `$ git config --global user.email` retourne bien votre adresse email `@eemi.com`)
- et `docker`. (si `$ docker --version` ne retourne pas un numéro de version, installer Docker Desktop (Community Edition) depuis [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)).

Nous verrons dans l'exercice ci-dessous comment installer et exécuter un serveur MongoDB à l'aide de Docker.

## Exercice 2.1 - Lecture et écriture dans MongoDB

Le but est de découvrir comment manipuler une base de données MongoDB depuis un programme Node.js, à l'aide du package [`mongodb`](https://www.npmjs.com/package/mongodb). (anciennement connu sous le nom de "MongoDB Native Driver for Node.js")

Pour cela, nous allons:
- créer une base de données MongoDB et une collection "`dates`";
- découvrir comment lire et écrire des données dans cette collection depuis un programme Node.js, à l'aide du package `mongodb`.

### Critères de validation

- Fonctionnel: Le code source doit se connecter à la base de données MongoDB accessible via l'URL `mongodb://localhost:27017/test`, ajouter un document `{ date: (new Date()).toString() }` dans la collection `dates`, puis afficher tous les documents actuellement stockés dans cette collection.
- Lisibilité: 40 lignes de code max, utilisation de `async`/`await` pour les appels asynchrones.
- Structure: Le code source du projet ne doit pas contenir plus de 5 fichiers. (dont `dates.js`, `package.json` et `README.md`)
- Production: À ce stade, vous n'aurez pas besoin de déployer quoi que ce soit en production.

### Étapes proposées

1. Installer et lancer un serveur de base de données MongoDB écoutant sur le port `27017`:
  - `$ docker pull mongo:4` pour télécharger l'image Docker de MongoDB 4;
  - `$ docker run --name eemi-nodejs-ex-2-1 mongo:4` pour executer le serveur MongoDB. (laissez ce terminal ouvert)
2. Dans une nouvelle session de terminal, tester que le serveur est accessible: `$ docker run -it --link eemi-nodejs-ex-2-1:mongo --rm mongo:4 mongo --host mongo test` pour démarrer le client "[`mongo` Shell](https://docs.mongodb.com/manual/mongo/)", puis vérifier que la commande `show dbs` affiche bien une liste de bases de données, puis pressez Ctrl-C pour quitter le client.
3. Installer le package `mongodb` avec npm, et vérifier qu'il a bien été ajouté au fichier `package.json` de votre projet.
4. Créer un programme `dates.js` qui se sert du package `mongodb` pour se connecter à la base de données `mongodb://localhost:27017/test`. (cf [Connecting](http://mongodb.github.io/node-mongodb-native/3.1/reference/ecmascriptnext/connecting/))
5. Après avoir vérifié que `$ node dates.js` s'exécute sans erreur, modifier `dates.js` pour qu'il affiche la liste des documents de la collection `dates` dans la sortie standard. (cf [Read methods](http://mongodb.github.io/node-mongodb-native/3.1/reference/ecmascriptnext/crud/#read-methods))
6. Modifier `dates.js` à nouveau pour ajouter un document `{ date: new Date() }` dans la collection `dates`, avant l'affichage des documents. (cf [Inserting documents](http://mongodb.github.io/node-mongodb-native/3.1/reference/ecmascriptnext/crud/#inserting-documents))
7. Sauvegarder votre projet dans un dépôt GitLab.

Une fois que vous aurez terminé cet exercice, merci d'aider vos camarades qui auraient des difficultés.

## Exercice 2.2 - Stockage de l'historique dans MongoDB

Le but est de compléter le code source du "Chat-bot avec mémoire" (cf exercice 1.3) afin de pouvoir consulter et modifier l'historique des messages et de leurs réponses.

Exemples de conversation / cas d'usage (même que celui de l'exercice 1.3):
1. `$ curl -X POST --data '{"msg":"demain"}' http://localhost:3000/chat` répondra "Demain: Mercredi" (y compris après redémarrage du serveur)
2. `$ curl -X GET http://localhost:3000/messages/all` affichera l'historique des conversations, tel que décrit ci-dessous (y compris après redémarrage du serveur)
3. `$ curl -X DELETE http://localhost:3000/messages/last` supprimera le dernier échange de l'historique (message de l'utilisateur + réponse du chat-bot)

Pour cela, nous allons:
- nous connecter à la collection "`messages`" de la base de données `mongodb://localhost:27017/chat-bot`, puis y lire et écrire des documents JSON possédant trois propriétés:
  - `_id` (type: `ObjectId`) contiendra un identifiant généré automatiquement par MongoDB pour chaque message,
  - `from` (type: `string`) contiendra le nom de l'émetteur du message, (ex: `bot` ou `user`)
  - `msg` (type: `string`) contiendra le contenu du message. (ex: `demain = Mercredi`)
- enregistrer chaque message de l'utilisateur et du chat-bot dans la collection "`messages`" de notre base de données MongoDB;
- ajouter les points d'accès `GET /messages/all` et `DELETE /messages/last`, permettant respectivement de retourner un tableau JavaScript contenant tous les messages dans l'ordre chronologique, et de supprimer le dernier échange (message de l'utilisateur + réponse du chat-bot) de l'historique.

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

### Critères de validation

- Fonctionnel: Le serveur implémente bien le cas d'usage fourni et respecte le format d'affichage décrits ci-dessus.
- Lisibilité: 80 lignes de code max, utilisation de `async`/`await` pour les appels asynchrones.
- Structure: Le code source du projet doit être disponible dans un dépôt git, et celui-ci ne doit pas contenir plus de 5 fichiers. (dont `server.js`, `package.json` et `README.md`)
- Accessibilité: Votre `README.md` doit décrire les 3 commandes (max.) nécessaires pour télécharger et faire fonctionner ce serveur depuis une autre machine.
- Production: À ce stade, vous n'aurez pas besoin de déployer ce serveur en production.

Cet exercice s'appuie à la fois sur le code écrit lors de la séance précédente, et sur le code écrit dans l'exercice 2.1 (ci-dessus).

Libre à vous d'enregistrer vos modifications dans un nouveau dépôt GitLab, ou de compléter le dépôt de la séance précédente (à condition que vous ayez bien créé un `tag` pour garder une trace de la version précédente de votre serveur).

### Étapes proposées

1. Modifier `server.js` pour qu'il se connecte à la base de données `mongodb://localhost:27017/chat-bot`.
2. Implémenter et tester le point d'accès `GET /messages/all`. (il devrait retourner un tableau vide)
3. Faire en sorte que ce point d'accès retourne l'historique des conversations => Enregistrer les messages de l'utilisateur et les réponses du chat-bot dans la collection `messages`.
4. Implémenter le point d'accès `DELETE /messages/last`, et vérifier à l'aide d'une requête à `GET /messages/all` qu'il fonctionne bien comme prévu.
5. Créer une nouvelle "release" (ou un `git tag`) pour garder une trace de cette version du serveur dans votre dépôt.

## Exercice 2.3 (à rendre) - API et base de données en production

Le but de cet exercice est de mettre le serveur API développé ci-dessus ainsi que sa base de données en production, afin qu'elle soit accessible en permanence et à quiconque sur internet.

### Critères de validation

- Fonctionnel: Même fonctionnalités que l'exercice précédent.
- Lisibilité: 80 lignes de code max, utilisation de `async`/`await` pour les appels asynchrones.
- Structure: Le code source du projet doit être disponible dans un dépôt git, et celui-ci ne doit pas contenir plus de 5 fichiers. (dont `server.js`, `package.json` et `README.md`)
- Accessibilité: Votre `README.md` doit décrire les 3 commandes (max.) nécessaires pour télécharger et faire fonctionner ce serveur depuis une autre machine.
- Production: Le serveur et sa base de données sont en production.

ℹ️ Rendu: Il faudra fournir l'URL du dépôt dans lequel votre code est disponible, ainsi que l'URL à laquelle l'API est accessible sur internet.

Libre à vous d'enregistrer vos modifications dans un nouveau dépôt GitLab, ou de compléter le dépôt de la séance précédente (à condition que vous ayez bien créé un `tag` pour garder une trace de la version précédente de votre serveur).

### Étapes proposées

1. Ajouter un add-on "MongoDB" (hébergé gratuitement dans le Cloud) à notre application sur Heroku.
2. Modifier `server.js` pour qu'il sache se connecter à cette base de données, à partir des variables d'environnement définies dans Heroku. (et qu'il puisse aussi fonctionner en local)
3. Documenter les points d'accès de votre API dans `README.md`, afin que d'autres utilisateurs comprennent rapidement comment l'utiliser, que ce soit en production ou localement.
4. Créer une nouvelle "release" (ou un `git tag`) nommé "`v1.0`" pour garder une trace du code que vous rendez.

### Bonus

- Utiliser OpenAPI pour documenter votre API => ajouter le modèle au format YAML dans votre dépôt.
- Utiliser l'ORM/ODM "Mongoose" pour manipuler la base de données, au lieu du package `mongodb`. => Expliquez l'impact de ce changement: avantages et inconvénients, en supposant que votre application soit destinée à se développer.
- Expliquez comment procéder si jamais la structure de votre base de données (aussi appelée "schema") est amenée à changée d'une version à l'autre de votre application. Comment éviter tout conflit de versions entre la structure des données en base de données et celle qui est reconnue par le programme, et tout bug ou crash que cela pourrait provoquer.

## Pour aller plus loin

- [The Best APIs are Built with Swagger Tools](https://swagger.io/)
- [Mongoose ODM v5.4.5](https://mongoosejs.com/)
- [mongodb - How to properly handle mongoose schema migrations? - Stack Overflow](https://stackoverflow.com/questions/18295357/how-to-properly-handle-mongoose-schema-migrations)

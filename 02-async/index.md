---
title: Partie 2 - Programmation asynchrone et usage d'autres APIs
layout: default
---

Dans la partie précédente, nous avons appris:
- à développer une API simple en Node.js, répondant à des requêtes HTTP GET et POST;
- à l'aide de la bibliothèque Express.js, installée à l'aide de `npm`;
- à faire fonctionner et tester l'API en local, puis en production.

Jusqu'à présent, nous n'avons appelé et défini que des fonctions _synchrones_. C'est à dire que Node.js exécute ces fonctions de manière séquentielle.

L'appel à une fonction synchrone bloque l'exécution du programme jusqu'à la fin du traitement qu'elle effectue. Nous allons voir que, dans le cas de traitements ayant une durée indeterminée, il est inacceptable qu'un serveur attende la fin de ces traitements, car cela l'empêcherait de répondre à d'autres requêtes pendant ce temps là. C'est pour éviter cela que nous allons apprendre à utiliser des fonctions _asynchrones_.

## Objectifs de cette partie

- Savoir **appeler** une fonction asynchrone à base de callback ou `Promise`
- Savoir **définir** une fonction asynchrone à base de callback ou `Promise`
- Intégrer des appels asynchrones aux routes de notre chat-bot

Prérequis: création de test de points d'entrée HTTP GET et POST avec Node.js et Express.js

Durée estimée: 4 heures.

---

## Exercice 1 - Envoi de requête à une API externe

Dans la partie précédente, nous avons développé un serveur d'API HTTP: un programme qui répond à des requêtes. Dans cet exercice, nous allons écrire un programme qui émet une requête vers l'API HTTP de quelqu'un d'autre. Nous allons donc développer un _client_ d'API, afin de découvrir le concept d'appel de fonction _asynchrone_.

L'API que notre programme va interroger est [geocode.xyz](https://geocode.xyz/api). Cette API permet de récupérer – à la demande – les coordonnées géographique n'importe quelle ville du monde.

> Exemple de requête: [geocode.xyz/new+york?json=1](https://geocode.xyz/new+york?json=1) (requête HTTP GET → vous pouvez obtenir la réponse en y accédant avec un client HTTP comme `curl` ou votre navigateur web)

👉 Exerciseur en ligne: [Envoi de requête à une API externe](https://tech.io/playgrounds/55085/premiers-pas-avec-node-js/une-api-simple-mais-polie)

---

## Exercice 2 - Chat-bot avec mémoire

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

Note: Le serveur doit pouvoir s'exécuter même si le fichier `réponses.json` n'existe pas.

### Étapes proposées

1. Faire en sorte que le point d'entrée `/chat` enregistre la clé (ex: "demain") et la valeur (ex: "Mercredi") fournies par l'utilisateur dans la fichier `réponses.json`, lorsque celui-ci fournit une nouvelle information. (étape 2 du cas d'usage)
2. Faire en sorte que, après avoir fourni une information, l'utilisateur puisse retrouver cette information en formulant une requête (cf étape 3 du cas d'usage), grâce au fichier `réponses.json`.
3. Faire en sorte que toutes les étapes du cas d'usage fonctionne, plusieurs fois d'affilée, y compris avec d'autres mots que "demain" et d'autres valeurs que "Mercredi". S'assurer que les nouvelles informations sont encore exploitables même après avoir redémarré le serveur.
4. Faites en sorte que le fichier `réponses.json` puisse retenir plus d'une information à la fois.

> Références Node.js et JavaScript: [readFileSync()](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options), [writeFileSync()](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options), [JSON.parse()](https://devdocs.io/javascript/global_objects/json/parse), [JSON.stringify()](https://devdocs.io/javascript/global_objects/json/stringify), [String.split()](https://devdocs.io/javascript/global_objects/string/split), [Manipulations de tableaux](http://adrienjoly.com/cours-javascript/tp05.html#recherche-d%C3%A9l%C3%A9ment-par-valeur).

---

## Exercice 3 - Utilisation d'appels asynchrones

L'utilisation de fonctions d'entrées-sorties synchrones (comme [readFileSync()](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options) et [writeFileSync()](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options), par exemple) est à proscrire dans les programmes Node.js, et particulièrement dans l'implémentation de serveurs.

En effet, ces opérations sont asynchrones par nature, car leur temps d'exécution est imprévisible. Or, exécuter ce genre d'opérations de manière synchrone revient à bloquer l'exécution du programme Node.js en attendant que celles-ci soient terminées.

Un serveur web doit être en permanence capable de recevoir des requêtes, et d'y répondre au plus vite. Afin de permettre cela, nous allons devoir effectuer nos opérations d'entrées-sorties de manière asynchrone, au lieu de synchrone.

Modifier le code source produit à l'exercice précédent de manière à utiliser les fonctions asynchrones `readFile()` et `writeFile()` au lieu de `readFileSync()` et `writeFileSync()`.

Gérer les cas d'erreurs suivants:

- en cas d'erreur de lecture: afficher l'erreur dans la sortie d'erreurs (à l'aide de `console.error()`) puis terminer l'exécution du programme en retournant le code d'erreur `1` (à l'aide de `process.exit(1)`);
- en cas d'erreur d'écriture: afficher l'erreur dans la sortie d'erreurs et envoyer la réponse suivante à la requête: "`Oops, je n'ai pas pu enregistrer cette information. Merci de rééssayer.`"

---

## Exercice 4 - Utilisation de Promesses

Le concept de Promesse (en anglais: `Promise`; cf [javascript.info](https://javascript.info/promise-basics) et [Référence MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)) a été intégré au langage JavaScript afin de simplifier le séquençage d'appels asynchrones, et améliorer leur lisibilité en évitant le "callback hell".

Modifier le code source produit à l'exercice précédent de manière à ce que tous les appels de fonctions asynchrones utilisent des Promesses au lieu de fonctions de `callback`.

N'oubliez pas de couvrir les cas d'erreurs tel que décrit dans l'exercice 6.

---

## Exercice 5 - Utilisation de `async` et `await`

Les mots clés `async` et `await` (voir les ressources fournies plus bas) ont été intégrés au langage JavaScript pour simplifier rendre encore plus lisible la définition et l'usage de fonctions asynchrones à base de Promesses.

Modifier à nouveau le code source produit à l'exercice précédent de manière à ce que tous les appels de fonctions asynchrones utilisent les mots clés `async` et `await` au lieu de `Promise`, `resolve`, `reject`, `.then()` et `.catch()`.

N'oubliez pas de couvrir les cas d'erreurs tel que décrit dans l'exercice 6.

## BONUS

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

### Ressources sur l'exécution de code asynchrone

- [Apprendre les mécanismes de base de l'asynchrone en JavaScript, un tutoriel de Yahiko](https://javascript.developpez.com/actu/102019/Apprendre-les-mecanismes-de-base-de-l-asynchrone-en-JavaScript-un-tutoriel-de-Yahiko/)
- [Callbacks - The Art of Node](https://github.com/maxogden/art-of-node#callbacks)
- [Promises in 15 minutes - DEV Community](https://dev.to/marianesantana/promises-in-15-minutes-9l7)
- [JavaScript Visualized: Promises & Async/Await - DEV Community](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)
- Aide-mémoire: [Fonctions synchrones VS asynchrones](../sync-vs-async)

### Manières d'effectuer une requête HTTP depuis Node.js

Il existe plusieurs manières d'effectuer des requêtes HTTP depuis Node.js.

Notamment:

- les fonctions fournies par Node.js dans les moduldes `http` et `https`, ex: [`https.get()`](https://nodejs.org/api/https.html#https_https_get_options_callback)
- le package npm le plus utilisé: [request](https://www.npmjs.com/package/request)
- un package inspiré par l'API Fetch du W3C: [node-fetch](https://www.npmjs.com/package/node-fetch)
- la solution isomorphique: [Axios](https://www.npmjs.com/package/axios)
- un petit nouveau: [httpie](https://github.com/lukeed/httpie)
- autres: [HTTP GET Request in Node.js - Stack Overflow](https://stackoverflow.com/questions/9577611/http-get-request-in-node-js-express)

Quelle solution préférez-vous ? Pourquoi ?

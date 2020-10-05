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
- Application: envoyer une requête vers une autre API, puis traiter sa réponse

Prérequis:
- définition et appel de fonctions synchrones en JavaScript
- écriture et exécution de programmes JavaScript avec Node.js
- compréhension basique du fonctionnement des requêtes HTTP

Durée estimée: 4 heures.

---

## Exercice 1 - Envoi de requête à une API externe

Dans la partie précédente, nous avons développé un serveur d'API HTTP: un programme qui répond à des requêtes. Dans cet exercice, nous allons écrire un programme qui émet une requête vers l'API HTTP de quelqu'un d'autre. Nous allons donc développer un _client_ d'API, afin de découvrir le concept d'appel de fonction _asynchrone_.

L'API que notre programme va interroger est [geocode.xyz](https://geocode.xyz/api). Cette API permet de récupérer – à la demande – les coordonnées géographique n'importe quelle ville du monde.

> Exemple de requête: [geocode.xyz/new+york?json=1](https://geocode.xyz/new+york?json=1) (requête HTTP GET → vous pouvez obtenir la réponse en y accédant avec un client HTTP comme `curl` ou votre navigateur web)

👉 Exerciseur en ligne: [Envoi de requête à une API externe](https://tech.io/playgrounds/55085/premiers-pas-avec-node-js/une-api-simple-mais-polie)

---

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

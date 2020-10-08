---
title: Partie 3 - Utilisation du système de fichiers
layout: default
---

## Objectifs de cette partie

- Savoir lire et modifier des fichiers avec Node.js.
- Savoir **définir** des fonctions asynchrones.
- Application: améliorer notre chat-bot de la partie 1.

Prérequis: création et test de points d'entrée HTTP GET et POST avec Node.js et Express.js.

Durée estimée: 4 heures.

---

## Exercice 1 - Chat-bot avec mémoire

Dans la partie 1, nous avons créé un serveur web dont l'API contient les points d'entrée (*endpoints*) suivants:
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

> Exigences:
> - Le code ne doit pas faire plus de 50 lignes.
> - Le serveur doit pouvoir s'exécuter même si le fichier `réponses.json` n'existe pas.

### Étapes proposées

1. Faire en sorte que le point d'entrée `/chat` enregistre la clé (ex: "demain") et la valeur (ex: "Mercredi") fournies par l'utilisateur dans la fichier `réponses.json`, lorsque celui-ci fournit une nouvelle information. (étape 2 du cas d'usage)
2. Faire en sorte que, après avoir fourni une information, l'utilisateur puisse retrouver cette information en formulant une requête (cf étape 3 du cas d'usage), grâce au fichier `réponses.json`.
3. Faire en sorte que toutes les étapes du cas d'usage fonctionne, plusieurs fois d'affilée, y compris avec d'autres mots que "demain" et d'autres valeurs que "Mercredi". S'assurer que les nouvelles informations sont encore exploitables même après avoir redémarré le serveur.
4. Faites en sorte que le fichier `réponses.json` puisse retenir plus d'une information à la fois.

> Références Node.js et JavaScript: [readFileSync()](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options), [writeFileSync()](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options), [JSON.parse()](https://devdocs.io/javascript/global_objects/json/parse), [JSON.stringify()](https://devdocs.io/javascript/global_objects/json/stringify), [String.split()](https://devdocs.io/javascript/global_objects/string/split), [Manipulations de tableaux](http://adrienjoly.com/cours-javascript/tp05.html#recherche-d%C3%A9l%C3%A9ment-par-valeur).

---

## Exercice 2 - Utilisation d'appels asynchrones

L'utilisation de fonctions d'entrées-sorties synchrones (comme [readFileSync()](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options) et [writeFileSync()](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options), par exemple) est à proscrire dans les programmes Node.js, et particulièrement dans l'implémentation de serveurs.

En effet, ces opérations sont asynchrones par nature, car leur temps d'exécution est imprévisible. Or, exécuter ce genre d'opérations de manière synchrone revient à bloquer l'exécution du programme Node.js en attendant que celles-ci soient terminées.

Un serveur web doit être en permanence capable de recevoir des requêtes, et d'y répondre au plus vite. Afin de permettre cela, nous allons devoir effectuer nos opérations d'entrées-sorties de manière asynchrone, au lieu de synchrone.

Modifier le code source produit à l'exercice précédent de manière à utiliser les fonctions asynchrones `readFile()` et `writeFile()` au lieu de `readFileSync()` et `writeFileSync()`.

Gérer les cas d'erreurs suivants:

- en cas d'erreur de lecture: afficher l'erreur dans la sortie d'erreurs (à l'aide de `console.error()`) puis terminer l'exécution du programme en retournant le code d'erreur `1` (à l'aide de `process.exit(1)`);
- en cas d'erreur d'écriture: afficher l'erreur dans la sortie d'erreurs et envoyer la réponse suivante à la requête: "`Oops, je n'ai pas pu enregistrer cette information. Merci de réessayer.`"

---

## Exercice 3 - Création d'une fonction intermédiaire avec callback

Modifiez votre solution de l'exercice précédent de manière à ce que la fonction `writeFile()` ne soit pas appelée _directement_ depuis le code de vos routes Express.

Pour cela, définissez la fonction `enregistrerRéponses()` qui appellera `writeFile()`, puis appelez cette fonction à la place de `writeFile()` dans le code de vos routes Express.

Après cette modification, votre chatbot doit continuer de fonctionner comme d'habitude.

---

## Exercice 4 - Utilisation de Promesses

Le concept de Promesse (en anglais: `Promise`; cf [javascript.info](https://javascript.info/promise-basics) et [Référence MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)) a été intégré au langage JavaScript afin de simplifier le séquençage d'appels asynchrones, et améliorer leur lisibilité en évitant le "callback hell".

Modifier le code source produit à l'exercice précédent de manière à ce que tous les appels de fonctions asynchrones utilisent des Promesses au lieu de fonctions de `callback`. Comme dans l'exercice précédent, l'enregistrement des réponses doit être effectué par la fonction `enregistrerRéponses()`.

N'oubliez pas de couvrir les cas d'erreurs tel que décrit dans les exercices précédents.

Conseil: Commencez par transformer seulement l'appel à `readFile()` dans un premier temps, puis celui à `enregistrerRéponses()` dans un deuxième temps.

---

## Exercice 5 - Utilisation de `async` et `await`

Les mots clés `async` et `await` (voir les ressources fournies plus bas) ont été intégrés au langage JavaScript pour simplifier rendre encore plus lisible la définition et l'usage de fonctions asynchrones à base de Promesses.

Modifier à nouveau le code source produit à l'exercice précédent de manière à ce que tous les appels de fonctions asynchrones utilisent les mots clés `async` et `await` au lieu de `Promise`, `resolve`, `reject`, `.then()` et `.catch()`.

Comme dans l'exercice précédent, l'enregistrement des réponses doit être effectué par la fonction `enregistrerRéponses()`.

N'oubliez pas de couvrir les cas d'erreurs tel que décrit dans les exercices précédents.

Conseil: Commencez par transformer seulement l'appel à `readFile()` dans un premier temps, puis celui à `enregistrerRéponses()` dans un deuxième temps.

---

## Exercices bonus

- Archivage des conversations dans plusieurs fichiers (un par interlocuteur)

---

## Références

- cf [Aide-mémoire](../sync-vs-async) et autres [ressources sur l'exécution de code asynchrone](../02-async/#ressources-sur-lexcution-de-code-asynchrone) fournies dans la partie 2.

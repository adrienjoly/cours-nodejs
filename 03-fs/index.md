---
title: Partie 3 - Utilisation du système de fichiers
layout: default
---

## Objectifs de cette partie

- Savoir lire et modifier des fichiers avec Node.js.
- Savoir **définir** des fonctions asynchrones.
- Application: améliorer notre chat-bot de la partie 1.

Prérequis:
- savoir appeler des fonctions asynchrones à l'aide de _callback_, `Promise` et `async` + `await`.
- savoir créer et tester des routes d'API HTTP GET et POST avec Node.js et Express.js.

Durée estimée: 4 heures.

---

## Introduction

L'utilisation de fonctions d'entrées-sorties synchrones (comme [readFileSync()](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options) et [writeFileSync()](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options), par exemple) est à proscrire dans les programmes Node.js, et particulièrement dans l'implémentation de serveurs. (comme notre chat-bot)

En effet, ces opérations sont asynchrones par nature, car leur temps d'exécution est imprévisible. Or, exécuter ce genre d'opérations de manière synchrone revient à bloquer l'exécution du programme Node.js en attendant que celles-ci soient terminées.

Un serveur web doit être en permanence capable de recevoir des requêtes, et d'y répondre au plus vite. Afin de permettre cela, nous allons devoir effectuer nos opérations d'entrées-sorties de manière asynchrone, au lieu de synchrone.

Pour nous familiariser avec les fonctions de lecture et d'écriture de fichiers fournies par Node.js, nous allons commencer par utiliser leur version synchrone. Dans les exercices suivants, nous transformerons progressivement ce code synchrone en code asynchrone, afin de pouvoir les intégrer à notre chat-bot.

---

## Exercice 1 - Lecture et écriture synchrone

Écrivez un programme Node.js nommé `minuscules.js` qui:

- récupère dans une variable le contenu d'un fichier dont le chemin d'accès est fourni par la variable d'environnement `process.env.FILE`;
- remplace toutes les lettres majuscules de ce contenu par des minuscules, en modifiant cette variable;
- affiche le contenu de cette variable, après l'avoir modifiée;
- puis écrit ce contenu modifié dans le fichier `résultat.txt`.

Gérer les cas d'erreurs suivants:

- en cas d'erreur de lecture de fichier: afficher le message d'erreur dans la sortie d'erreurs (à l'aide de `console.error()`) puis terminer l'exécution du programme en retournant le code d'erreur `1` (à l'aide de `process.exit(1)`);
- en cas d'erreur d'écriture de fichier: afficher le message d'erreur dans la sortie d'erreurs puis terminer l'exécution du programme en retournant le code d'erreur `1` (à l'aide de `process.exit(1)`);

Fonctions Node.js et JavaScript à utiliser:

- [`fs.readFileSync()`](https://devdocs.io/node/fs#fs_fs_readfilesync_path_options),
- [`fs.writeFileSync()`](https://devdocs.io/node/fs#fs_fs_writefilesync_file_data_options),
- [`<string>.toLowerCase()`](https://devdocs.io/javascript/global_objects/string/tolowercase)

---

## Exercice 2 - Utilisation d'appels asynchrones

Dupliquer puis modifier le programme `minuscules.js` de l'exercice précédent, en utilisant cette fois les fonctions asynchrones `readFile()` et `writeFile()` au lieu de `readFileSync()` et `writeFileSync()`.

Fonctions Node.js et JavaScript à utiliser:

- [`fs.readFile()`](https://devdocs.io/node/fs#fs_fs_readfile_path_options_callback)
- [`fs.writeFile()`](https://devdocs.io/node/fs#fs_fs_writefile_file_data_options_callback)

---

## Exercice 3 - Création d'une fonction intermédiaire avec _callback_

Dupliquer puis modifier le programme `minuscules.js` de l'exercice précédent, en encapsulant la lecture du fichier dans une fonction `lireFichier()` qui acceptera deux paramètres: le nom de fichier à lire et une fonction _callback_.

Faites en sorte que:
- la fonction `readFile()` ne soit appelée **que** par votre fonction `lireFichier()`;
- votre fonction `lireFichier()` appelle la fonction `callback` qui lui aura été passée en paramètre, dès que la lecture sera terminée;
- si la lecture a échoué, appeler `callback(err)`, où le paramètre `err` représente l'erreur en question;
- sinon, appeler `callback(null, contenu)`, où le paramètre `contenu` représente le texte qui a été lu dans le fichier.

Après ces modifications, le programme doit fonctionner de manière identique à celui de l'exercice précédent.

---

## Exercice 4 - Utilisation de Promesses

Dupliquer puis modifier le programme `minuscules.js` de l'exercice précédent, en utilisant des _Promesses_ au lieu des _callback_ dans tous les appels et définitions de fonctions asynchrones. Comme dans l'exercice précédent, la lecture du fichier doit être assurée par une fonction `lireFichier()` que vous devrez définir.

Après ces modifications, le programme doit fonctionner de manière identique à celui de l'exercice précédent.

Conseil: Commencez par transformer seulement l'appel à `writeFile()` dans un premier temps, puis celui à `lireFichier()` dans un deuxième temps.

Références Node.js et JavaScript utiles:

- [`fs.promises.readFile()`](https://devdocs.io/node/fs#fs_fspromises_readfile_path_options)
- [`fs.promises.writeFile()`](https://devdocs.io/node/fs#fs_fspromises_writefile_file_data_options)
- [Aide-mémoire sur différents types de fonctions asynchrones](../sync-vs-async) et [autres ressources](../02-async/#ressources-sur-lexcution-de-code-asynchrone) fournies dans la partie 2.

---

## Exercice 5 - Utilisation de `async` et `await`

Dupliquer puis modifier le programme `minuscules.js` de l'exercice précédent, en utilisant des `async` et `await` au lieu des _Promesses_ dans tous les appels et définitions de fonctions asynchrones. Comme dans l'exercice précédent, la lecture du fichier doit être assurée par une fonction `lireFichier()` que vous devrez définir.

Après ces modifications:
- votre programme ne doit donc plus employer `Promise`, `resolve`, `reject`, `.then()`, `.catch()` ni de _callback_;
- et il doit fonctionner de manière identique à celui de l'exercice précédent.

Conseil: Commencez par transformer seulement l'appel à `writeFile()` dans un premier temps, puis celui à `lireFichier()` dans un deuxième temps.

---

## Exercice 6 - Chat-bot avec mémoire

Dans [la partie 1 du cours](../01-chatbot), nous avons créé un serveur web dont l'API contient les points d'entrée (*endpoints*) suivants:
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
> - Utiliser les mots clés `async` et `await` pour définir et appeler toute fonction asynchrone. (au lieu de `Promise`, `resolve`, `reject`, `.then()` et `.catch()`)
> - Couvrir les cas d'erreurs tel que décrit dans les exercices précédents.
> - En cas d'erreur lors de l'écriture du fichier, envoyer la réponse suivante à la requête: "`Oops, je n'ai pas pu enregistrer cette information. Merci de réessayer.`"

### Étapes proposées

1. Faire en sorte que le point d'entrée `/chat` enregistre la clé (ex: "demain") et la valeur (ex: "Mercredi") fournies par l'utilisateur dans la fichier `réponses.json`, lorsque celui-ci fournit une nouvelle information. (étape 2 du cas d'usage)
2. Faire en sorte que, après avoir fourni une information, l'utilisateur puisse retrouver cette information en formulant une requête (cf étape 3 du cas d'usage), grâce au fichier `réponses.json`.
3. Faire en sorte que toutes les étapes du cas d'usage fonctionne, plusieurs fois d'affilée, y compris avec d'autres mots que "demain" et d'autres valeurs que "Mercredi". S'assurer que les nouvelles informations sont encore exploitables même après avoir redémarré le serveur.
4. Faites en sorte que le fichier `réponses.json` puisse retenir plus d'une information à la fois.

### Références Node.js et JavaScript

- [`JSON.parse()`](https://devdocs.io/javascript/global_objects/json/parse),
- [`JSON.stringify()`](https://devdocs.io/javascript/global_objects/json/stringify),
- [`String.split()`](https://devdocs.io/javascript/global_objects/string/split),
- [Manipulations de tableaux](https://adrienjoly.com/cours-javascript/tp05.html#recherche-d%C3%A9l%C3%A9ment-par-valeur).

---

## Exercices bonus

- Archivage des conversations dans plusieurs fichiers (un par interlocuteur)

---

## Références

- cf [Aide-mémoire](../sync-vs-async) et autres [ressources sur l'exécution de code asynchrone](../02-async/#ressources-sur-lexcution-de-code-asynchrone) fournies dans la partie 2.

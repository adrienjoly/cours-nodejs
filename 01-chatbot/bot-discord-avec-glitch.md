---
title: Partie 1 - Chat-bot Discord avec Glitch
layout: default
---

Dans cette activité, nous allons:
1. Dupliquer et tester un chat-bot existant sur un serveur Discord
2. Puis ajouter des fonctionnalités à ce chat-bot

---

## 1. Activation du chat-bot existant

Dans cette première partie, nous allons:
1. rejoindre le [serveur Discord de la classe](https://discord.com/channels/778551029356429312/778551029356429315);
2. dupliquer puis configurer un [chat-bot publié sur glitch.com](https://glitch.com/~discord-bot-example); (basé sur le module npm [Eris](https://abal.moe/Eris/))
3. dialoguer avec ce chat-bot depuis Discord, pour vérifier qu'il fonctionne.

Dans cette version initiale, le but est que votre chat-bot réponde "damn it !" à chaque fois que quelqu'un écrit "1337" dans le canal _#général_ du serveur Discord de la classe.

<!--
<details>
  <summary>Besoin d'un indice ?</summary>  

  Depuis la page Glitch liée ci-dessus, cliquez sur "View Source" puis suivez les instructions fournies dans le fichier `README.md`.
</details>
-->

---

## 2. Personnaliser le chat-bot

Maintenant, vous allez modifier le code de votre chat-bot de manière à ce qu'il réponde "C'est mon maître !" à chaque fois que quelqu'un tapera votre prénom dans le canal _#général_ du serveur Discord de la classe.

<!--
<details>
  <summary>Besoin d'un indice ?</summary>

  Il suffit de modifier 2 lignes de code du fichier `server.js`, toujours depuis votre projet Glitch.
</details>
-->

---

## 3. Faire afficher un gif animé au chat-bot

Maintenant, faites en sorte que chaque réponse de votre chat-bot soit illustrée par un GIF animé visible directement par tou·te·s les participant·e·s du canal _#général_.

<!--
<details>
  <summary>Besoin d'un indice ?</summary>

  Comme on peut le voir dans [cet exemple trouvé sur le site de Eris](https://github.com/abalabahaha/eris/blob/master/examples/embed.js), vous allez devoir passer le paramètre `embed` lors de l'appel à la fonction `createMessage()`.

  Consultez les ressources suivantes:
  - Documentation de la [fonction `createMessage()`](https://abal.moe/Eris/docs/Client#function-createMessage) de Eris
  - Documentation de l'[API d'intégration de contenus](https://discord.com/developers/docs/resources/channel#embed-object) de Discord
</details>
-->

---

## 4. Réveiller les autres bots en un clic

Maintenant, faites en sorte que, quand vous tapez votre prénom, le bot vous suggère le prénom de 3 de vos camarades ayant un chat-bot dans le même canal. Et qu'il vous suffise de cliquer sur un des 3 boutons pour que le bot écrive le nom de ce camarade dans le canal.

<!--
<details>
  <summary>Besoin d'un indice ?</summary>
  
  Inspirez-vous du code de [cet exemple trouvé sur le site de Eris](https://github.com/abalabahaha/eris/blob/master/examples/reactionButtons.js).

  Et référez-vous à la documentation de Eris.
</details>
-->

# Idées évolution du cou

## Objectifs

- Aider les étudiants à développer leur capacité à analyser et résoudre leurs problèmes en autonomie
- Aider les étudiants à gagner en clarté sur l'objectif de chaque étape, et leur compréhension de chaque concept découvert en effectuant les exercices
- Aider les étudiants à gagner en rigueur quant à atteindre les attentes de chaque exercice

## Pistes

- [x] Ne plus utiliser git, afin de réduire la charge mentale des étudiants pendant leur apprentissage de Node.js
- [x] Employer TDD pour rendre très clair l'objectif et les attentes de chaque étape
- [x] Donner un feedback clair sur les solutions proposées, afin que l'étudiant puisse prendre du recul ce qu'il a fait et trouver une autre piste
- [x] Fournir une trace structurée de la réponse donnée à chaque étape de chaque exercice, pour que l'étudiant puisse les retrouver et réviser efficacement.
- [ ] Fournir les instructions pour exécuter le robot de correction en local sur les exercices restants
- [ ] Améliorer la qualité des messages d'erreurs et des suggestions par l'usage de TypeScript et de ESLint
- [ ] Forcer l'usage de VSCode, pour assurer une bonne DX à tous les étudiants, ex: coloration syntaxique, formattage automatique, affichage des erreurs et auto-complétion.

## Solutions testées

### [workshopper/learnyounode](https://github.com/workshopper/learnyounode)

- ✅ le CLI avec un fichier JS a écrire par exercice
- ✅ la commande `verify` qui compare les résultats effectifs du code de l'étudiant aux résultats attendus.
- ✅ il est possible de l'utiliser en Français
- ❌ instructions un peu verbeuses, dès le deuxième exercice
- ❌ fournir les inputs des tests, pour que l'étudiant puisse mieux comprendre comment son code est exploité

### [Exercism](https://exercism.io/my/tracks/typescript)

- ✅ Il existe une [intégration (non officielle) dans VSCode](https://marketplace.visualstudio.com/items?itemName=masonliu.exercism)
- ✅ la progression sur chaque concept acquis est affiché sur le profil
- ✅ Jest met en évidence la lettre incorrecte dans le retour de la fonction de l'étudiant => très bien pour habituer à respecter à la lettre les chaines de caractères de l'énoncé
- ❌ disponible en anglais seulement
- ❌ installation bien guidée mais pénible: homebrew ou téléchargement depuis github.com, puis initialisation avec un token, puis usage de `yarn` (installation non guidée)
- ❌ execution des tests (par `jest`) lente, à cause du linter
- ❌ l'explication de comment les tests passent rend l'énoncé verbeux: https://exercism.io/my/solutions/e98a2dcb62ac40b29f261e9a171f3406
- 💡 possible de proposer des exercices différents dans leur système open-source, cf:
  - [Porting an Exercise to Another Language Track](https://github.com/exercism/docs/blob/master/you-can-help/implement-an-exercise-from-specification.md) / [How to bootstrap a new track](https://github.com/exercism/request-new-language-track/blob/master/README.md#how-to-bootstrap-a-new-track)
  - Generic test definition format (inputs+expects): [Exercise canonical data](https://github.com/exercism/docs/blob/master/you-can-help/improve-exercise-metadata.md#extracting-canonical-test-data) + [example](https://github.com/exercism/problem-specifications/blob/master/exercises/acronym/canonical-data.json)
  - Exemple: [Exercism exercises in TypeScript](https://github.com/exercism/typescript) + [Exercism's automated analyzer for the TypeScript track](https://github.com/exercism/typescript-analyzer)

### [Basic Node and Express | freeCodeCamp.org](https://www.freecodecamp.org/learn/apis-and-microservices/basic-node-and-express/)

- ✅ lien vers template repl.it pour tester son code en ligne: https://repl.it/github/freeCodeCamp/boilerplate-express
- ❌ disponible en anglais seulement
- ✅ execution de tests avec retour simple, en collant l'URL repl.it de l'étudiant sur la page de l'exercice
- ❌ pas si évident, en fait: il fallait fournir l'URL sur lequel repl.it faisait tourner le serveur de l'étudiant, et non l'URL du repl.it lui meme !
- ❌ on se retrouve trop vite dans les méandres d'express, même pour écrire hello world dans la console
- 💡 chaque exercice (et leur test) est défini en markdown: https://github.com/freeCodeCamp/freeCodeCamp/blob/6b3c61c73757d6ffe2ea332cbc44dad7948d1175/curriculum/challenges/english/05-apis-and-microservices/basic-node-and-express/meet-the-node-console.english.md
- ❌ le principe de fournir chaque test sous forme d'un appel API vers le serveur de l'étudiant ne permet pas d'évaluer le code si le-dit serveur ne fonctionne pas. => feedback incomplet => décourageant pour l'étudiant.

### Notion (par collègues EEMI)

- ✅ permet aux étudiants de garder une trace de leurs notes / code
- ✅ permet aux étudiants de travailler à plusieurs sur un même document partagé
- ✅ pratique pour que je donne du feedback moi-même sur le travail des étudiants
- ❌ pas d'automatisation possible

### Codingame

Exemple: [What is asynchronous in JavaScript - JavaScript promises, mastering the asynchronous](https://www.codingame.com/playgrounds/347/javascript-promises-mastering-the-asynchronous/what-is-asynchronous-in-javascript)

- ✅ ludique est facile à comprendre pour pratiquer les bases de la programmation
- ❌ semble peu adapté pour du code asynchrone et le développement de serveurs web
- 💡 il est possible d'écrire ses propres exercices à base de tests: [In/Out Puzzles - Contribute - Help](https://www.codingame.com/playgrounds/40701/contribute---help/writing-the-statement#puzzle-statement)

### Tech.io (by CodinGame)

Doc & exemples:

- [Create a playground - Tech.io Documentation](https://tech.io/playgrounds/408/tech-io-documentation/create-a-playground)
- Exemple perso: [Découverte de Node.js](https://tech.io/my-playgrounds/55085) + [code source](https://github.com/adrienjoly/playground-r8m63hre)

Notes:

- ✅ execution rapide de tests dans le cloud, avec retour précis + suggestions
- ✅ chaque exercice est écrit en Markdown, et spécifie la commande d'exécution des tests, via docker, cf:
  - https://tech.io/playgrounds/408/tech-io-documentation/create-a-playground
  - https://tech.io/playgrounds/408/tech-io-documentation/coding-exercise
  - https://tech.io/playgrounds/408/tech-io-documentation/runner-reference
  - ex: https://github.com/TechDotIO/advanced-nodejs-template/tree/master/nodejs-project
- ✅ le test runner node.js est open source: https://github.com/TechDotIO/node-npm-runner. on peut créer son propre runner.
- ✅ on peut étendre package.json pour inclure des dépendences supplémentaires
- ❌ l'interface web de tech.io n'est pas open source => je ne peux pas la déployer sur ma propre infra
- ❌ l'éditeur de code est minimaliste: pas de formatage, autocomplétion ni linter intégré. (en tout cas avant que l'étudiant n'exécute les tests)
- ❌ l'embed n'est pas intégrable dans github pages => les étudiants devront aller et venir entre les deux pages.

### Repl.it / CodeSandbox / Glitch + mes propres templates TDD ?

Comme le fait freeCodeCamp: https://repl.it/github/freeCodeCamp/boilerplate-express

TODO: à tester pour partie sur les tests automatisés ? ou pour saisir le code pendant les interros, avec formattage ?

### GitHub Classroom + GitHub Actions

TODO: cf [GitHub Classroom Getting Started Guide - YouTube](https://www.youtube.com/playlist?list=PLIRjfNq867bewk3ZGV6Z7a16YDNRCpK3u)

### [Node TDD for VSCode](https://marketplace.visualstudio.com/items?itemName=prashaantt.node-tdd)

TODO

### [Node Koans](https://github.com/rfines/NodeKoans)

TODO

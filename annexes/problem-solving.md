---
title: Annexes - Résolution de problèmes
layout: default
---

## Introduction

Le métier de développeur consiste certes à écrire du code, mais cette activité est loin d'être celle à laquelle les développeurs passent le plus gros de leur temps.

En développant des logiciels, nous nous retrouvons fréquemment confrontés à des problèmes, par exemple:

- problème de syntaxe: une erreur d'interprétation de mon code source l'empêche de s'exécuter;
- problème de logique: le code rédigé ne se comporte pas comme prévu;
- problème d'environnement: le code fonctionne comme prévu sur ma machine, mais pas sur celle de mon collègue;
- entre autres...

Au final, la résolution de problèmes est probablement l'activité qui nous prends le plus de temps et d'énergie, comme en témoigne le nombre sans cesse croissant de questions posées par des développeurs sur le site d'entraide technique StackOverflow. (~8400 questions posées par jour, selon [cette page](https://stackexchange.com/sites?view=list#traffic))

En tant que futur professionel du développement logiciel, il est crutial d'adopter une méthode de résolution de problèmes et de la pratiquer régulièrement, afin de gagner en autonomie et en efficacité dans cette démarche.

## Objectif

L'objet de cette page d'annexes est de proposer une telle méthode.

En suivant régulièrement cette méthode lorsque vous êtes confronté à un problème technique (que ce soit en JavaScript/Node.js ou pas), vous devriez:

- gagner en assurance;
- gagner en maîtrise sur le code et les technologies que vous manipulez;
- obtenir une aide plus rapide et plus qualitative, si vous présentez votre problèmes à d'autres personnes;
- et, globalement, devenir un développeur plus compétent et épanoui ! 😌

## Qu'est-ce qu'un problème ?

Définition de wikipedia:

> Un problème [...] est une situation dans laquelle **un obstacle empêche de progresser**, d'avancer ou de réaliser ce que l'on voulait faire.
> Un problème naît lorsqu'il y a une **différence entre l'état des choses et celui souhaité**, ou lorsqu'il y a anormalité.

La deuxième partie de cette définition est cruciale pour reconnaitre un problème. C'est aussi la clé de la méthodologie que nous allons voir ci-dessous: prendre le temps de comparer le **comportement effectif** de l'exécution d'un programme au **comportement attendu**.

Cela sous-entend que, pour trouver une solution à un problème, réagir en se basant seulement sur la constatation de ce comportement effectif est contreproductif.

Nous allons voir que, pour trouver une solution à un problème, il faut commencer par formuler ce problème. Cette formulation consiste à comparer le **comportement effectif** à **comportement attendu**. Et donc, au dela d'observer le comportement effectif de l'exécution de ce programme, il est tout aussi essentiel de **déterminer** quel était le comportement qui en était attendu, si nous n'étions pas confronté à un problème.

## Erreurs courantes

Voici quelques exemples de tentatives ratées (ou contre-productives) de résolution de problèmes que j'ai constatées:

- "Monsieur, ça marche pas" => L'étudiant n'a pas formulé le problème de manière suffisante => L'intervenant va être contraint de l'aider à dérouller la méthode de résolution de problèmes depuis le début.
- "J'ai une erreur ENOTFOUND" => Le problème est formulé en fournissant le code d'erreur. En revanche, cette formulation manque de précisions: quelle est l'instruction qui a causé cette erreur ? Quel est le nom du fichier en question ? Ce fichier existe-t'il ? => En se posant ces questions, l'étudiant aurait probablement pu trouver une solution de manière autonome.
- Un étudiant partage un copier-coller de 50 lignes de logs + un code source de 80 lignes, priant ses camarades de l'aide à faire fonctionner son programme. => Il est probablement que
- Un étudiant partage un copier-coller de 50 lignes de logs + un code source de 80 lignes, priant ses camarades de l'aide à faire fonctionner son programme. => Il y a peu de chance qu'il obtienne rapidement de l'aide sur la résolution de ce problème, car le-dit problème n'a pas été formulé de manière concise. Et, pour identifier la source du problème, la personne qui lui viendrait en aide devrait prendre le temps de lire et interpréter ces 130 lignes afin d'isoler l'origine probable du problème.
- Enfin, le fait que la [méthode du canard en plastique](https://fr.wikipedia.org/wiki/M%C3%A9thode_du_canard_en_plastique) ait été testée et approuvée par nombreux développeurs prouve que l'effort de formulation suffit parfois pour régler soi-même son problème. D'où l'importance de cette étape.

## Méthode proposée

Afin de résoudre un problème de manière efficace, que ce soit en autonomie, ou comptant sur l'aide d'autres développeurs, je recommande de suivre les étapes suivantes, une par une:

### 1. Définir quel comportement était attendu

Avant d'exécuter le programme, survolle le code puis décris ce qui devrait se passer quand on l'exécute, en supposant que le programme fonctionne comme prévu.

Aussi, il est important d'avoir en tête quel objectif cette erreur nous empêche d'atteindre, car cet objectif nous permettra de relativiser l'importance de certaines erreurs, lors de la phase de formulation.

### 2. Exécuter et constater les effets

Exécuter le programme, puis noter les effets résultants de son exécution, en observant toutes les interfaces d'entrées-sorties manipulées par ce programme.

Par exemple: 

- les informations écrites dans la sortie standard;
- des modifications qui auraient eu lieu dans le système de fichiers; (ex: fichiers créés et/ou modifiés par le programme)
- les communications réseau qui auraient été émises (ou pas) par le programme;
- voire d'autres manifestations comme: un popup, un son, un effet secondaire sur la session utilisateur...

### 3. Formuler le problème

Maintenant, caractérise le problème en décrivant les différences que tu observes entre le comportement attendu de l'exécution du programme et son comportement effectif.

Si tu vois un message d'erreur, quel est-il ? et que signifie-t'il ?

S'il y a plusieurs messages d'erreur, lequel parait le plus important à résoudre en premier ?

Comment résumer ce problème en une seule phrase, à une personne n'ayant pas connaissance de mon programme, ni de mon environnement d'exécution ?

Note: La définition de l'objectif et ses attentes d'exécution du programme (cf étape 1 de la méthode) vont probablement t'aider à mettre le message d'erreur dans son contexte, de mieux le comprendre, d'estimer à quel point il est bloquant, et donc d'adapter ta stratégie de résolution. (ex: trouver une solution VS appliquer un contournement, ce qu'on appelle un *workaround*)

### 4. Analyser l'origine, la cause du problème

Avant de réflechir à comment diagnostiquer ou résoudre cette erreur, liste quelques hypothèses qui pourraient expliquer l'origine et/ou la cause de ce problème.

L'objectif de ces hypothèses est de nous aider à identifier quelle partie de notre code est défaillante, afin de réduire la taille du problème et de mieux cibler notre analyse.

Par exemple: si mon problème est que j'obtiens une erreur ENOTENT à l'exécution de mon programme, une hypothèse pourrait être que le fichier que mon programme cherche à lire n'existe pas, ou que je me sois trompé de répertoire.

À ce stade, il n'est pas encore question de modifier le programme ou d'exécuter des commandes. Seulement réflechir à des hypothèses qui pourraient expliquer le problème que nous avons formulé à l'étape suivante.

### 5. Diagnostic par vérification d'hypothèses

Maintenant, nous allons confirmer (ou infirmer) ces hypothèses, une par une. En commençant par la plus probable, la plus facile ou la plus rapide à confirmer.

Pour chaque hypothèse, définis un plan d'action: liste les actions que tu comptes effectuer pour confirmer ou infirmer cette hypothèse.

Une bonne question à se poser: est-ce que j'arriverais à reproduire le problème en exécutant une toute petite partie du programme, isolée du reste du programme ? Si oui, laquelle (ou lesquelles), et comment ?

Par exemple:
- si mon hypothèse est qu'une méthode de classe est défaillante car elle retourne `undefined` au lieu d'une chaine de caractères: je pourrais vérifier cela en créant un mini-programme qui ne fera que instancier cette classe, appeler cette méthode, puis afficher le type de la valeur retournée.
- si mon hypothèse est que la variable sensée contenir un nom de fichier valide ne contient en réalité par un nom de fichier valide: je pourrais afficher le contenu de cette variable dans la sortie standard (pour voir si la valeur est valide ou non) et passer en dur le chemin exact du fichier au lieu de le lire depuis la variable (pour voir si la fonction de lecture de fichier se comporte comme prévu si on lui passe un chemin valide).

### 6. Résolution

En vérifiant tes hypothèses, tu devrais avoir identifié la partie de ton code d'où le problème vient et avoir une idée de comment régler ce problème. Nous allons donc modifier le programme à cette fin.

Il est important de résoudre l'erreur pas à pas, de manière progressive, itérative. Éviter de faire trop de changements en une fois. Et toujours garder une copie de la version d'origine du code, pour pouvoir y revenir si jamais les modifications apportées n'ont fait qu'empirer la situation. (ce sont des choses qui arrivent)

Dans un premier temps, essaye de régler le problème de manière la plus simple possible, même si cela implique l'utilisation de valeurs en dur, de la duplication de code, et autre modifications qui pourront être refactorisées plus tard.

Conseils sur le mode opératoire:

- si possible, écrire un test unitaire qui échouera tant que le problème n'aura pas été réglé; (c'est ce qu'on appelle un test de non-regression)
- garder des traces de chaque étape;
- garder des traces de la raison et/ou finalité des chaque changement apporté;
- garder des traces du comportement effectif observé après chaque changement apporté;
- une fois que le problème est résolu: conserver le code tel quel, même s'il est imparfait; (c.a.d. faire un commit)
- enfin, refactoriser le code en vérifiant que ces modifications constituent toujours une résolution du problème, et qu'elles ne causent pas un autre problème.
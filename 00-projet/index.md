---
title: Réalisation d'une API pour un client
layout: default
---

<!-- REFERENCE LINKS
- https://github.com/adrienjoly/cours-nodejs-project-solution
- https://circleci.com/gh/eemi-aj/node-note-keeper [RIP]
- https://trello.com/c/OY8UVMiS/25-%F0%9F%8E%93-cours#comment-5c33318474ebba6e5f47f9d9
-->

L'objectif est d'écrire et de mettre en production une API HTTP de gestion de notes personnelles. Cette API sera le back-end d'une application mobile et d'une application web. (ces deux applications ne sont pas à rendre)

Ce travail est à effectuer en groupe, et sera évalué à la fois de manière collective et individuelle.

Afin de vérifier son bon fonctionnement, ainsi que le respect du cahier des charges et des critères d'évaluation fournis ci-dessous, le code source rendu sera exécuté et vérifié par une suite de tests automatisés écrits par le client.

## Critères d'évaluation

Chaque groupe devra rendre trois URLs:

- l'URL du dépôt GitHub contenant le code source, l'historique de commits et l'intégration continue;
- et l'URL à laquelle l'API a été déployée en production.

Le travail du groupe et de chacune des personnes du groupe sera évalué selon les critères suivants:

- Fonctionnel: Les fonctionnalités ont été implémentées conformément au cahier des charges fourni ci-dessous.
- Technique: Les routes (endpoints) sont implémentées à l'aide du module demandé à chaque groupe, et non à l'aide d'Express.
- Lisibilité: Le dépôt git contient un fichier `README.md` qui explique comment cloner, faire fonctionner et tester l'API depuis une autre machine que la sienne. Les fichiers JavaScript doivent respecter les conventions de codage du [guide de style de Airbnb](https://github.com/airbnb/javascript): chaînes de caractères entre apostrophes, indentation à 2 espaces, usage de point-virgules pour ponctuer chaque instruction.
- Production: L'API doit être accessible et fonctionnelle en production, à l'URL fournie.
- Collaboration: Chaque collaborateur de l'équipe devra avoir contribué une partie substantielle du code source de l'API. Ceci sera notamment vérifié grâce à l'historique des commits git.

## Cahier des charges

Dans cette section, nous décrivons les fonctionnalités attendues dans l'API à produire.

Attention: Sachant que ces fonctionnalités seront vérifiés par des tests automatisés, merci de respecter ces spécifications **à la lettre**. Ceci inclut notamment: le nom des routes, la structure des objets JSON à produire, les chaînes de caractères fournies... (liste non exhaustive)

> Le saviez-vous: Le cahier des charges est un document habituellement produit par le client (ou co-écrit avec lui) pour exprimer ses besoins de la manière la plus précise possible. En effet, lors de la recette, le client vérifiera le produit livré remplit bien les attentes listées dans ce document.

### Spécifications fonctionnelles

Lors de son utilisation par une application cliente, l'API à fournir devra permettre à chaque utilisateur de l'application de:

- créer un compte en fournissant un identifiant et mot de passe;
- se connecter à l'aide de son identifiant et mot de passe;
- retrouver ses notes, dans l'ordre anti-chronologique, avec leur date de création et de mise à jour;
- saisir une nouvelle note;
- supprimer n'importe laquelle de ses notes.

Les notes seront à stocker en tant que texte brut (c.a.d. non HTML) et doivent pouvoir contenir des sauts de ligne, ainsi que n'importe quel caractère Unicode. (accents, emoji...)

### Spécifications techniques

#### Environnement d'exécution

Le serveur API doit pouvoir s'exécuter dans un environnement de type Linux, doté de Node.js version 12.15 et de MongoDB version 4.

Les variables d'environnement suivantes devront permettre de paramétrer le serveur:

- `PORT`: numéro de port sur lequel l'API sera à l'écoute de requêtes HTTP entrantes;
- `MONGODB_URI`: l'URI qui sera utilisée par l'API pour se connecter au serveur de base de données MongoDB;
- `JWT_KEY`: la clé d'encodage à utiliser pour signer les jetons JWT. (voir plus bas)

#### Modèle de données

Toutes les données manipulées par l'API doivent être stockées dans une base de données MongoDB accessible via la variable d'environnement `MONGODB_URI`.

La base de données doit être nommée `notes-api`.

À minima, cette base de données doit être constituée des deux collections suivantes:

- la collection `notes` contient toutes les notes de tous les utilisateurs, à raison d'un document par note;
- la collection `users` contient tous les utilisateurs de l'application, à raison d'un document par utilisateur.

##### Schéma de la collection `notes`

Les documents stockés dans la collection `notes` doivent contenir les propriétés suivantes:

- `_id` (type: `ObjectID`): identifiant unique de la note, généré automatiquement par MongoDB lors de l'insertion.
- `userId` (type: `ObjectID`): identifiant unique (`_id`) de l'utilisateur qui a créé cette note.
- `content` (type: `string`): contenu textuel de la note.
- `createdAt` (type: `Date`): date et heure à laquelle la note a été créé.
- `lastUpdatedAt` (type: `Date`): date et heure à laquelle la note a été mise à jour pour la dernière fois. Lors de la création de la note, cette value doit être `null`.

##### Schéma de la collection `users`

Les documents stockés dans la collection `users` doivent contenir les propriétés suivantes:

- `_id` (type: `ObjectID`): identifiant unique de l'utilisateur, généré automatiquement par MongoDB lors de l'insertion.
- `username` (type: `string`): nom unique choisi par l'utilisateur lors de son inscription. Ce nom doit être constitué uniquement de lettres minuscules non accentuées (entre `a` et `z`) pour une longueur totale de 2 à 20 caractères max.
- `password` (type: `string`): mot de passe choisi par l'utilisateur lors de son inscription. Ce mot de passe doit contenir au moins 4 caractères et être haché avec l'algorithme [`bcrypt`](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/) (alternative à MD5).

#### Authentification des utilisateurs

L'API doit être *state-less*. C'est à dire qu'elle ne nécessite pas l'usage de sessions.

Au lieu de cela, l'identification des utilisateurs sera assurée par l'usage de jetons JWT ([JSON Web Tokens](https://fr.wikipedia.org/wiki/JSON_Web_Token)).

Afin de vérifier l'identité de l'utilisateur derrière chaque appel à l'API, celle-ci devra:

- émettre un jeton JWT lorsque l'utilisateur s'identifiera,
- vérifier la validité du jeton JWT encodé en base 64 dans le *header* HTTP `x-access-token` de chaque requête, puis en extraire l'identité de l'utilisateur.

Pour des raisons de sécurité, les tokens JWT:

- devront expirer 24 heures après leur création;
- et devront être signés à l'aide d'une clé privée passé par la variable d'environnement `JWT_KEY`.

#### Interfaces

Les routes doivent être capables d'extraire les paramètres passés dans le corps de chaque requête au format `application/json`.

La réponse envoyée par chacune de ces routes doit aussi être au format JSON. Elle doit systématiquement contenir la propriété suivante:

- `error` (type: `string` ou `null`): En cas d'erreur pendant l'exécution de la requête, cette propriété aura pour valeur le message d'erreur correspondant. Sinon elle sera `null`.

Les autres propriétés de la réponse JSON sont spécifiées dans chaque route à implémenter, tel que décrites ci-dessous.

##### Route `POST /signup`

Cette route permet de créer un compte utilisateur, à partir d'un identifiant et mot de passe choisis par l'utilisateur.

Une fois le compte créé, un jeton JWT est généré et retourné pour effectuer d'autre requêtes au nom de cet utilisateur.

Propriétés JSON attendues dans le corps de la requête:

- `username`: identifiant unique choisi par l'utilisateur;
- `password`: mot de passe choisi par l'utilisateur. (en clair / non chiffré)

Propriétés JSON en réponse de chaque requête:

- `error` (type: `string` ou `null`): En cas d'erreur pendant l'exécution de la requête, cette propriété aura pour valeur le message d'erreur correspondant (cf cas d'erreurs ci-dessous). Sinon elle sera `null`.
- `token` (type: `string`): En cas de succès, cette propriété aura pour valeur le token JWT généré pour l'utilisateur, en base 64.

Cas d'erreurs (avec valeur correspondante pour la propriété `error`):

- si `password` contient moins de 4 caractères => `Le mot de passe doit contenir au moins 4 caractères` et retourner un code HTTP `400`.
- si `username` contient un ou plusieurs caractères autre que des lettres minuscules non accentuées entre `a` et `z` => `Votre identifiant ne doit contenir que des lettres minuscules non accentuées` et retourner un code HTTP `400`.
- si `username` contient moins de 2 caractères ou plus de 20 caractères => `Votre identifiant doit contenir entre 2 et 20 caractères` et retourner un code HTTP `400`.
- si `username` est déjà associé à un utilisateur existant en base de données => `Cet identifiant est déjà associé à un compte` et retourner un code HTTP `400`.

##### Route `POST /signin`

Cette route permet à un utilisateur de se connecter à son compte, en fournissant son identifiant et son mot de passe.

Une fois les identifiants vérifiés, un jeton JWT est généré et retourné pour effectuer d'autre requêtes au nom de cet utilisateur.

Propriétés JSON attendues dans le corps de la requête:

- `username`: identifiant unique choisi par l'utilisateur;
- `password`: mot de passe choisi par l'utilisateur. (en clair / non chiffré)

Propriétés JSON en réponse de chaque requête:

- `error` (type: `string` ou `null`): En cas d'erreur pendant l'exécution de la requête, cette propriété aura pour valeur le message d'erreur correspondant (cf cas d'erreurs ci-dessous). Sinon elle sera `null`.
- `token` (type: `string`): En cas de succès, cette propriété aura pour valeur le token JWT généré pour l'utilisateur, en base 64.

Cas d'erreurs (avec valeur correspondante pour la propriété `error`):

- si `password` contient moins de 4 caractères => `Le mot de passe doit contenir au moins 4 caractères` et retourner un code HTTP `400`.
- si `username` contient un ou plusieurs caractères autre que des lettres minuscules non accentuées entre `a` et `z` => `Votre identifiant ne doit contenir que des lettres minuscules non accentuées` et retourner un code HTTP `400`.
- si `username` contient moins de 2 caractères ou plus de 20 caractères => `Votre identifiant doit contenir entre 2 et 20 caractères` et retourner un code HTTP `400`.
- si `username` n'est associé à aucun compte utilisateur de la base de données => `Cet identifiant est inconnu` et retourner un code HTTP `403`.

##### Route `GET /notes`

Cette route permet à un utilisateur connecté de lister ses notes, dans l'ordre anti-chronologique de création.

Le jeton JWT de l'utilisateur connecté doit être fourni en base 64 dans le *header* HTTP `x-access-token`.

Propriétés JSON en réponse de chaque requête:

- `error` (type: `string` ou `null`): En cas d'erreur pendant l'exécution de la requête, cette propriété aura pour valeur le message d'erreur correspondant (cf cas d'erreurs ci-dessous). Sinon elle sera `null`.
- `notes` (type: `array`): En cas de succès, cette propriété aura pour valeur un tableau d'objets respectant le schéma de la collection `notes`. (fourni plus haut)

Cas d'erreurs (avec valeur correspondante pour la propriété `error`):

- si l'utilisateur n'est pas connecté => `Utilisateur non connecté` et retourner un code HTTP `401`.

##### Route `PUT /notes`

Cette route permet à un utilisateur connecté d'ajouter une note.

Le jeton JWT de l'utilisateur connecté doit être fourni en base 64 dans le *header* HTTP `x-access-token`.

Propriétés JSON attendues dans le corps de la requête:

- `content`: contenu de la note saisie par l'utilisateur.

Propriétés JSON en réponse de chaque requête:

- `error` (type: `string` ou `null`): En cas d'erreur pendant l'exécution de la requête, cette propriété aura pour valeur le message d'erreur correspondant (cf cas d'erreurs ci-dessous). Sinon elle sera `null`.
- `note` (type: `object`): En cas de succès, cette propriété aura pour valeur un l'objet qui a été inséré dans la collection `notes`, comprenant son `_id`. (cf schéma de la collection `notes` fourni plus haut)

Cas d'erreurs (avec valeur correspondante pour la propriété `error`):

- si l'utilisateur n'est pas connecté => `Utilisateur non connecté` et retourner un code HTTP `401`.

##### Route `PATCH /notes/:id`

Cette route permet à un utilisateur connecté de modifier une note existante.

Le jeton JWT de l'utilisateur connecté doit être fourni en base 64 dans le *header* HTTP `x-access-token`.

Paramètres attendus dans l'URL de la requête:

- `id`: identifiant unique de la note à modifier.

Propriétés JSON attendues dans le corps de la requête:

- `content`: contenu de la note saisie par l'utilisateur. (mise à jour)

Propriétés JSON en réponse de chaque requête:

- `error` (type: `string` ou `null`): En cas d'erreur pendant l'exécution de la requête, cette propriété aura pour valeur le message d'erreur correspondant (cf cas d'erreurs ci-dessous). Sinon elle sera `null`.
- `note` (type: `object`): En cas de succès, cette propriété aura pour valeur un l'objet qui a été mis à jour dans la collection `notes`, comprenant son `_id`. (cf schéma de la collection `notes` fourni plus haut)

Cas d'erreurs (avec valeur correspondante pour la propriété `error`):

- si l'utilisateur n'est pas connecté => `Utilisateur non connecté` et retourner un code HTTP `401`.
- si `id` n'est associé à aucune note stockée dans la base de données => `Cet identifiant est inconnu` et retourner un code HTTP `404`.
- si `id` est associé à une note appartenant à un autre utilisateur => `Accès non autorisé à cette note` et retourner un code HTTP `403`.

##### Route `DELETE /notes/:id`

Cette route permet à un utilisateur connecté de supprimer une de ses notes.

Le jeton JWT de l'utilisateur connecté doit être fourni en base 64 dans le *header* HTTP `x-access-token`.

Paramètres attendus dans l'URL de la requête:

- `id`: identifiant unique de la note à supprimer.

Propriétés JSON en réponse de chaque requête:

- `error` (type: `string` ou `null`): En cas d'erreur pendant l'exécution de la requête, cette propriété aura pour valeur le message d'erreur correspondant (cf cas d'erreurs ci-dessous). Sinon elle sera `null`.

Cas d'erreurs (avec valeur correspondante pour la propriété `error`):

- si l'utilisateur n'est pas connecté => `Utilisateur non connecté` et retourner un code HTTP `401`.
- si `id` n'est associé à aucune note stockée dans la base de données => `Cet identifiant est inconnu` et retourner un code HTTP `404`.
- si `id` est associé à une note appartenant à un autre utilisateur => `Accès non autorisé à cette note` et retourner un code HTTP `403`.

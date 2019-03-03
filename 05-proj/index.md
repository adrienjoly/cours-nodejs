---
title: Projet à rendre en groupe - Service de gestion de notes personnelles
layout: default
---

Le but est d'écrire et de mettre en production une application web permettant à des utilisateurs de gérer leurs notes personnelles.

Ce travail est à effectuer en groupe, et sera évalué à la fois de manière collective et individuelle.

Afin de vérifier son bon fonctionnement, ainsi que le respect du cahier des charges et des critères d'évaluation fournis ci-dessous, le code source rendu sera exécuté et vérifié par une suite de tests automatisés.

## Critères d'évaluation

Chaque groupe devra rendre deux URLs:
- l'URL du dépôt git contenant le code source et l'historique de commits, hébergé sur le GitLab de l'école;
- et l'URL à laquelle l'application Web a été déployée en production.

Le travail du groupe et de ses collaborateurs sera évalué selon les critères suivants:
- Fonctionnel: Les fonctionnalités ont été implémentées conformément au cahier des charges fourni ci-dessous.
- Lisibilité: Le dépôt git respecte la structure de fichiers de `express-generator`. Il contient un fichier `README.md` qui explique comment cloner et faire fonctionner l'application depuis une autre machine que la sienne. Les fichiers JavaScript doivent respecter les conventions de codage de Express: chaînes de caractères entre apostrophes, indentation à 2 espaces, usage de point-virgules pour ponctuer chaque instruction.
- Production: L'application Web doit être accessible et fonctionnelle en production, à l'URL fournie.
- Collaboration: Chaque collaborateur de l'équipe devra avoir contribué une partie substantielle du code source de l'application. Ceci sera vérifié grâce à l'historique des commits git.

## Cahier des charges

Dans cette section, nous décrivons les fonctionnalités attendues dans l'application Web à produire.

Attention: Sachant que ces fonctionnalités seront vérifiés par des tests automatisés, merci de respecter ces spécifications **à la lettre**. Ceci inclue notamment: le nom des routes, la structure des objets JSON à produire, les chaines de caractères fournies... (liste non exhaustive)

### Spécifications fonctionnelles

L'application Web à fournir doit permettre à chaque utilisateur de:
- créer un compte en fournissant un identifiant et mot de passe;
- se connecter à l'aide de son identifiant et mot de passe;
- se déconnecter;
- visualiser toutes ses notes, dans l'ordre anti-chronologique, avec leur date de création;
- saisir une nouvelle note;
- supprimer n'importe laquelle de ses notes.

L'application s'adresse à des utilisateurs experts et francophones qui souhaitent pouvoir s'en servir très efficacement. Faire en sorte que les pages se chargent rapidement, soient réactives, et qu'aucune confirmation (ou dialogue modal / bloquant) ne soit affichée, même lors de la suppression de notes.

Chaque page Web rendue par l'application doit être facilement compréhensible et utilisable à la souris et au clavier par les utilisateurs, quel que soit leur navigateur. Les fonctionnalités doivent être assurées même si l'exécution de code JavaScript a été désactivée dans le navigateur de l'utilisateur.

### Spécifications techniques

#### Environnement d'exécution

Le serveur Web doit pouvoir s'exécuter dans n'importe quel environnement de type Linux, doté de Node.js version 10 et de MongoDB version 4.

Les variables d'environnement suivantes seront fournies:
- `PORT`: numéro de port sur lequel le serveur Web devra être à l'écoute de requêtes HTTP entrantes;
- `MONGODB_URL`: l'URL permettant à l'application de se connecter au serveur MongoDB.

#### Sécurité

Les comptes utilisateur et sessions doivent être stockés en base de données. Les mots de passe ne doivent jamais être stockés en clair. Les chiffrer au format MD5.

#### Interfaces

Le serveur Web de l'application implémentera du *server-side rendering*. C'est à dire que chaque route décrite ci-dessous devra rendre du contenu HTML valide (W3C) et prêt à être affiché dans le navigateur.

L'usage de paramètres `GET` est interdit, pour des raisons de sécurité et d'esthétique.

Les routes à implémenter sont fournies ci-dessous.

##### Route `GET /`

L'index de l'application Web est une page HTML qui contient:
- Un favicon;
- Le nom de l'application, affiché en haut à gauche;
- Si l'utilisateur est connecté, inclure:
  - L'identifiant de l'utilisateur qui est actuellement connecté, affiché en haut à droite;
  - Un bouton permettant de se déconnecter en un clic, via la route `POST /signout`;
  - Un formulaire permettant d'ajouter une note, via la route `PUT /note`;
  - Toutes les notes de l'utilisateur connecté, accompagnées de leur date de création et d'un bouton permettant de supprimer chaque note individuellement, via la route `DELETE /note/:id`.
- Si l'utilisateur n'est pas connecté, inclure:
  - Un formulaire permettant de créer un compte en saisissant un identifiant et un mot de passe, via la route `POST /signup`;
  - Un formulaire permettant de se connecter avec un identifiant et un mot de passe, via la route `POST /signin`;
  - Une description du service apporté par cette application Web. (*landing page*)

##### Route `POST /signup`
##### Route `POST /signin`
##### Route `POST /signout`
##### Route `PUT /note`
##### Route `DELETE /note/:id`

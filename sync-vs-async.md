# Fonctions Synchrones VS Asynchrones

## Fonctions Synchrones

### Principe

Par défaut, toute fonction définie en JavaScript est _synchrone_. Cela veut dire que, lorsqu'elle est appelée:

- cette fonction exécute _immédiatement_ l'intégralité de ses instructions puis _retourne une valeur_ dans la foulée;
- et que le reste du programme _attend la fin de l'exécution_ de cette fonction avant de s'exécuter à son tour.

Ainsi, quand on appelle plusieurs fonctions synchrones d'affilée, on a la garantie qu'elles s'exécutent de manière séquentielle. L'une après l'autre.

```js
// console.log() est une fonction synchrone
console.log('a');
console.log('b');
console.log('c');
// => les lettres a, b et c seront systématiquement affichées dans l'ordre
```

### Exemples

Définition de fonction synchrone:

```js
function meaningOfLife () {
  return 42;
}
```

Appel de fonction synchrone:

```js
const answer = meaningOfLife();
console.log('valeur retournée par meaningOfLife():', answer);
```

Appel de fonction synchrone avec gestion d'erreurs:

```js
try {
  const answer = meaningOfLife();
  console.log('valeur retournée par meaningOfLife():', answer);
} catch (err) {
  console.error('meaningOfLife() a rapporté une erreur:', err);
}
```

## Fonctions Asynchrones avec _callback_

### Principe

Les fonctions synchrones sont appropriées pour effectuer des opérations courtes, rapides, tant qu'il n'est pas problématique de monopoliser le fil d'exécution du programme Node.js.

Quand on développe un programme effectuant des opérations d'entrées / sorties de données – que ce soit sur le système de fichier, sur un réseau, ou sur n'importe quel matériel périphérique – il vaut mieux lancer ces opérations en tâche de fond, tout en continuant l'exécution du reste du programme.

Par exemple: un serveur doit être prêt à répondre à des requêtes à tout instant, même si une autre requête est déjà en cours de traitement.

Pour permettre l'exécution de plusieurs opérations en parallèle – sans bloquer l'exécution du reste du programme – le langage JavaScript fournit plusieurs manières de définir et d'appeler des fonctions _Asynchrones_.

Le principe de _fonction de callback_ est la manière la plus classique de procéder:

- on appelle une fonction asynchrone (A) en lui passant une autre fonction (B) – appelée _fonction de callback_ – en paramètres;
- la fonction asynchrone (A) rend immédiatement la main au programme;
- la fonction de callback (B) sera appelée une fois que l'opération aura terminé son exécution.

Ainsi, quand on appelle plusieurs fonctions asynchrones d'affilée, leurs fonctions de callback respectives ne seront pas forcément exécutées dans le même ordre !

```js
// setTimeout() est une fonction asynchrone qui exécute la fonction de callback
// après quelques millisecondes d'attente
setTimeout(() => console.log('a'), 50); // afficher a dans 50 millisecondes
setTimeout(() => console.log('b'), 90); // afficher b dans 90 millisecondes
setTimeout(() => console.log('c'), 20); // afficher c dans 20 millisecondes
// => ordre d'affichage: c, a, puis b
//    car les opérations asynchrones s'exécutent en parallèle
```

### Convention

En Node.js, une fonction de callback prend généralement deux paramètres:

1. le premier paramètre est une instance de la classe `Error` – si l'opération a échoué – ou `null`;
2. le deuxième paramètre est le résultat de l'exécution de l'opération, dans le cas où elle s'est exécutée sans erreur. C'est la valeur qu'on aurait passé à `return` si notre fonction était synchrone.

### Exemples

Définition de fonction Asynchrone avec _callback_:

```js
// Cette fonction appelera la fonction callback pour transmettre une réponse ou une erreur.
function meaningOfLife (callback) {
  // supposons que la réponse est disponible dans une collection mongodb
  collection.findOne({ meaning: 'life' }, function (err, res) {
    if (err) {
      // la requête db a échoué => appeler callback en incluant le message d'erreur
      callback(new Error('meaningOfLife failed because ' + err.message));
    } else {
      // la requête db à réussi => appeler callback en incluant la réponse
      callback(null, res.answer);
    }
  });
}
```

Appel de fonction Asynchrone avec _callback_:

```js
meaningOfLife(function (err, answer) {
  console.log('valeur retournée par meaningOfLife():', answer);
});
```

Appel de fonction Asynchrone avec _callback_ + gestion d'erreurs:

```js
meaningOfLife(function (err, answer) {
  if (err) {
    console.error('meaningOfLife() a rapporté une erreur:', err);
  } else {
    console.log('valeur retournée par meaningOfLife():', answer);
  }
});
```

## Fonctions Asynchrones retournant une `Promise`

### Principe

En guise d'alternative à l'usage de fonctions de _callback_, le concept de _promesse_ (en anglais: `Promise`; cf [javascript.info](https://javascript.info/promise-basics) et [Référence MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)) a été intégré au langage JavaScript pour simplifier le séquençage d'appels asynchrones, et améliorer leur lisibilité en évitant le _callback hell_.

Ainsi, il est désormais possible de définir une fonction asynchrone en lui faisant retourner une `Promise`. Pour récupérer la résultat final de l'exécution de cette fonction, l'appelant doit appeler les fonction `.then()` et `.catch()` de cette _promesse_.

Une `Promise` peut être:

- _résolue_ (`resolve`), si l'opération asynchrone s'est exécutée avec succès;
- _rejetée_ (`reject`), si une erreur est survenue pendant l'exécution de cette opération.

Les fonctions `.then()` et `.catch()` permettent de définir le comportement à adopter si la `Promise` est _résolue_ ou _rejetée_, respectivement.

Propriété intéressante: les appels à `.then()` et `.catch()` retournent la `Promise` éventuellement retournée par la fonction passée en paramètre, ce qui rend possible le chaînage de plusieurs opérations asynchrones.

```js
incrémenter(0) // (cette fonction retourne une Promise)
  .then((résultat) => {
    // résultat === 1
    return incrémenter(résultat); // (on retourne à nouveau une Promise)
  })
  .then((résultat) => {
    // résultat === 2
    return incrémenter(résultat); // (on retourne à nouveau une Promise)
  })
  .then((résultat) => {
    // résultat === 3
    console.log('résultat final:', résultat);
  });
```

### Exemples

Définition de fonction Asynchrone retournant une `Promise`:

```js
// Cette fonction retourne une promesse qui sera tenue ou rejetée.
function meaningOfLife () {
  return new Promise(function (resolve, reject) {
    // supposons que la réponse est disponible dans une collection mongodb
    collection.findOne({ meaning: 'life' })
      .then(function (res) {
        // la requête db à réussi => appeler resolve en incluant la réponse
        resolve(res.answer);
      })
      .catch(function (err) {
        // la requête db a échoué => appeler reject en incluant l'erreur
        reject(new Error('meaningOfLife failed because ' + err.message));
      })
    });
  });
}
```

Appel de fonction Asynchrone retournant une `Promise`:

```js
meaningOfLife()
  .then(function (answer) {
    console.log('valeur retournée par meaningOfLife():', answer);
  });
```

Appel de fonction Asynchrone retournant une `Promise`, avec gestion d'erreurs:

```js
meaningOfLife()
  .then(function (answer) {
    console.log('valeur retournée par meaningOfLife():', answer);
  })
  .catch(function (err) {
    console.error('meaningOfLife() a rapporté une erreur:', err);
  });
```

## Usage d'`async` et `await`

### Principe

Les mots clés `async` et `await` ont été introduits plus récemment dans le langage JavaScript pour simplifier et rendre plus lisibles la définition et l'appel de fonctions asynchrones à base de Promesses.

Ils permettent d'écrire du code asynchrone qui ressemble beaucoup à du code synchrone.

Ainsi, quand on appelle trois fonctions asynchrones d'affilée avec `await`, on retrouve la garantie qu'elles s'exécutent de manière séquentielle. L'une après l'autre. Sans pour autant bloquer l'exécution des autres opérations asynchrones qui pourraient se dérouller en arrière plan. (ex: répondre à des requêtes)

```js
await afficherPrévisionsMétéoFrance();
await afficherActualitésLeMonde();
await afficherMessagesNonLusDepuisGmail();
// await attend la fin de l'opération avant d'exécuter la suivante.
// => l'ordre d'affichage du résultat de ces opérations est garanti.
```

### Quelques règles d'usage

- Tout appel à une fonction définie avec le mot clé `async` retourne une `Promise` de la valeur retournée avec `return`.
- Le mot clé `await` permet d'attendre qu'une `Promise` (ex: retournée par l'appel à une fonction `async`) soit résolue, puis de récupérer sa valeur de retour.
- Pour intercepter les erreurs – c.a.d. `Promise` rejetée – il faut que `await` soit employé dans un bloc `try {} catch (err) {}`.
- `await` ne peut être utilisé que depuis une fonction `async`.

### Exemples

Définition de fonction `async`:

```js
async function meaningOfLife () {
  try {
    // supposons que la réponse est disponible dans une collection mongodb
    const res = await collection.findOne({ meaning: 'life' });
    return res.answer;
  } catch (err) {
    throw new Error('meaningOfLife failed because ' + err.message);
  }
}
```

Appel de fonction `async` avec `await`:

```js
const answer = await meaningOfLife();
console.log('valeur retournée par meaningOfLife():', answer);
```

Appel de fonction `async` avec `await` et gestion d'erreurs:

```js
try {
  const answer = await meaningOfLife();
  console.log('valeur retournée par meaningOfLife():', answer);
} catch (err) {
  console.error('meaningOfLife() a rapporté une erreur:', err);
}
```

Définition et appel d'une fonction anonyme, pour permettre l'usage de `await`:

```js
(async function () {
  const answer = await meaningOfLife();
  console.log('valeur retournée par meaningOfLife():', answer);
})();
```

Il est aussi possible d'utiliser une fonction fléchée à cette fin:

```js
(async () => {
  const answer = await meaningOfLife();
  console.log('valeur retournée par meaningOfLife():', answer);
})();
```

# Fonctions synchrones VS asynchrones

## Fonction synchrone

Définition de fonction:

```js
function meaningOfLife () {
  return 42;
}
```

Appel de cette fonction:

```js
const answer = meaningOfLife();
console.log('réponse:', answer);
```

Appel de cette fonction avec gestion d'erreurs:

```js
try {
  const answer = meaningOfLife();
  console.log('réponse:', answer);
} catch (err) {
  console.error('meaningOfLife() a causé une erreur:', err);
}
```

## Fonction asynchrone avec *callback*

Définition de fonction:

```js
function meaningOfLife (callback) {
  // supposons que la réponse est disponible dans une collection mongodb
  collection.findOne({ meaning: 'life' }, function (err, res) {
    if (err) {
      // la requête db a échoué => appeler callback en incluant l'erreur
      callback(err);
    } else {
      // la requête db à réussi => appeler callback en incluant la réponse
      callback(null, res.answer);
    }
  });
}
```

Appel de cette fonction:

```js
meaningOfLife(function (err, answer) {
  console.log('réponse:', answer);
});
```

Appel de cette fonction avec gestion d'erreurs:

```js
meaningOfLife(function (err, answer) {
  if (err) {
    console.error('meaningOfLife() a causé une erreur:', err);
  } else {
    console.log('réponse:', answer);
  }
});
```

## Fonction asynchrone qui retourne une `Promise`

Définition de fonction:

```js
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
        reject(err);
      })
    });
  });
}
```

Appel de cette fonction:

```js
meaningOfLife()
  .then(function (answer) {
    console.log('réponse:', answer);
  });
```

Appel de cette fonction avec gestion d'erreurs:

```js
meaningOfLife()
  .then(function (answer) {
    console.log('réponse:', answer);
  })
  .catch(function (err) {
    console.error('meaningOfLife() a causé une erreur:', err);
  });
```

## Usage d'`async` et `await`

Définition de fonction:

```js
async function meaningOfLife () {
  // supposons que la réponse est disponible dans une collection mongodb
  const res = await collection.findOne({ meaning: 'life' });
  return res.answer;
}
```

Appel de cette fonction:

```js
const answer = await meaningOfLife();
console.log('réponse:', answer);
```

Appel de cette fonction avec gestion d'erreurs:

```js
try {
  const answer = await meaningOfLife();
  console.log('réponse:', answer);
} catch (err) {
  console.error('meaningOfLife() a causé une erreur:', err);
}
```

Notes sur `async` et `await`:

- `await` permet d'attendre que l'opération déclenchée par l'appel à une fonction asynchrone sont terminée, et donc de récupérer directement sa valeur de retour.
- `await` ne peut être utilisé que depuis une fonction `async`.
- Tout appel à une fonction `async` retourne en fait une `Promise`.
- `await` peut être utilisé pour attendre récupérer la valeur de retour de n'importe quelle `Promise`.

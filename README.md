# Configurer React / Typescript / SASS à l'aide de Webpack et Babel.

1. Installer React et React-Dom
   ```shell
   npm i -D react react-dom
   ```

2. Installer Babel

Babel est un compilateur qui transpile le code :
   * De JSX au Js standard
   * De ESNEXT à ES5
   ```shell
   npm i -D @babel/core babel-loader
   ```
   * @babel/core : La bibliothèque principale de Babel.
   * babel-loader : permet d'utiliser Babel avec Webpack.

Ajouter ceci dans le webpack.config
   ```js
   ...
   module: {
           rules: [
               {
                   test: /\.(js)x?$/,
                   exclude: /node_modules/,
                   use: {
                       loader: 'babel-loader',
                   },
               },
               {
                   test: /.scss$/,
                   use: [
                       // Se lit de bas en haut.
                       'style-loader', // Créer des nodes de style à partir de chaînes de caractère JS.
                       'css-loader', // Traduit le CSS.
                       'sass-loader' // Compile le SASS en css.
                   ]
               }
           ]
       },
       resolve: {
           // Permet de ne pas mettre les extensions lors des imports
           extensions: ['.jsx', '.js'],
       },
   ...
   ```
   
Ajouter le transpileur pour le JSX
   ```shell
   npm i -D @babel/preset-react
   ```
   
Créer un fichier babel.config.json et ajouter la directive de transpilation.
   ```json
   {
     "presets": [
       "@babel/preset-react"
     ]
   }
   ```

Maintenant, testons React !
Modifier le main.js pour obtenir ceci :
```js
import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './App';

createRoot(document.getElementById('app'))
    .render(<App/>);
```
Créer un fichier src/App.jsx
```jsx
import React from 'react';

export const App = () => (
    <h1>Hello React</h1>
);
```

Pour faire fonctionner les applications sur de vieux navigateurs, il faut
   1. Transpiler le code de ES6+ à ES5- : Remplacer le nouveau JS par de l'ancien
   2. "Polyfill" : Recréer des fonctions inexistantes en ES5 mais qui existe en ES6 (Exemple : Array.prototype.find)

Pour faire ceci, il faut installer les modules :
   ```shell
   npm i -D @babel/preset-env core-js regenerator-runtime
   ```

Le module clé est @babel/preset-env et core-js. L'évolution de JavaScript étant très rapide, 
des centaines de fonctionnalités doivent être transposées et remplies. Mais heureusement, 
@babel/preset-env est un preset de transpilation intelligent qui couvre la plupart des fonctionnalités. 
Et core-js est un preset polyfill. Lorsque vous utilisez des fonctionnalités que @babel/preset-env et core-js ne supportent pas, 
il est temps de penser à utiliser des plugins. 
regenerator-runtime est pour les promesses.

```json
// babel.config.json{
  "presets": [
    [
      "@babel/preset-env",
      {
        // ajoute au début de chaque fichier l'importation de polyfills pour les fonctionnalités utilisées 
        // dans ce fichier et non supportées par les environnements cibles
        "useBuiltIns": "usage",
        "corejs": 3 // Numéro de version, la 3 est maintenue
      }
    ],
    "@babel/preset-react"
  ],
}
```


# Configurer React / Typescript / SASS à l'aide de Webpack et Babel.

Pour ajouter Typescript, deux choix s'offre à nous.
1. TypeScript Compiler (tsc) transpile TS en ES5 JS. tsc vérifie aussi les types.
2. Babel transpile TS. tsc vérifie le type.

Babel a plus de flexibilité au niveau de la transpilation et permet le polyfill.
De plus, les responsabilités sont claires :  
   * Babel transpile
   * tsc vérifie les types.


Pour configurer la transpilation Babel Typescript :
   ```shell
   npm i -D @babel/preset-typescript
   ```

```json
// babel.config.json
{
  "presets": [
    "@babel/preset-typescript", // Ajouter ici
  [
    "@babel/preset-env",
  ...
}
```

Pour utiliser Ts et React, il faut les types de React :
```shell 
npm i -D @types/react @types/react-dom
```

Changeons notre main.js en Index.tsx et App.js en App.tsx
```tsx
// src/Index.tsx
import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './App';

const rootNode = document.getElementById('app');
if (rootNode) {
    createRoot(rootNode)
        .render(<App/>);
}
```

```tsx
// src/App.tsx
import React from 'react';

export const App: React.FC = () => (
    <h1>Hello React</h1>
);
```

Pour finir, ajouter une dernière configuration dans webpack.config.js
```js
const {resolve} = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: resolve(__dirname, 'src', 'Index.tsx'), // Changer le point d'entrée 
    output: {
        path: resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/, // Ajouter |ts
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /.scss$/,
                use: [
                    'style-loader', 
                    'css-loader', 
                    'sass-loader' 
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'], // Ajout de ts et tsx
    },
    plugins: [
        new htmlWebpackPlugin({template: resolve('dist', 'index.html')})
    ],
    // On dit au serveur d'écouter ce dossier
    devServer: {
        static: path.resolve(__dirname, './dist')
    }
}
```

Maintenant, cela transpile mais pas moyen de détecter les erreurs de type,
Pour cela, on installe :
```shell
npm i -D typescript
```

Créer un tsconfig.json à la racine et créer un script

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "umd",
    "lib": [
      "ESNext",
      "dom"
    ],
    "jsx": "react",
    "noEmit": true,    // Babel transpile donc on demande à tsc de ne pas le faire
    "sourceMap": true,    
    /* Strict Type-Checking Options */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
   
    /* Module Resolution Options */
    "moduleResolution": "node",
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

```json
// package.json
"scripts": {    
    "dev": "webpack serve",
    "tscheck": "tsc -w"
  }
```
# Configurer React / Typescript / SASS à l'aide de Webpack et Babel.

1. Initialiser le package.json

    ```shell
    npm init -y # Le -y permet de passer les questions
    ```
   
2. Installer Webpack et autres outils

    * webpack-cli : Client en ligne de commande
    * webpack dev server : Permet le hot reload (Chargement de la page quan on sauvegarde)
   ```shell
   npm i -D  webpack webpack-cli webpack-dev-server
   ```
3. Installer htmlWebpackPlugin

   ```shell
   npm i -D html-webpack-plugin
   ```
   
4. Créer un fichier ./dist/index.html avec le code généré par Emmet

5. Installer SASS et ses loaders.
   ```shell
   npm i -D sass style-loader css-loader sass-loader
   ```
   
6. Créer le fichier ./webpack.config.js
   ```js
   // require est une fonction native de Node.js qui renvoie un objet utilitaire
   // possède des méthodes comme "resolve" qui permet de générer des chemins
   // absolus sur tous les systèmes d'exploitation
   const {resolve} = require("path");
   const htmlWebpackPlugin = require('html-webpack-plugin');
   
   module.exports = {
       mode: "development",
       // Point d'entrée pour webpack
       entry: resolve(__dirname, 'src', 'main.js'),
       output: {
           // Depuis le répertoire courant vers le répertoire dist qui contiendra les bundles
           path: resolve(__dirname, "dist"),
           filename: "bundle.js"
       },
       module: {
           rules: [
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
       plugins: [
           new htmlWebpackPlugin({template: resolve('dist', 'index.html')})
       ],
   }
   ```
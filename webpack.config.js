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
    // On dit au serveur d'écouter ce dossier
    devServer: {
        static: false
    }
}
const path = require("path");

module.exports = {
    mode: "none",
    // The file that is going to watch (app.js).
    entry: "./src/app.js",
    // The final file where compiled data is sent to (bundle.js).
    output: {
        path: path.join(__dirname, 'public'),
        filename: "bundle.js"
    },
    module: {
        // What webpack needs to do when parsing the data to the output file (bundle.js).
        rules: [{
            /* 
            * babel-loader: convert all ES6 to ES5.
            * babel configuration is done over in the ".babelrc" file.
            */
            loader: "babel-loader",
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            // Convert scss into normal css and pass it as styles to javascript.
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ],
            test: /\.s?css$/
        }]
    },
    // Hashmap for debugging. Shows error in pre-compiled files rather than in bundle.js.
    devtool: "cheap-module-eval-source-map",
    // Webpack server for development.
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        // We tell the server we will be using React for routing and not the server.
        historyApiFallback: true
    }
};

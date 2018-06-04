const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//We wrap all in a function to get access to the env variable.
module.exports = (env) => {
    const isProduction = env === "production"
    //Name of the file where css files are going to get extracted to.
    const CSSExtract = new MiniCssExtractPlugin({filename: "styles.css"});
    
    return {
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
                /* 
                * Convert scss into normal css and pass it as styles to javascript.
                * sourceMap: true shows where the css lives in the pre-compiled files.
                */
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },{
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
                test: /\.s?css$/
            }]
        },
        plugins: [
            CSSExtract
        ],
        /*
        * Hashmap for debugging. Shows error in pre-compiled files rather than in bundle.js.
        * Checks isProduction to only load it for dev.
        * source map is really slow for dev but really fast for production.
        */
        devtool: isProduction ? "source-map" : "inline-source-map",
        // Webpack server for development.
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            // We tell the server we will be using React for routing and not the server.
            historyApiFallback: true
        }
    }
};

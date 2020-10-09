const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const path = require("path")
const globals = require("../globals");
const portfinder = require("portfinder");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

var config = merge(webpackConfig, {
    mode: 'development',
    devtool: 'source-map',

    devServer: {
        clientLogLevel: "warning",
        contentBase: path.join(__dirname, "../static"),
        contentBasePublicPath: `${globals.rootPath}/static`,
        compress: true,
        hot: true,
        host: '0.0.0.0',
        port: 8080,
        quiet: true, // necessary for FriendlyErrorsPlugin 
    },

    module: {
        rules: [{
            test: /\.(css|scss|sass)$/,
            use: [
                {
                    // Adds CSS to the DOM by injecting a <style> tag
                    loader: 'style-loader'
                },
                {
                    // interprets @import and url() like import/require() and will resolve them
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                },
                {
                    // Loads a SASS/SCSS file and compiles it to CSS
                    loader: 'sass-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }
            ]
        },
        ]
    },
});

module.exports = new Promise((resolve, reject) => {
    //
    portfinder.basePort = process.env.PORT || config.devServer.port;

    //
    portfinder.getPort((err, port) => {
        if (!!err) {
            reject(err);
        } 

        // publish the new Port, necessary for e2e tests
        process.env.PORT = port;
        // add port to devServer config
        config.devServer.port = port;

        // Add FriendlyErrorsPlugin
        config.plugins.push(
            new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [
                        `Your application is running here: http://${config.devServer.host}:${port}`,
                    ],
                },
            }),
        );

        //
        resolve(config);
    });
});
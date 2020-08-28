const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    return {
        entry: {
            server: path.resolve(__dirname, './bin/www'),
        },
        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '/',
            // 生成的js文件名称
            filename: '[name].js',
        },
        target: 'node',
        node: {
            // Need this when working with express, otherwise the build fails
            // if you don't put this is, __dirname and __filename return blank or /
            __dirname: false,
            __filename: false,
        },
        externals: [nodeExternals()], // Need this to avoid error when working with Express
        module: {
            rules: [

            ]
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: 'invoice', to: 'invoice' },
                    { from: 'public_manager', to: 'public_manager' },
                ],
                options: {

                }
            }),
        ]
    }   
}
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const globals = require("../globals");

const HtmlWebpackplugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UselessFile = require('useless-files-webpack-plugin')

module.exports = {
    entry: [
        // Babel默认只转换新的JavaScript句法（syntax），而不转换新的API.
        // 比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，
        // 以及一些定义在全局对象上的方法（比如Object.assign）都不会转码.
        // 举例来说，ES6在Array对象上新增了Array.from方法, Babel就不会转码这个方法.
        // 如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。
        "babel-polyfill",
        path.resolve(__dirname, '../src/main.js')
    ],
    output: {
        // 配置打包文件输出的目录
        path: path.resolve(__dirname, `../../server_web/public/${globals.rootPath}`),
        // 生成的js文件名称
        filename: 'js/[name].[hash:8].js',
        // chunkname就是未被列在entry中，但有些场景需要被打包出来的文件命名配置。
        // 比如按需加载（异步）模块的时候，这样的文件是没有被列在entry中的使用CommonJS的方式异步加载的模块。
        chunkFilename: 'js/[name].[hash:8].js',
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'mint-ui': 'MINT',
    },
    module: {
        rules: [
            {   // 将js或者jsx文件编译为es5
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['syntax-dynamic-import']
                    }
                }]
            },
            {
                // 编译vue模版
                test: /\.vue$/,
                use: [{
                    loader: 'cache-loader'
                },
                {
                    loader: 'thread-loader'
                },
                {
                    loader: 'vue-loader',
                    options: {
                        // 在模版编译过程中，编译器可以将某些属性，如 src 路径，转换为 require 调用，以便目标资源可以由 webpack 处理
                        transformToRequire: {
                            video: ["src", "poster"],
                            source: "src",
                            img: "src",
                            image: "xlink:href",
                        },
                    }
                }]
            },
            {
                // 将资源文件编码为hash字符串
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackplugin({
            filename: 'index.html', // 打包后的文件名，默认是index.html   
            template: path.resolve(__dirname, '../index.ejs'), // 导入被打包的文件模板
            globals: globals // 这一步就是注入的变量
        }),
        new CopyPlugin({
            patterns: [
                { from: 'static', to: 'static' },
                { from: 'htmls', to: 'htmls' },
            ],
            options: {
                
            }
        }),
        new ManifestPlugin(),
        new UselessFile({
            root: './src', // 项目目录
            out: './fileList.json', // 输出文件列表
            clean: false, // 删除文件
        }),
    ]
}
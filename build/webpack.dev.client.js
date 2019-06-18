const path = require('path');
const webpack = require('webpack');
const createBabelConfig = require('../babelrc');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: devMode ? 'development' : 'production',
    devtool: 'eval-source-map',
    entry: devMode
        ? [
              'webpack-hot-middleware/client',
              'react-hot-loader/patch',
              './src/client/index.js',
          ]
        : [ './src/client/index.js'],
    output: {
        filename: devMode ? 'client.[hash:8].js' : 'client.[contenthash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? 'asset/[name].css' : 'asset/[name].[hash].css',
            chunkFilename: devMode ? 'asset/[id].css' : 'asset/[id].[hash].css',
        }),
        devMode && new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '../src/views/index.ejs'),
            filename: 'tpl.html',
        }),
    ].filter(o => !!o),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: createBabelConfig({devMode}),
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: devMode,
                        },
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import'),
                                require('autoprefixer'),
                                // require('postcss-pxtorem')({
                                //     rootValue: 50,
                                //     propList: ['*'],
                                // }),
                            ],
                        },
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|otf|webp|ttf)$/i,
                loader: 'file-loader',
                options: {
                    name: 'asset/font/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|mp3|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'asset/image/[name].[hash:8].[ext]',
                },
            },
        ],
    },
};

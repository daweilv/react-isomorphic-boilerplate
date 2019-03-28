const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const mode = process.env.NODE_MODE;
console.log('process.env.NODE_MODE',process.env.NODE_MODE);

const SERVICE_URL = process.env.NODE_SERVICE_URL;
const publicPath = mode === 'static' ? '.' : '/'; // for cdn
const pages = [
    // ----core----
    'content',
];

let entry = {};
let htmlWebpackPlugins = [];

pages.forEach(page => {
    entry[page] = ['@babel/polyfill', `./src/client/entry/${page}/index.js`];
    htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
            filename: `entry/${page}/index.html`,
            template: `src/client/entry/${page}/index.html`,
            chunks: [page],
        })
    );
});

module.exports = {
    // stats: 'verbose',
    entry,
    output: {
        filename: devMode
            ? 'entry/[name]/index.[hash:8].js'
            : 'entry/[name]/index.[contenthash:8].js',
        path: path.resolve(__dirname, 'build'),
        publicPath,
    },
    plugins: [
        // new OfflinePlugin(),
        new webpack.DefinePlugin({
            SERVICE_URL: JSON.stringify(SERVICE_URL),
            MODE: JSON.stringify(mode),
        }),
        new CleanWebpackPlugin(['build'], { verbose: false }),
        new MiniCssExtractPlugin({
            filename: 'entry/[name]/index.[contenthash:8].css',
        }),
        ...htmlWebpackPlugins,
    ],
    resolve: {
        modules: [path.resolve(__dirname, 'src/client'), 'node_modules'],
        alias: {
            '@': path.resolve(__dirname, 'src/client'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
            {
                test: /\.less$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import'),
                                require('autoprefixer'),
                                require('postcss-pxtorem')({
                                    rootValue: 50,
                                    propList: ['*'],
                                }),
                            ],
                        },
                    },
                    'less-loader',
                ],
            },

            {
                test: /\.(png|jpg|jpeg|gif|mp3)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'asset/image/[name].[hash:8].[ext]',
                    publicPath:
                        mode === 'static'
                            ? path.join(publicPath, '../../')
                            : publicPath,
                },
            }
        ],
    },
};

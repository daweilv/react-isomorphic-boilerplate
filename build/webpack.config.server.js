const path = require('path');
const createBabelConfig = require('../babelrc');
const devMode = process.env.NODE_ENV !== 'production';
const nodeExternals = require( 'webpack-node-externals');

module.exports = {
    target: 'node',
    devtool: devMode ? 'eval-source-map' : 'cheap-module-source-map',
    mode: devMode ? 'development' : 'production',
    entry: ['./src/server/Root.js'],
    output: {
        filename: 'serverBundle.js',
        path: path.join(__dirname, '../dist'),
        libraryTarget: 'commonjs2',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
    },
    externals: ['@loadable/component', nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: createBabelConfig({ server: true, devMode }),
            },
            {
                test: /\.less$/,
                use: [
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

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WPTerserPlugin = require('terser-webpack-plugin');
const WPOptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WPLodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const WPBundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

const entrys = Object.keys(common.entry);
module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new WPTerserPlugin({
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    compress: {
                        warnings: false,
                        comparisons: false,
                        drop_console: true,
                    },
                    output: {
                        comments: false,
                        ascii_only: true,
                    },
                },
            }),
            new WPOptimizeCSSAssetsPlugin({}),
        ],
    },
    plugins: [
        new WPLodashModuleReplacementPlugin(),
        new WPBundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ],
});

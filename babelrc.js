module.exports = ({ server } = {}) => ({
    presets: [
        [
            '@babel/preset-env',
            {
                targets: server
                    ? { node: 'current' }
                    : { browsers: ['> 5%', 'last 2 versions'] },
            },
        ],
        '@babel/preset-react',
    ],
    plugins:["react-hot-loader/babel"]
});

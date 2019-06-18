module.exports = ({ server, devMode } = {}) => ({
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
    plugins: [
        'react-hot-loader/babel',
        !server && '@babel/plugin-transform-runtime',
    ].filter(o => !!o),
});

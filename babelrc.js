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
    plugins: [
        '@loadable/babel-plugin',
        // '@babel/plugin-syntax-dynamic-import',
        !server && 'react-hot-loader/babel',
        !server && '@babel/plugin-transform-runtime',
    ].filter(Boolean),
});
